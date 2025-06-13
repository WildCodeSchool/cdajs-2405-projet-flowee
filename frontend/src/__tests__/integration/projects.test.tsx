import { MockedProvider, type MockedResponse } from "@apollo/client/testing";
import { useAuth } from "@context/authContext";
import { GetProjectsByUserDocument } from "@generated/graphql-types";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import Projects from "../../pages/Projects";

//  Delete react router warnings to avoid cluttering the test output
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

// 1. Context authentification mock
vi.mock("@context/authContext", () => ({
  useAuth: vi.fn(),
}));

// Conversion of mock for TypeScript
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Full mock to match the expected structure
const mockProjects = [
  {
    id: "1",
    projectName: "Alpha Project",
    companyUserId: "user-1",
    description: "A description of Alpha Project",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "In Progress",
    client: { id: "c1", clientName: "Client A", __typename: "Client" },
    deliverables: [],
    __typename: "Project",
  },
  {
    id: "2",
    projectName: "Beta Project",
    companyUserId: "user-2",
    description: "A description of Beta Project",
    startDate: "2024-02-01",
    endDate: "2025-01-15",
    status: "Done",
    client: { id: "c2", clientName: "Client B", __typename: "Client" },
    deliverables: [],
    __typename: "Project",
  },
];

// Router configuration
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

  it("Displays the loading state then projects when request is successful", async () => {
    mockUseAuth.mockReturnValue({ authUserData: { role: "ADMIN" } });
    const successMocks = [
      {
        request: { query: GetProjectsByUserDocument, variables: {} },
        result: { data: { getProjectsByUser: mockProjects } },
      },
    ];

    renderComponent(successMocks);

    // 1 Verifies that the loading state is displayed initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // 2 Wait for loading to finish and projects to be displayed
    await waitFor(() => {
      expect(screen.getByText("Alpha project")).toBeInTheDocument();
      expect(screen.getByText("Beta project")).toBeInTheDocument();
    });

    // 3 Verifies that the loading state is no longer displayed
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("Displays an error message if Graphql fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockUseAuth.mockReturnValue({ authUserData: { role: "ADMIN" } });
    const errorMocks = [
      {
        request: {
          query: GetProjectsByUserDocument,
          variables: {},
        },
        error: new Error("An error occured"),
      },
    ];

    renderComponent(errorMocks);

    expect(await screen.findByText(/An error occured/i)).toBeInTheDocument();
    errorSpy.mockRestore();
  });

  it("Displays a message if no projects found", async () => {
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

  it("Doesn't allow access withtout the right role", () => {
    // Simulate an unauthorized user
    mockUseAuth.mockReturnValue({ authUserData: { role: "SOME_OTHER_ROLE" } });

    // Adds a mock to avoid the error "No more mocked responses"
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
