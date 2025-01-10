import Navigation from "../Components/Navigation";

export default function Dashboard() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-20 md:flex-shrink-0">
        <Navigation />
      </div>
      <div className="flex-1 p-4 md:ml-4">
        <h1>Welcome to the Dashboard Page</h1>
        {/* Add your page content here */}
      </div>
    </div>
  );
}
