import Navigation from "../components/Navigation";
import DisplayProjects from "../components/DisplayProjects";
export default function Projects() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 p-4 md:ml-4">
        <h1>Welcome to the Projects Page</h1>
        <DisplayProjects type="company" variant="projects" />
      </div>
    </div>
  );
}
