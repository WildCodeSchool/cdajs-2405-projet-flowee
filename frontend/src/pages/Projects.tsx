import Navigation from "../components/Navigation";
export default function Projects() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 px-4 md:ml-4 h-full overflow-auto">
        <h1>Welcome to the Projects Page</h1>
        {/* <DisplayProjects type="company" variant="projects" /> */}
      </div>
    </div>
  );
}
