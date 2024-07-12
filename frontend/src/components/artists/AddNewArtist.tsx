import React, { useState, useContext } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistType } from "../../types/Artist";
import { ArtistContextType } from "../../types/ArtistContext";
import ArtistForm from "../helpers/ArtistForm";
import ConfirmationMessage from "../helpers/ConfirmationMessage";
import ArtistItem from "./ArtistItem";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import CustomTooltip from "../helpers/CustomTooltip";

const AddNewArtist = () => {
  const { addArtist } = useContext(ArtistContext) as ArtistContextType;
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

  const handleAddArtist = async (artist: ArtistType) => {
    await addArtist(artist);
    setConfirmationMessage(`${artist.artistName} has been successfully added.`);
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
  };

  const handleFormDataChange = (updatedArtist: ArtistType) => {
    setNewArtist(updatedArtist);
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
          <ArtistForm
            artist={newArtist}
            onSave={handleAddArtist}
            onChange={handleFormDataChange}
            className="p-4 mt-3"
          />
        </div>
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="artist-list-wrapper">
            <div className="artist-list-container">
              <div className="row">
                <div className="col-12">
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
        </div>
      </div>
      <ConfirmationMessage
        message={confirmationMessage}
        show={showConfirmation}
      />
    </section>
  );
};

export default AddNewArtist;
