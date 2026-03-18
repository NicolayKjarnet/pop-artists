import { SongType } from "./Song";

export type AlbumType = {
  id?: number;
  albumName: string;
  artistId: number;
  albumImage: string;
  songs: SongType[];
};
