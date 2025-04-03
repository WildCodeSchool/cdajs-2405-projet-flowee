import { AuthContextClientType } from "./AuthContextClientType";

export interface AuthContextType {
  authUserData: Partial<AuthContextClientType>;
  setToken: (token: string) => void;
}
