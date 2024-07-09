import { useState, createContext, FC, ReactNode, useEffect } from "react";
import { AlbumType } from "../types/Album";
import { AlbumContextType } from "../types/AlbumContext";
import AlbumService from "../services/AlbumService";

export const AlbumContext = createContext<AlbumContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AlbumProvider: FC<Props> = ({ children }) => {
  const [albumArray, setAlbum] = useState<AlbumType[]>([]);

  useEffect(() => {
    getAllAlbums();
  }, []);

  const getAllAlbums = async (): Promise<void> => {
    try {
      const allAlbums = await AlbumService.getAllAlbums();
      setAlbum(allAlbums);

      return allAlbums;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get all albums.");
    }
  };

  const getAlbumById = async (id: number) => {
    const album = await AlbumService.getAlbumById(id);
    console.log(album);
  };

  const addAlbum = async (album: AlbumType) => {
    setAlbum([album, ...albumArray]);
    await AlbumService.postAlbum(album);
  };

  const updateAlbum = async (album: AlbumType) => {
    setAlbum([album, ...albumArray]);
    await AlbumService.putAlbum(album);
  };

  const deleteAlbum = async (id: number): Promise<AlbumType | undefined> => {
    try {
      await AlbumService.deleteAlbum(id);
      const newAlbumArray = albumArray.filter((album) => album.id !== id);
      setAlbum(newAlbumArray);
      const deletedAlbum = albumArray.find((album) => album.id === id);

      return deletedAlbum;
    } catch {
      return undefined;
    }
  };

  return (
    <AlbumContext.Provider
      value={{
        albumArray,
        getAllAlbums,
        getAlbumById,
        addAlbum,
        updateAlbum,
        deleteAlbum,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
