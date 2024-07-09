import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageHeader from "./components/shared/MainPageHeader";
import {
  AboutPage,
  AddNewArtistPage,
  DeleteArtistPage,
  HomePage,
  UpdateArtistPage,
} from "./pages/Index";
import ArtistDetailPage from "./pages/artists/ArtistDetailPage";
import { ArtistProvider } from "./contexts/ArtistContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainPageHeader />
        <ArtistProvider>
          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="about" element={<AboutPage />}></Route>
              <Route
                path="add-new-artist"
                element={<AddNewArtistPage />}
              ></Route>
              <Route
                path="update-artist"
                element={<UpdateArtistPage />}
              ></Route>
              <Route
                path="delete-artist"
                element={<DeleteArtistPage />}
              ></Route>
              <Route path="artists/:id" element={<ArtistDetailPage />}></Route>{" "}
              {/* New route */}
            </Routes>
          </main>
        </ArtistProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
