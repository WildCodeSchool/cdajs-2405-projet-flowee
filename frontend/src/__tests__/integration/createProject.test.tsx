// src/__tests__/integration/createProject.test.tsx
import { MockedProvider, type MockedResponse } from "@apollo/client/testing";
import { useAuth } from "@context/authContext";
import { GetProjectsByUserDocument } from "@generated/graphql-types";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    // Mock de la mutation CREATE_PROJECT
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

    renderWithMocks([mutationMock, getProjectsMock]);

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

    // 1) Vérifier l'alerte
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Projet créé avec succès !");
    });

    // 2) Vérifier que la page Dashboard est affichée
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

    // Vérifier qu'un message d'erreur s'affiche (à adapter selon ton UI)
    expect(
      await screen.findByText(/Erreur : Erreur Apollo/i),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
