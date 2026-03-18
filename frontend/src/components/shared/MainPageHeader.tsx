import { Link } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import "../../App.css";

const MainPageHeader = () => {
  return (
    <header className="header main-page-header py-4 bg-dark text-white">
      <div className="container text-center">
        <Link
          to="/"
          className="header-title text-decoration-none h1 d-block mb-3"
        >
          Artist API
        </Link>
        <MainNavigation />
      </div>
    </header>
  );
};

export default MainPageHeader;
