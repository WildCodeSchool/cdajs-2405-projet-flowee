import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <main>
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </>
  );
}
