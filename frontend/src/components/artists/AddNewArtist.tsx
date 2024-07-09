import { useState, useContext, ChangeEvent } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ImageUploadService from "../../services/UploadImageService";

const AddNewArtist = () => {
  const { addArtist } = useContext(ArtistContext) as ArtistContextType;

  const [image, setImage] = useState<File | null>(null);

  const [newArtist, setNewArtist] = useState<ArtistType>({
    id: 0,
    artistName: "",
    genre: "",
    image: "",
    description: "",
    albums: [],
  });

  const artistObjecthandler = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewArtist({ ...newArtist, [name]: value });
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null && files.length > 0) {
      const file = files[0];

      if (file.size < 2_000_000) {
        setImage(file);
        setNewArtist({ ...newArtist, image: file.name });
      } else {
        alert("File size too big, cannot exceed 20MB.");
      }
    }
  };

  const addNewArtistHandler = async () => {
    if (newArtist != null && image != null) {
      try {
        await Promise.all([
          addArtist(newArtist),
          ImageUploadService.uploadImage(image),
        ]);
        alert("New artist was successfully added to the database.");
        window.location.reload();
      } catch {
        alert("Error adding artist.");
      }
    }
  };

  return (
    <section className="margin">
      <h2>Add New Artist</h2>

      <div className="form-group">
        <label className="form-label">Artist name</label>
        <input
          className="form-control"
          name="artistName"
          onChange={artistObjecthandler}
          type="text"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Genre</label>
        <input
          className="form-control"
          name="genre"
          onChange={artistObjecthandler}
          type="text"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          className="form-control"
          name="description"
          onChange={artistObjecthandler}
          type="text"
        />
      </div>

      <div className="form-group">
        <label htmlFor="artistImage" className="form-label mt-3">
          Choose an image:
        </label>
        <div className="custom-file">
          <input
            type="file"
            className="form-control-file"
            id="artistImage"
            onChange={imageHandler}
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={addNewArtistHandler}>
        Add
      </button>
    </section>
  );
};

export default AddNewArtist;
