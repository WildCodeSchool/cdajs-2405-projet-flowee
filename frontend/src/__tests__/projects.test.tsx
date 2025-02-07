import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import DisplayCards from "../components/DisplayCards";
import { GET_ALL_PROJECTS_QUERY } from "../graphql-queries/projects";

const mockProjects = [
  {
    id: "1",
    name: "Projet Alpha",
    description: "Description Alpha",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "In Progress",
    author: "Auteur 1",
    client: { firstname: "Jean", lastname: "Dupont" },
  },
];

const mocks = [
  {
    request: {
      query: GET_ALL_PROJECTS_QUERY,
    },
    result: {
      data: {
        getAllProjects: mockProjects,
      },
    },
  },
];

describe("DisplayCards Component", () => {
  it("renders loading state", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <DisplayCards
            query={GET_ALL_PROJECTS_QUERY}
            variant="projects"
            type="company"
            searchFilter=""
            cardType="project"
          />
        </BrowserRouter>
      </MockedProvider>,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders project data correctly", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <DisplayCards
            query={GET_ALL_PROJECTS_QUERY}
            variant="projects"
            type="company"
            searchFilter=""
            cardType="project"
          />
        </BrowserRouter>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Projet Alpha")).toBeInTheDocument();
      expect(screen.getByText("2024-12-31")).toBeInTheDocument();
    });
  });
});
