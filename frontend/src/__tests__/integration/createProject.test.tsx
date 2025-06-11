import { MockedProvider, type MockedResponse } from "@apollo/client/testing";
import { useAuth } from "@context/authContext";
import { GetProjectsByUserDocument } from "@generated/graphql-types";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CREATE_PROJECT } from "../../graphql-mutations/createproject";
import CreateProject from "../../pages/CreateProject";

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

// Stub window.alert pour capturer l'alerte
const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
afterAll(() => {
  alertSpy.mockRestore();
});

// Mock du contexte d'authentification
vi.mock("@context/authContext", () => ({
  useAuth: vi.fn(),
}));
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Configuration du router
const routerConfig = {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
  },
};

// Helper de rendu
function renderWithMocks(mocks: MockedResponse[] = []) {
  const router = createMemoryRouter(
    [
      { path: "/", element: <CreateProject /> },
      { path: "/dashboard", element: <div>Dashboard Page</div> },
    ],
    routerConfig,
  );

  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RouterProvider router={router} />
    </MockedProvider>,
  );
}

describe("Création de projet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      authUserData: { role: "ADMIN", id: "admin-id" },
    });
  });

  it("crée un projet avec un nouveau client et un nouveau compte", async () => {
    const projectData = {
      projectName: "Nouveau Projet",
      clientEmail: "nouveau@example.com",
      clientName: "Nouveau Client",
      endDate: "2025-12-31",
      description: "Description du projet",
    };

    // Configuration du mock pour simuler la création réussie
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      result: {
        data: {
          createProject: {
            id: "1",
            projectName: projectData.projectName,
            companyUserId: 1,
            description: projectData.description,
            startDate: new Date().toISOString(),
            endDate: projectData.endDate,
            status: "NOT_STARTED",
          },
        },
      },
    };

    // Mock de GetProjectsByUser utilisé en refetchQueries
    const getProjectsMock: MockedResponse = {
      request: {
        query: GetProjectsByUserDocument,
      },
      result: {
        data: { getProjectsByUser: [] },
      },
      delay: 100,
    };

    // Rendu du composant avec le mock
    renderWithMocks([mutationMock, getProjectsMock]);

    // Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // Vérification du message de succès
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Projet créé avec succès !");
    });

    // Vérification de la redirection vers le dashboard
    await waitFor(() => {
      expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
    });
  });

  it("affiche une erreur si la création de projet échoue", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const projectData = {
      projectName: "Projet KO",
      clientEmail: "fail@example.com",
      clientName: "Client KO",
      endDate: "2025-12-31",
      description: "Erreur attendue",
    };

    // Mock de la mutation CREATE_PROJECT qui échoue
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error("Erreur Apollo"),
    };

    renderWithMocks([mutationMock]);

    // Remplir le formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // Soumettre
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // Vérifier qu'un message d'erreur s'affiche
    expect(
      await screen.findByText(/Erreur : Erreur Apollo/i),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it("crée un projet quand le compte et le client existent et sont actifs", async () => {
    // Préparation des données de test
    const projectData = {
      projectName: "Projet Test",
      clientEmail: "exist@a.fr",
      clientName: "Bravo",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // Configuration du mock, simulation de la création réussie
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      result: {
        data: {
          createProject: {
            id: "1",
            projectName: projectData.projectName,
            companyUserId: 1,
            description: projectData.description,
            startDate: new Date().toISOString(),
            endDate: projectData.endDate,
            status: "NOT_STARTED",
          },
        },
      },
    };

    // Mock de GetProjectsByUser utilisé en refetchQueries
    const getProjectsMock: MockedResponse = {
      request: {
        query: GetProjectsByUserDocument,
      },
      result: {
        data: { getProjectsByUser: [] },
      },
    };

    // Rendu du composant avec le mock
    renderWithMocks([mutationMock, getProjectsMock]);

    // Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // Vérification du message de succès
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Projet créé avec succès !");
    });

    // Vérification de la redirection vers le dashboard
    await waitFor(() => {
      expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
    });
  });

  it("refuse la création quand le compte existe mais est lié à un autre client", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Préparation des données de test
    const projectData = {
      projectName: "Projet Test",
      clientEmail: "exist@a.fr",
      clientName: "Charlie",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // 2 Configuration du mock pour simuler l'erreur du backend
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new GraphQLError(
        "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
        { extensions: { code: "CLIENT_ACCOUNT_MISMATCH" } },
      ),
    };

    // 3 Rendu du composant avec le mock
    renderWithMocks([mutationMock]);

    // 4 Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // 5 Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // 6 Vérification du message d'erreur
    expect(
      await screen.findByText(
        /Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("refuse la création quand le client existe mais le mail est inconnu", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Préparation des données
    const projectData = {
      projectName: "Projet Test",
      clientEmail: "exist@a.fr",
      clientName: "Charlie",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // 2 Configuration du mock pour simuler l'erreur
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error(
        "Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
      ),
    };

    // 3 Rendu du composant avec le mock
    renderWithMocks([mutationMock]);

    // 4 Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // 5 Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // 6 Vérification du message d'erreur
    expect(
      await screen.findByText(
        /Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("refuse la création quand le client est supprimé ou archivé", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Préparation des données de test
    const projectData = {
      projectName: "Projet Test",
      clientEmail: "exist@a.fr",
      clientName: "Bravo",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // 2 Configuration du mock pour simuler l'erreur
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error(
        "Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
      ),
    };

    // 3 Rendu du composant avec le mock
    renderWithMocks([mutationMock]);

    // 4 Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // 5 Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // 6 Vérification du message d'erreur
    expect(
      await screen.findByText(
        /Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("refuse la création d'un second projet quand le compte est inactif", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Préparation des données de test
    const projectData = {
      projectName: "Second Projet",
      clientEmail: "test@a.fr",
      clientName: "Alpha",
      endDate: "2025-12-31",
      description: "Description du second projet",
    };

    // 2 Configuration du mock pour simuler l'erreur du backend
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new GraphQLError(
        "Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet.",
        { extensions: { code: "STATUS_INVALID" } },
      ),
    };

    // 3 Rendu du composant avec le mock
    renderWithMocks([mutationMock]);

    // 4 Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText(/Project Name/i),
      projectData.projectName,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Email/i),
      projectData.clientEmail,
    );
    await userEvent.type(
      screen.getByLabelText(/Client Name/i),
      projectData.clientName,
    );
    await userEvent.type(
      screen.getByLabelText(/End Date/i),
      projectData.endDate,
    );
    await userEvent.type(
      screen.getByLabelText(/Description/i),
      projectData.description,
    );

    // 5 Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // 6 Vérification du message d'erreur
    expect(
      await screen.findByText(
        /Erreur : Impossible de créer le projet. Merci de vérifier vos informations ou de contacter votre manager de projet./i,
      ),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
