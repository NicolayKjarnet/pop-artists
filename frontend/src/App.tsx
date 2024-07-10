import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageHeader from "./components/shared/MainPageHeader";
import { AboutPage, HomePage, ManageArtistPage } from "./pages/Index";
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
              <Route path="artists/:id" element={<ArtistDetailPage />}></Route>
              <Route
                path="manage-artist"
                element={<ManageArtistPage />}
              ></Route>
            </Routes>
          </main>
        </ArtistProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
