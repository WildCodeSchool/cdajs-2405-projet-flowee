import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Error404visitor from "./pages/Error404";
import NewAccount from "./pages/NewAccount";

const uriprod = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI ?? "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: uriprod,
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error404visitor />,
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
      {
        path: "/newclient",
        element: <NewAccount user="client" color="bg-blueBg" />,
      },
      {
        path: "/newcompanyuser",
        element: <NewAccount user="admin" color="bg-orangeBg" />,
      },
      {
        path: "*",
        element: <Error404visitor />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
