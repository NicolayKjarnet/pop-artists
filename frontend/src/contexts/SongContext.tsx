import { useState, createContext, FC, ReactNode, useEffect } from "react";
import { SongType } from "../types/Song";
import { SongContextType } from "../types/SongContext";
import SongService from "../services/SongService";

export const SongContext = createContext<SongContextType | null>(null);

type SongProviderProps = {
  children: ReactNode;
};

export const SongProvider: FC<SongProviderProps> = ({ children }) => {
  const [songArray, setSong] = useState<SongType[]>([]);

  useEffect(() => {
    getAllSongs();
  }, []);

  const getAllSongs = async (): Promise<void> => {
    try {
      const allSongs = await SongService.getAllSongs();
      setSong(allSongs);

      return allSongs;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get all songs.");
    }
  };

  const getSongById = async (id: number) => {
    const song = await SongService.getSongById(id);
    console.log(song);
  };

  const addSong = async (song: SongType) => {
    setSong([song, ...songArray]);
    await SongService.postSong(song);
  };

  const updateSong = async (song: SongType) => {
    setSong([song, ...songArray]);
    await SongService.putSong(song);
  };

  const deleteSong = async (id: number): Promise<SongType | undefined> => {
    try {
      await SongService.deleteSong(id);
      const newSongArray = songArray.filter((song) => song.id !== id);
      setSong(newSongArray);
      const deletedSong = songArray.find((song) => song.id === id);

      return deletedSong;
    } catch {
      return undefined;
    }
  };

  return (
    <SongContext.Provider
      value={{
        songArray,
        getAllSongs,
        getSongById,
        addSong,
        updateSong,
        deleteSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
