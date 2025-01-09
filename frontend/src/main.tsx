import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import Signup from "./Pages/Signup.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import Projects from "./Pages/Projects.tsx";
import Clients from "./Pages/Clients.tsx";
import Settings from "./Pages/Settings.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        //est ce qu'on fait une route dynamique ici ou plutot dans la logique de sign in ?
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
