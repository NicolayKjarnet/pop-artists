import axios from "axios";
import { SongType } from "../types/Song";

const SongService = (() => {
  const baseURL = process.env.REACT_APP_API_URL;

  const songEndpoints = {
    songs: `${baseURL}/Song`,
  };

  const getAllSongs = async () => {
    try {
      const result = await axios.get(songEndpoints.songs);
      return result.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getSongById = async (id: number) => {
    const result = await axios.get(`${songEndpoints.songs}/${id}`);
    return result.data;
  };

  const postSong = async (s: SongType) => {
    const result = await axios.post(songEndpoints.songs, s);
    console.log(result);
  };

  const putSong = async (s: SongType) => {
    const result = await axios.put(songEndpoints.songs, s);
    return result.data;
  };

  const deleteSong = async (id: number) => {
    const result = await axios.delete(`${songEndpoints.songs}/${id}`);
    return result;
  };

  return {
    getAllSongs,
    getSongById,
    postSong,
    putSong,
    deleteSong,
  };
})();

export default SongService;
