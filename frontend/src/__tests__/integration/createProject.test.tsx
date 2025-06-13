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
import { CREATE_PROJECT } from "../../graphql-mutations/project";
import CreateProject from "../../pages/CreateProject";

// Delete react router warnings to avoid cluttering the test output
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

// Stub window.alert to avoid actual alerts during tests
const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
afterAll(() => {
  alertSpy.mockRestore();
});

// Mock useAuth to return a mock user
vi.mock("@context/authContext", () => ({
  useAuth: vi.fn(),
}));
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Router configuration
const routerConfig = {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
  },
};

// Helper function to render the component with mocks
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

describe("Project creation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      authUserData: { role: "ADMIN", id: "admin-id" },
    });
  });

  it("creeate a project with a new client and a new account", async () => {
    const projectData = {
      projectName: "New Project",
      clientEmail: "new@example.com",
      clientName: "New Client",
      endDate: "2025-12-31",
      description: "This is a new project",
    };

    // Mock configuration to simulate a successful project creation
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

    // Mock of GetProjectsByUser used in refetchQueries
    const getProjectsMock: MockedResponse = {
      request: {
        query: GetProjectsByUserDocument,
      },
      result: {
        data: { getProjectsByUser: [] },
      },
      delay: 100,
    };

    // component rendering with the mock
    renderWithMocks([mutationMock, getProjectsMock]);

    // Form filling
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

    // Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // success message verification
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Project created successfully!");
    });

    // Dashboard redirection verification
    await waitFor(() => {
      expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
    });
  });

  it("Display an error if project creation failed", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const projectData = {
      projectName: "Projet KO",
      clientEmail: "fail@example.com",
      clientName: "Client KO",
      endDate: "2025-12-31",
      description: "Error project creation",
    };

    // Mock of CREATE_PROJECT mutation failure
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error("Apollo Error"),
    };

    renderWithMocks([mutationMock]);

    // Form filling
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

    // Submission of the form
    await userEvent.click(
      screen.getByRole("button", { name: /Créer le projet/i }),
    );

    // Verify the error message
    expect(
      await screen.findByText(/Erreur : Erreur Apollo/i),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it("Create a project when account aand client exist and are active", async () => {
    // Preparation of test data
    const projectData = {
      projectName: "Project Test",
      clientEmail: "exist@a.fr",
      clientName: "Bravo",
      endDate: "2025-12-31",
      description: "Test project description",
    };

    // Mock configuration, simulating a successful project creation
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

    // Mock of GetProjectsByUser used in refetchQueries
    const getProjectsMock: MockedResponse = {
      request: {
        query: GetProjectsByUserDocument,
      },
      result: {
        data: { getProjectsByUser: [] },
      },
    };

    // Mocked rendering of the component
    renderWithMocks([mutationMock, getProjectsMock]);

    // Form filling
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

    // Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // Verification of success message
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Project created successfully!");
    });

    // Verification of redirection to the dashboard
    await waitFor(() => {
      expect(screen.getByText(/Dashboard Page/i)).toBeInTheDocument();
    });
  });

  it("Refuse creation when account exist but is connect to another client", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Preparation of test data
    const projectData = {
      projectName: "Test Project",
      clientEmail: "exist@a.fr",
      clientName: "Charlie",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // 2 Mock configuration to simulate the error
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new GraphQLError(
        "Can't create the project. Please check your information or contact your project manager.",
        { extensions: { code: "CLIENT_ACCOUNT_MISMATCH" } },
      ),
    };

    // 3 Mocked rendering of the component
    renderWithMocks([mutationMock]);

    // 4 Form filling
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

    // 5 Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // 6 Error message verification
    expect(
      await screen.findByText(
        /Error : Can't create the project. Please check your information or contact your project manager./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("Prevent creation, client is known but email is unknown", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Préparation des données
    const projectData = {
      projectName: "Test Project",
      clientEmail: "exist@a.fr",
      clientName: "Charlie",
      endDate: "2025-12-31",
      description: "Test project description",
    };

    // 2 Mock configuration to simulate the error
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error(
        "Erreur : Can't create the project. Please check your information or contact your project manager.",
      ),
    };

    // 3 Mocked rendering of the component
    renderWithMocks([mutationMock]);

    // 4 Form filling
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

    // 5 Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // 6 Error message verification
    expect(
      await screen.findByText(
        /Erreur : Can't create the project. Please check your information or contact your project manager./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("Prevent creation when client is archived or deleted", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Preparation of test data
    const projectData = {
      projectName: "Test Project",
      clientEmail: "exist@a.fr",
      clientName: "Bravo",
      endDate: "2025-12-31",
      description: "Description test",
    };

    // 2 Mock configuration to simulate the error
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new Error(
        "Erreur : Can't create the project. Please check your information or contact your project manager.",
      ),
    };

    // 3 Mocked rendering of the component
    renderWithMocks([mutationMock]);

    // 4 Form filling
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

    // 5 Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // 6 Error message verification
    expect(
      await screen.findByText(
        /Erreur : Can't create the project. Please check your information or contact your project manager./i,
      ),
    ).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("Prevent the creation of a second project when the account is inactive", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // Preparation of test data
    const projectData = {
      projectName: "Second Project",
      clientEmail: "test@a.fr",
      clientName: "Alpha",
      endDate: "2025-12-31",
      description: "Second project description",
    };

    // 2 Mock configuration to simulate the error
    const mutationMock: MockedResponse = {
      request: {
        query: CREATE_PROJECT,
        variables: { newProject: projectData },
      },
      error: new GraphQLError(
        "Can't create the project. Please check your information or contact your project manager.",
        { extensions: { code: "STATUS_INVALID" } },
      ),
    };

    // 3 Mocked rendering of the component
    renderWithMocks([mutationMock]);

    // 4 Form filling
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

    // 5 Form submission
    await userEvent.click(
      screen.getByRole("button", { name: /Create the project/i }),
    );

    // 6 Error message verification
    expect(
      await screen.findByText(
        /Erreur : Can't create the project. Please check your information or contact your project manager./i,
      ),
    ).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
