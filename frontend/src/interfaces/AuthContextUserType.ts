export interface AuthContextUserType {
  email: string;
  role: "CLIENT" | "ADMIN";
  clientName?: string;
  firstname?: string;
  lastname?: string;
}
