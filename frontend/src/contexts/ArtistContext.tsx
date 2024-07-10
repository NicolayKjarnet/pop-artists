import { useState, createContext, FC, ReactNode, useEffect } from "react";
import { ArtistType } from "../types/Artist";
import { ArtistContextType } from "../types/ArtistContext";
import ArtistService from "../services/ArtistService";

export const ArtistContext = createContext<ArtistContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const ArtistProvider: FC<Props> = ({ children }) => {
  const [artistArray, setArtist] = useState<ArtistType[]>([]);

  useEffect(() => {
    getAllArtists();
  }, []);

  const getAllArtists = async (): Promise<void> => {
    try {
      const allArtists = await ArtistService.getAllArtists();
      setArtist(allArtists);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get all artists.");
    }
  };

  const getArtistById = async (id: number): Promise<ArtistType | undefined> => {
    try {
      const artist = await ArtistService.getArtistById(id);
      return artist;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get artist by ID.");
    }
  };

  const getArtistByName = async (name: string): Promise<void> => {
    try {
      const artist = await ArtistService.getArtistByName(name);
      setArtist([artist]);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get artist by name.");
    }
  };

  const addArtist = async (artist: ArtistType) => {
    setArtist([artist, ...artistArray]);
    await ArtistService.postArtist(artist);
  };

  const updateArtist = async (artist: ArtistType) => {
    const updatedArtists = artistArray.map((a) =>
      a.id === artist.id ? artist : a
    );
    setArtist(updatedArtists);
    await ArtistService.putArtist(artist);
  };

  const deleteArtist = async (id: number): Promise<ArtistType | undefined> => {
    try {
      console.log("Attempting to delete artist with ID:", id);
      const deletedArtist = artistArray.find((artist) => artist.id === id);
      if (!deletedArtist) {
        console.log("Artist with ID", id, "not found in the array.");
        return undefined;
      }
      await ArtistService.deleteArtist(id);
      const newArtistArray = artistArray.filter((artist) => artist.id !== id);
      setArtist(newArtistArray);
      console.log("Artist with ID", id, "deleted successfully.");
      return deletedArtist;
    } catch (error) {
      console.error("Error deleting artist with ID", id, ":", error);
      return undefined;
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        artistArray,
        getAllArtists,
        getArtistById,
        getArtistByName,
        addArtist,
        updateArtist,
        deleteArtist,
        setArtistArray: setArtist,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
};
