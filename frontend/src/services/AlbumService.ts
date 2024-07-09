import axios from "axios";
import { AlbumType } from "../types/Album";

const AlbumService = (() => {
  const baseURL = process.env.REACT_APP_API_URL;

  const albumEndpoints = {
    albums: `${baseURL}Album`,
  };

  const getAllAlbums = async () => {
    try {
      const result = await axios.get(albumEndpoints.albums);
      return result.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getAlbumById = async (id: number) => {
    const result = await axios.get(`${albumEndpoints.albums}/${id}`);
    return result.data;
  };

  const postAlbum = async (a: AlbumType) => {
    const result = await axios.post(albumEndpoints.albums, a);
    console.log(result);
  };

  const putAlbum = async (a: AlbumType) => {
    const result = await axios.put(albumEndpoints.albums, a);
    return result.data;
  };

  const deleteAlbum = async (id: number) => {
    const result = await axios.delete(`${albumEndpoints.albums}/${id}`);
    return result;
  };

  return {
    getAllAlbums,
    getAlbumById,
    postAlbum,
    putAlbum,
    deleteAlbum,
  };
})();

export default AlbumService;
