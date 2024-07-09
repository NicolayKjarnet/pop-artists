import axios from "axios";
import { ArtistType } from "../types/Artist";

const ArtistService = (() => {
  const baseURL = process.env.REACT_APP_API_URL;

  const artistEndpoints = {
    artists: `${baseURL}Artist`,
    artistByName: `${baseURL}Artist/SearchByName?name=`,
  };

  const getAllArtists = async () => {
    try {
      const result = await axios.get(artistEndpoints.artists);
      return result.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getArtistById = async (id: number) => {
    const result = await axios.get(`${artistEndpoints.artists}/${id}`);
    return result.data;
  };

  const getArtistByName = async (name: string) => {
    const result = await axios.get(`${artistEndpoints.artistByName}${name}`);
    return result.data;
  };

  const postArtist = async (a: ArtistType) => {
    const result = await axios.post(artistEndpoints.artists, a);
    console.log(result);
  };

  const putArtist = async (a: ArtistType) => {
    const result = await axios.put(artistEndpoints.artists, a);
    return result.data;
  };

  const deleteArtist = async (id: number) => {
    try {
      console.log("Sending delete request for artist ID:", id);
      const result = await axios.delete(`${artistEndpoints.artists}/${id}`);
      console.log("Delete request successful for artist ID:", id);
      return result;
    } catch (error) {
      console.error(
        "Error sending delete request for artist ID:",
        id,
        ":",
        error
      );
      throw error;
    }
  };

  return {
    getAllArtists,
    getArtistByName,
    getArtistById,
    postArtist,
    putArtist,
    deleteArtist,
  };
})();

export default ArtistService;
