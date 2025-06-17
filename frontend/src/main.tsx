import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { type ContextSetter, setContext } from "@apollo/client/link/context";
import { ActivateAccountPage } from "@pages/ActivateAccountPage";
import { ActivationErrorPage } from "@pages/ActivationTokenErrorPage";
import LegalNotice from "@pages/LegalNotice";
import PrivacyPolicy from "@pages/PrivacyPolicy";
import { SetPasswordPage } from "@pages/SetPasswordPage";
import TermsAndConditions from "@pages/TermsAndConditions";
import ProjectDetails from "@pages/projectDetails/ProjectDetails";
import { AuthProvider } from "./context/authContext";
import { RoleThemeProvider } from "./context/roleThemeContext";
import { RequireAdmin } from "./layout/RequireAdmin";

import Clients from "@pages/Clients";
import CreateProject from "@pages/CreateProject";
import Dashboard from "@pages/Dashboard";
import Error404visitor from "@pages/Error404";
import ForgotPassword from "@pages/ForgotPassword";
import Home from "@pages/Home";
import InitPage from "@pages/InitPage";
import Login from "@pages/Login";
import Projects from "@pages/Projects";
import ResetPassword from "@pages/ResetPassword";
import Settings from "@pages/Settings";
import Signup from "@pages/Signup";

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
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "reset-password/",
        element: <ResetPassword />,
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
        path: "/init",
        element: <InitPage />,
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
