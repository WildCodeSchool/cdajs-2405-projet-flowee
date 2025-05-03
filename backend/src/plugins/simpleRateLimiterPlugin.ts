import type {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContext,
} from "@apollo/server";
import { GraphQLError } from "graphql";

interface RateLimitOptions {
  windowMs: number;
  max: number;
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

interface RequestContext {
  request: {
    http?: {
      headers: {
        get(name: string): string | null;
      };
    };
  };
  contextValue: {
    req?: {
      ip?: string;
    };
  };
}

// Create a class to manage rate limiting
class RateLimiter {
  private rateLimitMap = new Map<string, RateLimitInfo>();
  private purgeInterval: NodeJS.Timeout;

  constructor(private options: RateLimitOptions) {
    this.purgeInterval = setInterval(() => {
      const now = Date.now();
      let purged = 0;
      for (const [identifier, info] of this.rateLimitMap) {
        if (info.resetTime < now) {
          this.rateLimitMap.delete(identifier);
          purged++;
        }
      }
      if (purged > 0) {
        console.log(`[RateLimiter] Purged ${purged} expired entries.`);
      }
    }, 60_000); // toutes les minutes
  }

  getClientIdentifier(requestContext: RequestContext): string {
    const authHeader =
      requestContext.request.http?.headers.get("authorization") || "";
    if (authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    return requestContext.contextValue.req?.ip || "anonymous";
  }

  getRateLimitInfo(identifier: string, now: number): RateLimitInfo {
    const info = this.rateLimitMap.get(identifier);
    if (!info || info.resetTime < now) {
      console.log(`[RateLimiter] New window for client "${identifier}".`);
      const newInfo = { count: 0, resetTime: now + this.options.windowMs };
      this.rateLimitMap.set(identifier, newInfo);
      return newInfo;
    }
    return info;
  }

  incrementCount(identifier: string, info: RateLimitInfo): void {
    info.count++;
    console.log(
      `[RateLimiter] Client "${identifier}" has now made ${info.count} requests.`,
    );
  }

  cleanup(): void {
    clearInterval(this.purgeInterval);
    this.rateLimitMap.clear();
  }
}

export function createRateLimiterPlugin(
  options: RateLimitOptions,
): ApolloServerPlugin {
  const rateLimiter = new RateLimiter(options);

return {
  async requestDidStart(requestContext: GraphQLRequestContext<BaseContext>) {
    //console.log('[RateLimiter] Nouvelle requête à', new Date().toISOString());
    
    const now = Date.now();
    const identifier = rateLimiter.getClientIdentifier(
      requestContext as RequestContext,
    );
    const clientInfo = rateLimiter.getRateLimitInfo(identifier, now);
    const { max } = options;

    // D'abord on incrémente le compteur
    rateLimiter.incrementCount(identifier, clientInfo);

    // et apres on test si la limite est dépassée
    if (clientInfo.count > max) {
      console.warn(
        `[RateLimiter] Client "${identifier}" exceeded the rate limit.`,
      );
      throw new GraphQLError(
        "Trop de requêtes. Veuillez réessayer plus tard.",
        {
          extensions: { code: "RATE_LIMITED", http: { status: 429 } },
        },
      );
    }

      return {
        async willSendResponse(responseContext) {
          const remaining = Math.max(0, max - clientInfo.count);
          const resetTime = clientInfo.resetTime;
          const resetTimeSeconds = Math.ceil((resetTime - now) / 1000);

          responseContext.response.http?.headers.set(
            "X-RateLimit-Limit",
            max.toString(),
          );
          responseContext.response.http?.headers.set(
            "X-RateLimit-Remaining",
            remaining.toString(),
          );
          responseContext.response.http?.headers.set(
            "X-RateLimit-Reset",
            resetTimeSeconds.toString(),
          );
        },
      };
    },
  };
}
