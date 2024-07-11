import { useState, useContext, ChangeEvent } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ImageUploadService from "../../services/UploadImageService";
import CustomTooltip from "../helpers/CustomTooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ArtistItem from "./ArtistItem";

const AddNewArtist = () => {
  const { addArtist } = useContext(ArtistContext) as ArtistContextType;

  const [image, setImage] = useState<File | null>(null);
  const [imageFileName, setFileName] = useState<string>("placeholder.jpg");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const [newArtist, setNewArtist] = useState<ArtistType>({
    id: 0,
    artistName: "",
    genre: "",
    image: "placeholder.jpg",
    description: "",
    albums: [],
  });

  const artistObjectHandler = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewArtist({ ...newArtist, [name]: value });
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size < 2_000_000) {
        setImage(file);
        setFileName(file.name);
        setNewArtist({ ...newArtist, image: file.name });
      } else {
        alert("File size too big, cannot exceed 2MB.");
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
        setConfirmationMessage(
          `${newArtist.artistName} has been successfully added.`
        );
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
        setNewArtist({
          id: 0,
          artistName: "",
          genre: "",
          image: "placeholder.jpg",
          description: "",
          albums: [],
        });
        setImage(null);
        setFileName("placeholder.jpg");
      } catch {
        alert("Error adding artist.");
      }
    }
  };

  return (
    <section className="margin">
      <h2 className="d-flex align-items-center">
        Add New Artist
        <CustomTooltip
          id="add-tooltip"
          icon={faInfoCircle}
          tooltipContent="Fill in the details to add a new artist."
        />
      </h2>
      <div className="row">
        <div className="col-12"></div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3 fixed-form">
          <div className="card bg-dark text-white p-4 mt-3">
            <div className="form-group mb-3">
              <label htmlFor="artistName" className="form-label">
                Artist Name
              </label>
              <input
                className="form-control"
                name="artistName"
                onChange={artistObjectHandler}
                type="text"
                value={newArtist.artistName}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="genre" className="form-label">
                Genre
              </label>
              <input
                className="form-control"
                name="genre"
                onChange={artistObjectHandler}
                type="text"
                value={newArtist.genre}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                onChange={artistObjectHandler}
                rows={3}
                value={newArtist.description}
              />
            </div>
            <div className="form-group mb-3">
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
            <div className="text-center">
              <button
                className="btn btn-primary mt-3 px-5"
                onClick={addNewArtistHandler}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="artist-list-wrapper">
            <div className="artist-list-container">
              <ArtistItem
                key={`new-artist-preview`}
                id={newArtist.id}
                artistName={newArtist.artistName || "Artist Name"}
                genre={newArtist.genre || "Genre"}
                image={newArtist.image}
                description={newArtist.description || "Description"}
                albums={newArtist.albums}
                buttonType="none"
                onClick={() => {}}
                isDetailPage={false}
                isUpdatePage={false}
              />
            </div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}
    </section>
  );
};

export default AddNewArtist;
