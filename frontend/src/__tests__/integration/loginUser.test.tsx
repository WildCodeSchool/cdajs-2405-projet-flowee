import { MockedProvider } from "@apollo/client/testing";
import { LoginDocument } from "@generated/graphql-types";
import LoginForm from "@organisms/LoginForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

//Mock du context d'authentification
const setToken = vi.fn();
vi.mock("@context/authContext", () => ({
  useAuth: () => ({ setToken }),
}));

// Mock de useNavigate de react-router
const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => mockNavigate,
}));

describe("LoginForm", () => {
  const email = "user@mail.com";
  const password = "1234";

  const mocks = [
    {
      request: {
        query: LoginDocument,
        variables: { email, password },
      },
      result: { data: { login: "mocked-jwt-token" } },
    },
  ];

  const routerConfig = {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_normalizeFormMethod: true,
    },
  };

  beforeEach(() => {
    setToken.mockClear();
    mockNavigate.mockClear();
  });

  it("connecte et redirige l'utilisateur avec les bons identifiants", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    // On vérifie que le token est bien stocké et la navigation lancée
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("affiche une erreur si les identifiants sont incorrects", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    const errorMocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email: "wrong@mail.com", password: "badpass" },
        },
        error: new Error("Wrong credentials"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), "wrong@mail.com");
    await userEvent.type(screen.getByLabelText(/password/i), "badpass");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/wrong credentials, please try again/i),
    ).toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("affiche une erreur quand l'email est vide", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    // On remplit uniquement le mot de passe
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // On vérifie que l'erreur s'affiche
    const errorMessage = await screen.findByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red");
    // On vérifie que le token n'est pas stocké
    expect(setToken).not.toHaveBeenCalled();
    // On vérifie qu'il n'y a pas de redirection
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
