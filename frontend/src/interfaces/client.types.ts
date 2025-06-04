// src/interfaces/client.types.ts
import type { ClientStatus } from "@generated/graphql-types";

// Interface minimaliste pour le client dans l'UI
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
