import { useState, useContext, ChangeEvent } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ImageUploadService from "../../services/UploadImageService";
import ArtistService from "../../services/ArtistService";
import { AlbumType } from "../../types/Album";
import ArtistList from "./ArtistList";
import SearchForArtist from "./SearchForArtist";
import CustomTooltip from "../helpers/CustomTooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const UpdateArtist = () => {
  const { updateArtist, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [imageFileName, setFileName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  const handleArtistSelection = async (selectedId: number) => {
    if (!isValidId(selectedId)) {
      setErrorMessage("Invalid Artist ID");
      return;
    }

    try {
      const artist = await ArtistService.getArtistById(selectedId);
      if (!artist) {
        setErrorMessage("Artist not found");
        return;
      }

      setId(selectedId.toString());
      setName(artist.artistName);
      setGenre(artist.genre);
      setFileName(artist.image);
      setDescription(artist.description);
      setAlbums(artist.albums);
      setErrorMessage("");
      setSelectedArtistId(selectedId); // Set selected artist ID
    } catch (error) {
      console.error("Error fetching artist: ", error);
      setErrorMessage("Failed to fetch artist");
    }
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
      setFileName(file.name);
    } else {
      console.error("No files selected or files is undefined");
    }
  };

  const isValidId = (id: number) => {
    return id > 0 && artistArray.some((artist) => artist.id === id);
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const alterArtist = async () => {
    try {
      if (image) {
        await ImageUploadService.uploadImage(image);
      }
      const updatedArtist: ArtistType = {
        id: parseInt(id),
        artistName: name,
        genre: genre,
        image: imageFileName,
        description: description,
        albums: albums,
      };
      await updateArtist(updatedArtist);
      setConfirmationMessage(
        `${updatedArtist.artistName} has been successfully updated.`
      );
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
      setId("");
      setName("");
      setGenre("");
      setFileName("");
      setDescription("");
      setAlbums([]);
    } catch (error) {
      console.error("Error updating artist: ", error);
      alert("Failed to update artist");
    }
  };

  return (
    <section className="margin">
      <h2 className="d-flex align-items-center">
        Update Artist
        <CustomTooltip
          id="update-tooltip"
          icon={faInfoCircle}
          tooltipContent="Click on an artist to populate the input fields."
        />
      </h2>
      <div className="row">
        <div className="col-12">
          <SearchForArtist updateContext={true} />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3 fixed-form">
          <div className="card bg-dark text-white p-4 mt-3">
            <div className="form-group mb-3">
              <label htmlFor="id" className="form-label">
                Artist ID
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
                  onClick={() => handleArtistSelection(parseInt(id))}
                >
                  Get Artist
                </button>
              </div>
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
            </div>
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
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
            <div className="form-group mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                value={description}
                onChange={changeHandler}
                rows={3}
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
                onClick={alterArtist}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="artist-list-wrapper">
            <div className="artist-list-container">
              <ArtistList
                buttonType={"none"}
                onClick={(id: number, name: string) =>
                  handleArtistSelection(id)
                }
                isUpdatePage={true}
                selectedArtistId={selectedArtistId}
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

export default UpdateArtist;
