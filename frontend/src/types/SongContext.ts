import { SongType } from "./Song";

export type SongContextType = {
  songArray: SongType[];
  getAllSongs: () => Promise<void>;
  getSongById: (id: number) => void;
  addSong: (song: SongType) => Promise<void>;
  updateSong: (song: SongType) => Promise<void>;
  deleteSong: (id: number) => Promise<SongType | undefined>;
};
