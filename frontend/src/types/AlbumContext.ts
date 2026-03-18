import { AlbumType } from "./Album";

export type AlbumContextType = {
  albumArray: AlbumType[];
  getAllAlbums: () => Promise<void>;
  getAlbumById: (id: number) => void;
  addAlbum: (album: AlbumType) => Promise<void>;
  updateAlbum: (album: AlbumType) => Promise<void>;
  deleteAlbum: (id: number) => Promise<AlbumType | undefined>;
};
