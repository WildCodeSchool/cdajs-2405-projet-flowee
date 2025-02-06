import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import DisplayProjects from "../components/DisplayProjects";
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

describe("DisplayProjects Component", () => {
  it("render without error", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <DisplayProjects variant="projects" type="company" searchFilter="" />
        </BrowserRouter>
      </MockedProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
