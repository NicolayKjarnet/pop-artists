import { useState, ChangeEvent, FC } from "react";
import { ArtistType } from "../../types/Artist";
import ImageUploadService from "../../services/UploadImageService";

interface AddNewArtistProps {
  onSave: (artist: ArtistType) => void;
  clearSelectedArtist: () => void;
}

const AddNewArtist: FC<AddNewArtistProps> = ({
  onSave,
  clearSelectedArtist,
}) => {
  const [newArtist, setNewArtist] = useState<ArtistType>({
    id: 0,
    artistName: "",
    genre: "",
    image: "",
    description: "",
    albums: [],
  });

  const [image, setImage] = useState<File | null>(null);

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
          ImageUploadService.uploadImage(image),
          onSave(newArtist),
        ]);
      } catch {
        alert("Error adding artist.");
      }
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Add New Artist</h5>
        <button
          type="button"
          className="close"
          onClick={clearSelectedArtist}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
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
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary mt-3" onClick={addNewArtistHandler}>
          Add
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={clearSelectedArtist}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddNewArtist;
