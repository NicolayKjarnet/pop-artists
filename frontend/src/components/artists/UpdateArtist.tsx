import { useState, useContext, ChangeEvent } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ImageUploadService from "../../services/UploadImageService";
import ArtistService from "../../services/ArtistService";
import { AlbumType } from "../../types/Album";

const UpdateArtist = () => {
  const { updateArtist } = useContext(ArtistContext) as ArtistContextType;

  const [id, setId] = useState<string>("Id not set");
  const [name, setName] = useState<string>("Name not set");
  const [genre, setGenre] = useState<string>("Genre not set");
  const [image, setImage] = useState<any>();
  const [imageFileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("Description not set");
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  const updateArtistFields = async () => {
    const artist = await ArtistService.getArtistById(parseInt(id));
    setName(artist.artistName);
    setGenre(artist.genre);
    setFileName(artist.image);
    setDescription(artist.description);
    setAlbums(artist.albums);
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files != null) {
      const file = files[0];
      setImage(file);
      setFileName(file.name);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "id":
        setId(value);
        break;
      case "name":
        setName(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "image":
        setImage(value);
        break;
      case "description":
        break;
      case "albums":
        break;

      default:
        break;
    }
  };

  const alterArtist = () => {
    const Artist: ArtistType = {
      id: parseInt(id),
      artistName: name,
      genre: genre,
      image: imageFileName,
      description: description,
      albums: albums,
    };
    if (image != null) {
      ImageUploadService.uploadImage(image);
      updateArtist(Artist);
      alert("Edited Artist successfully with image.");
      window.location.reload();
    } else {
      updateArtist(Artist);
      alert("Edited Artist successfully without image.");
      window.location.reload();
    }
  };

  return (
    <section className="margin">
      <h2>Update Artist</h2>
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 mb-3">
          <div className="form-group">
            <label htmlFor="id" className="form-label">
              Id
            </label>
            <div className="input-group">
              <input
                className="form-control"
                name="id"
                onChange={changeHandler}
                type="number"
                value={id}
              />
              <button
                className="btn btn-primary ms-2"
                onClick={updateArtistFields}
              >
                Get Artist
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Artist Name
            </label>
            <input
              className="form-control"
              name="name"
              value={name}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <input
              className="form-control"
              name="genre"
              value={genre}
              onChange={changeHandler}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              name="image"
              onChange={imageHandler}
              type="file"
            />
          </div>
          <button
            className="btn btn-primary col-lg-2 col-md-3 col-sm-4 col-6 mt-3"
            onClick={alterArtist}
          >
            Update
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpdateArtist;
