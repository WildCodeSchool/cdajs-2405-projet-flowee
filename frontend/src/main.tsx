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
import { type ContextSetter, setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import Error404visitor from "./pages/Error404";
import { AuthProvider } from "./context/authContext";
import CreateProject from "./pages/CreateProject";
import { RoleThemeProvider } from "./context/roleThemeContext";
import { RequireAdmin } from "./layout/RequireAdmin";
import { ActivateAccountPage } from "@pages/ActivateAccountPage";
import { SetPasswordPage } from "@pages/SetPasswordPage";
import { ActivationErrorPage } from "@pages/ActivationTokenErrorPage";
import ProjectDetails from "@pages/projectDetails/ProjectDetails";
import LegalNotice from "@pages/LegalNotice";
import TermsAndConditions from "@pages/TermsAndConditions";
import PrivacyPolicy from "@pages/PrivacyPolicy";
import NewAccount from "@components/organisms/NewAccount";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI ?? "http://localhost:4000/graphql",
});

console.info("VITE_GRAPHQL_URI =", import.meta.env.VITE_GRAPHQL_URI);
const authHeaderFunction: ContextSetter = (_request, { headers }) => {
  const token: string | null = localStorage.getItem("AUTH_TOKEN");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};
const authHeaderLink = setContext(authHeaderFunction);

const client = new ApolloClient({
  link: authHeaderLink.concat(httpLink),
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
        path: "/projects/:slug",
        element: <ProjectDetails />,
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
        path: "/activate",
        element: <ActivateAccountPage />,
      },
      {
        path: "/set-password",
        element: <SetPasswordPage />,
      },
      {
        path: "/activation-error",
        element: <ActivationErrorPage />,
      },
      {
        path: "/newproject",
        element: (
          <RequireAdmin>
            <CreateProject />
          </RequireAdmin>
        ),
      },
      {
        path: "/activate",
        element: <ActivateAccountPage />,
      },
      {
        path: "/terms-and-conditions",

        element: <TermsAndConditions />,
      },
      {
        path: "/legal-notice",
        element: <LegalNotice />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/newaccount",
        element: <NewAccount user={"admin"} color={"bg-theme-base"} />,
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
        <AuthProvider>
          <RoleThemeProvider>
            <RouterProvider router={router} />
          </RoleThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
