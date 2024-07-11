import ArtistList from "../components/artists/ArtistList";
import { useEffect, useContext } from "react";
import { ArtistContext } from "../contexts/ArtistContext";
import { ArtistContextType } from "../types/ArtistContext";
import ArtistService from "../services/ArtistService";
import SearchForArtist from "../components/artists/SearchForArtist";

const HomePage = () => {
  const { setArtistArray } = useContext(ArtistContext) as ArtistContextType;

  useEffect(() => {
    const fetchArtists = async () => {
      const allArtists = await ArtistService.getAllArtists();
      setArtistArray(allArtists);
    };
    fetchArtists();
  }, [setArtistArray]);

  return (
    <div className="container mt-4">
      <h2>All artists</h2>
      <SearchForArtist updateContext={true} />
      <ArtistList buttonType="seeMore" />
    </div>
  );
};

export default HomePage;
