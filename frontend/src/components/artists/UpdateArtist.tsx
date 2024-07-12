import { useState, useContext } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ImageUploadService from "../../services/UploadImageService";
import ArtistService from "../../services/ArtistService";
import SearchForArtist from "./SearchForArtist";
import CustomTooltip from "../helpers/CustomTooltip";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ConfirmationMessage from "../helpers/ConfirmationMessage";
import ArtistForm from "../helpers/ArtistForm";
import ArtistListContainer from "./ArtistListContainer";

const UpdateArtist = () => {
  const { updateArtist, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

  const [artist, setArtist] = useState<ArtistType>({
    id: 0,
    artistName: "",
    genre: "",
    image: "placeholder.jpg",
    description: "",
    albums: [],
  });

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
      const fetchedArtist = await ArtistService.getArtistById(selectedId);
      if (!fetchedArtist) {
        setErrorMessage("Artist not found");
        return;
      }

      setArtist(fetchedArtist);
      setErrorMessage("");
      setSelectedArtistId(selectedId);
    } catch (error) {
      console.error("Error fetching artist: ", error);
      setErrorMessage("Failed to fetch artist");
    }
  };

  const isValidId = (id: number) => {
    return id > 0 && artistArray.some((artist) => artist.id === id);
  };

  const changeHandler = (updatedArtist: ArtistType) => {
    setArtist(updatedArtist);
  };

  const alterArtist = async (updatedArtist: ArtistType) => {
    try {
      if (typeof updatedArtist.image === "string") {
        await ImageUploadService.uploadImage(
          new File([updatedArtist.image], updatedArtist.image)
        );
      }
      await updateArtist(updatedArtist);
      setConfirmationMessage(
        `${updatedArtist.artistName} has been successfully updated.`
      );
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
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
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3 form-container">
          <div className="card bg-dark text-white p-4 mt-3">
            <div className="form-group mb-3">
              <label htmlFor="id" className="form-label">
                Artist ID
              </label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="id"
                  onChange={(e) =>
                    changeHandler({ ...artist, id: parseInt(e.target.value) })
                  }
                  type="number"
                  value={artist.id?.toString()}
                  min={0}
                />
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => handleArtistSelection(artist.id || 0)}
                >
                  Get Artist
                </button>
              </div>
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
            </div>
            <ArtistForm
              artist={artist}
              onSave={alterArtist}
              onChange={changeHandler}
              showIdField={false}
            />
          </div>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12">
          <ArtistListContainer
            onArtistClick={handleArtistSelection}
            selectedArtistId={selectedArtistId}
          />
        </div>
      </div>
      <ConfirmationMessage
        message={confirmationMessage}
        show={showConfirmation}
      />
    </section>
  );
};

export default UpdateArtist;
