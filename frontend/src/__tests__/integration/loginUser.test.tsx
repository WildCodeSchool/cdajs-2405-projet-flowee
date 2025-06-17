import { MockedProvider } from "@apollo/client/testing";
import { LoginDocument } from "@generated/graphql-types";
import LoginForm from "@organisms/LoginForm";
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

//Context authentification mock
const setToken = vi.fn();
vi.mock("@context/authContext", () => ({
  useAuth: () => ({ setToken }),
}));

//react-router useNavigate mock
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
      delay: 100,
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

  it("Logs user and redirect with right elements", async () => {
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
    // Verifies that token is set and user is redirected
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("Displays an error if login elements are incorrect ", async () => {
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

  it("Displays an error if email is empty", async () => {
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

    // Fills only the password
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Error message should appear
    const errorMessage = await screen.findByText("Email is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red");
    // Verifies that the token is not set
    expect(setToken).not.toHaveBeenCalled();
    // Verifies that the navigation did not happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("Displays an error when password is empty", async () => {
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

    // Fills only the email
    await userEvent.type(screen.getByLabelText(/email/i), "user@mail.com");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Error message should appear
    const errorMessage = await screen.findByText("Password is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red");
    // Verifies that the token is not set
    expect(setToken).not.toHaveBeenCalled();
    // Verifies that the navigation did not happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("Displays errors when both fields are empty", async () => {
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

    // Don't fill any fields. Click the sign in button
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verifies that both error messages are displayed
    const emailError = await screen.findByText("Email is required");
    const passwordError = await screen.findByText("Password is required");
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(emailError).toHaveClass("text-red");
    expect(passwordError).toHaveClass("text-red");
    // Verifies that the token is not set
    expect(setToken).not.toHaveBeenCalled();
    // Verifies that the navigation did not happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("Deals correctly with spaces before and after email", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <LoginForm />,
        },
      ],
      routerConfig,
    );

    //Prepare mock for spaceless email
    const email = "user@mail.com";
    const password = "1234";
    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email, password },
        },
        result: { data: { login: "mocked-jwt-token" } },
        delay: 100,
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    // Types in email with spaces and right password
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "   user@mail.com   ",
    );
    await userEvent.type(screen.getByLabelText(/password/i), password);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Verfies that login is successful ( token is set and navigation happens )
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("Only submit once even if user clicks many times", async () => {
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

    const email = "user@mail.com";
    const password = "1234";
    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: { email, password },
        },
        result: { data: { login: "mocked-jwt-token" } },
        delay: 100,
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), email);
    await userEvent.type(screen.getByLabelText(/password/i), password);

    const button = screen.getByRole("button", { name: /sign in/i });

    // First click should trigger the login. The only one that will be processed
    await userEvent.click(button);

    // Wait for the button to be disabled. Mutation processing
    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    // More clicks should not trigger the login again
    await userEvent.click(button);
    await userEvent.click(button);

    // Verifies that the login mutation was called only once
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    errorSpy.mockRestore();
  });

  it("Display a generci message if account is deactivated", async () => {
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

    // Verifies that the generic error message is displayed
    expect(
      await screen.findByText(/wrong credentials, please try again/i),
    ).toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("Allow login with Enter", async () => {
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

    // Press Enter in the password field
    await userEvent.keyboard("{Enter}");

    // Verifies that login is successful
    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith("mocked-jwt-token");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("Has buttons and fields accessible with keyboard and the right labels", async () => {
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

    // Verfies that the email and password fields are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Verifies that button is accessible and has the right label
    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeInTheDocument();

    // Forces blur to simulate tab navigation
    (document.activeElement as HTMLElement)?.blur();

    // Tabs in the dom order
    await userEvent.tab(); // 1. Email
    expect(screen.getByLabelText(/email/i)).toHaveFocus();

    await userEvent.tab(); // 2. Password
    expect(screen.getByLabelText(/password/i)).toHaveFocus();

    await userEvent.tab(); // 3. Forgot your password?
    expect(screen.getByText(/forgot your password\?/i)).toHaveFocus();

    await userEvent.tab(); // 4. Sign in
    expect(button).toHaveFocus();
  });

  it("Displays a generic error message for SQL injection", async () => {
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

    // Email with right format but weird
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
    errorSpy.mockRestore();
  });

  it("Doesn't display hmtl or script in error messages (XSS protection)", async () => {
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

    // Valid email but xss password
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

    //Verifies that generic error message is displayed
    const errorMessage = await screen.findByText(
      /wrong credentials, please try again/i,
    );
    expect(errorMessage).toBeInTheDocument();

    // Verifies that the xss script is not rendered
    expect(
      screen.queryByText(/<script>alert\(1\)<\/script>/i),
    ).not.toBeInTheDocument();
    expect(setToken).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
