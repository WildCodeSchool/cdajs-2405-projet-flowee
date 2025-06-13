// src/interfaces/client.types.ts
import type { ClientStatus } from "@generated/graphql-types";

// Minimalist interface for client UI representation
export interface ClientUI {
  id: string;
  clientName: string | null | undefined;
  status: ClientStatus | null | undefined;
  account:
    | {
        email: string;
      }
    | null
    | undefined;
}
