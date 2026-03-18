import { ArtistType } from "./Artist";

export type ArtistContextType = {
  artistArray: ArtistType[];
  getAllArtists: (artist: ArtistType) => void;
  getArtistById: (id: number) => Promise<ArtistType | undefined>;
  getArtistByName: (name: string) => void;
  addArtist: (artist: ArtistType) => void;
  updateArtist: (artist: ArtistType) => void;
  deleteArtist: (id: number) => Promise<ArtistType | undefined>;
  setArtistArray: (artists: ArtistType[]) => void;
};
