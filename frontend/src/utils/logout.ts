import { useAuth } from "@context/authContext";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    setToken("");
    navigate("/login");
  };

  return logout;
}
