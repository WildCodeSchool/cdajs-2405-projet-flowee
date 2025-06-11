import { MockedProvider, type MockedResponse } from "@apollo/client/testing";
import { useAuth } from "@context/authContext";
import { GetProjectsByUserDocument } from "@generated/graphql-types";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeAll, afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import Projects from "../../pages/Projects";

// Suppression des avertissements React Router
const originalConsoleWarn = console.warn;
beforeAll(() => {
  console.warn = (msg, ...args) => {
    if (!msg.includes("React Router Future Flag Warning")) {
      originalConsoleWarn(msg, ...args);
    }
  };
});
afterAll(() => {
  console.warn = originalConsoleWarn;
});

// 1. Mock du contexte d'authentification
vi.mock("@context/authContext", () => ({
  useAuth: vi.fn(),
}));

// Conversion du mock pour TypeScript
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Mock complet pour correspondre à la requête
const mockProjects = [
  {
    id: "1",
    projectName: "Projet Alpha",
    companyUserId: "user-1",
    description: "Description Alpha",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "In Progress",
    client: { id: "c1", clientName: "Client A", __typename: "Client" },
    deliverables: [],
    __typename: "Project",
  },
  {
    id: "2",
    projectName: "Projet Beta",
    companyUserId: "user-2",
    description: "Description Beta",
    startDate: "2024-02-01",
    endDate: "2025-01-15",
    status: "Done",
    client: { id: "c2", clientName: "Client B", __typename: "Client" },
    deliverables: [],
    __typename: "Project",
  },
];

// Configuration du routeur
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

const renderComponent = (mocks: MockedResponse[] = []) => {
  const router = createMemoryRouter(
    [{ path: "/", element: <Projects /> }],
    routerConfig,
  );
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RouterProvider router={router} />
    </MockedProvider>,
  );
};

describe("Projects Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche l'état de chargement puis les projets quand la requête réussit", async () => {
    mockUseAuth.mockReturnValue({ authUserData: { role: "ADMIN" } });
    const successMocks = [
      {
        request: { query: GetProjectsByUserDocument, variables: {} },
        result: { data: { getProjectsByUser: mockProjects } },
      },
    ];

    renderComponent(successMocks);

    // 1 Vérifie l'état de chargement initial
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // 2 Attendre que le chargement soit terminé et que les projets soient affichés
    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("Projet Beta")).toBeInTheDocument();
    });

    // 3 Vérifier que le loading a disparu
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("affiche un message d'erreur si la requête GraphQL échoue", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockUseAuth.mockReturnValue({ authUserData: { role: "ADMIN" } });
    const errorMocks = [
      {
        request: {
          query: GetProjectsByUserDocument,
          variables: {},
        },
        error: new Error("Une erreur s'est produite"),
      },
    ];

    renderComponent(errorMocks);

    expect(
      await screen.findByText(/une erreur s'est produite/i),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("affiche un message si aucun projet n'est trouvé", async () => {
    mockUseAuth.mockReturnValue({ authUserData: { role: "ADMIN" } });
    const emptyMocks = [
      {
        request: {
          query: GetProjectsByUserDocument,
          variables: {},
        },
        result: {
          data: {
            getProjectsByUser: [],
          },
        },
      },
    ];

    renderComponent(emptyMocks);

    expect(await screen.findByText("No projects found!")).toBeInTheDocument();
  });

  it("n'autorise pas l'accès aux utilisateurs sans le bon rôle", () => {
    // Simule un utilisateur non autorisé
    mockUseAuth.mockReturnValue({ authUserData: { role: "SOME_OTHER_ROLE" } });

    // Ajout d'un mock pour éviter l'erreur "No more mocked responses"
    const mocksForAuth = [
      {
        request: { query: GetProjectsByUserDocument, variables: {} },
        result: { data: { getProjectsByUser: [] } },
      },
    ];

    renderComponent(mocksForAuth);

    expect(screen.getByText("Unauthorized user!")).toBeInTheDocument();
  });
});
