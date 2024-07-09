import { Link } from "react-router-dom";
import "../../App.css";

const MainNavigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="http://127.0.0.1:5500/wwwroot/index.html"
                className="nav-link"
              >
                Docs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-new-artist" className="nav-link">
                Add New Artist
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/update-artist" className="nav-link">
                Update Artists
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete-artist" className="nav-link">
                Delete Artists
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
