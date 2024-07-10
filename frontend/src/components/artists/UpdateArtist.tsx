import { useState, useEffect, ChangeEvent, FC } from "react";
import { ArtistType } from "../../types/Artist";
import { AlbumType } from "../../types/Album";
import ImageUploadService from "../../services/UploadImageService";

interface UpdateArtistProps {
  selectedArtist: ArtistType | null;
  clearSelectedArtist: () => void;
  onSave: (artist: ArtistType) => void;
}

const UpdateArtist: FC<UpdateArtistProps> = ({
  selectedArtist,
  clearSelectedArtist,
  onSave,
}) => {
  const [id, setId] = useState<string>(selectedArtist?.id?.toString() || "");
  const [name, setName] = useState<string>(selectedArtist?.artistName || "");
  const [genre, setGenre] = useState<string>(selectedArtist?.genre || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageFileName, setFileName] = useState<string>(
    selectedArtist?.image || ""
  );
  const [description, setDescription] = useState<string>(
    selectedArtist?.description || ""
  );
  const [albums, setAlbums] = useState<AlbumType[]>(
    selectedArtist?.albums || []
  );

  useEffect(() => {
    if (selectedArtist && selectedArtist.id !== undefined) {
      setId(selectedArtist.id.toString());
      setName(selectedArtist.artistName || "");
      setGenre(selectedArtist.genre || "");
      setFileName(selectedArtist.image || "");
      setDescription(selectedArtist.description || "");
      setAlbums(selectedArtist.albums || []);
    }
  }, [selectedArtist]);

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files != null) {
      const file = files[0];
      setImage(file);
      setFileName(file.name);
    }
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const alterArtist = async () => {
    const updatedArtist: ArtistType = {
      id: parseInt(id),
      artistName: name,
      genre: genre,
      image: imageFileName,
      description: description,
      albums: albums,
    };
    if (image != null) {
      await ImageUploadService.uploadImage(image);
    }
    onSave(updatedArtist);
  };

  return (
    <section className="margin">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12 mb-3">
          <div className="form-group">
            <label htmlFor="id" className="form-label">
              Id
            </label>
            <div className="input-group">
              <input className="form-control" name="id" value={id} readOnly />
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
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={changeHandler}
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
          <button
            className="btn btn-secondary col-lg-2 col-md-3 col-sm-4 col-6 mt-3 ms-2"
            onClick={clearSelectedArtist}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpdateArtist;
