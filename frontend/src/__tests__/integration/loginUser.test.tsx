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
  const password = "Motdepasse1234!";

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

  it("affiche une erreur quand le mot de passe est vide", async () => {
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

    // On remplit uniquement l'email
    await userEvent.type(screen.getByLabelText(/email/i), "user@mail.com");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // On vérifie que l'erreur s'affiche
    const errorMessage = await screen.findByText("Password is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red");
    // On vérifie que le token n'est pas stocké
    expect(setToken).not.toHaveBeenCalled();
    // On vérifie qu'il n'y a pas de redirection
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("affiche des erreurs quand les deux champs sont vides", async () => {
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

    // On ne remplit aucun champ, on clique directement
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // On vérifie que les deux messages d'erreur s'affichent
    const emailError = await screen.findByText("Email is required");
    const passwordError = await screen.findByText("Password is required");
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(emailError).toHaveClass("text-red");
    expect(passwordError).toHaveClass("text-red");
    // On vérifie que le token n'est pas stocké
    expect(setToken).not.toHaveBeenCalled();
    // On vérifie qu'il n'y a pas de redirection
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("gère correctement les espaces avant/après dans l'email", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    // On prépare le mock pour l'email sans espaces
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

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    // On saisit l'email avec des espaces et le bon mot de passe
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "   user@mail.com   ",
    );
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // On vérifie que la connexion fonctionne (token stocké et redirection)
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("ne traite qu'une seule soumission même si l'utilisateur clique plusieurs fois rapidement", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

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

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);

    // Double (ou triple) clic rapide sur le bouton
    const button = screen.getByRole("button", { name: /sign in/i });
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);

    // On vérifie qu'une seule connexion est traitée
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("affiche un message générique si le compte est désactivé", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    const email = "disabled@mail.com";
    const password = "1234";
    const errorMocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email, password },
        },
        error: new Error("Account is inactive"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // On vérifie que le message générique s'affiche
    expect(
      await screen.findByText(/wrong credentials, please try again/i),
    ).toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("permet la connexion en appuyant sur la touche Entrée", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

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

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);

    // Appui sur "Entrée" dans le champ mot de passe
    await userEvent.keyboard("{Enter}");

    // On vérifie que la connexion fonctionne
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("a des champs et boutons accessibles au clavier et des labels corrects", async () => {
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

    // Vérifie la présence des labels
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Vérifie que le bouton est focusable et accessible
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeInTheDocument();

    // Forcer le blur pour simuler un utilisateur qui commence à tabuler
    (document.activeElement as HTMLElement)?.blur();

    // Tabule dans l'ordre réel du DOM
    await userEvent.tab(); // 1. Email
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    await userEvent.tab(); // 2. Password
    expect(screen.getByLabelText(/password/i)).toHaveFocus();

    await userEvent.tab(); // 3. Forgot your password?
    expect(screen.getByText(/forgot your password\?/i)).toHaveFocus();

    await userEvent.tab(); // 4. Sign in
    expect(button).toHaveFocus();
  });

  it("affiche un message d'erreur générique pour une tentative d'injection SQL", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    // Email au format valide mais "bizarre"
    const email = "or1@evil.com";
    const password = "' OR 1=1 --";
    const errorMocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email, password },
        },
        error: new Error("Wrong credentials"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/wrong credentials, please try again/i),
    ).toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("n'affiche pas de code HTML ou script dans les messages d'erreur (protection XSS)", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    // Email valide, mot de passe avec XSS
    const email = "xss@test.com";
    const password = "<script>alert(1)</script>";
    const errorMocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email, password },
        },
        error: new Error("Wrong credentials"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Vérifie que le message d'erreur générique s'affiche
    const errorMessage = await screen.findByText(
      /wrong credentials, please try again/i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Vérifie que le texte saisi n'est pas affiché tel quel dans l'UI
    expect(
      screen.queryByText(/<script>alert\(1\)<\/script>/i),
    ).not.toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
