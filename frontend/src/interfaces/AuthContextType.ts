import { AuthContextUserType } from "./AuthContextUserType";

export interface AuthContextType {
  authUserData: Partial<AuthContextUserType>;
  setToken: (token: string) => void;
}
