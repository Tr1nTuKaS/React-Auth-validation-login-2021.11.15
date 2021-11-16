import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <h1 className="display-1">Welcome to our Website</h1>
      <Link to="/register">
        <button className="btn btn-outline-success">Register here</button>
      </Link>
      <Link to="/login">
        <button className="btn btn-outline-info">Login here</button>
      </Link>
      <Link to="/profile">
        <h5>Profile</h5>
      </Link>
    </main>
  );
}

export default HomePage;
