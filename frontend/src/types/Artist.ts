import { AlbumType } from "./Album";

export type ArtistType = {
  id?: number;
  artistName: string;
  genre: string;
  image: string;
  description: string;
  albums: AlbumType[];
};
