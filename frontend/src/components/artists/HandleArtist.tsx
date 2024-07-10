import React, { useContext, useState } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import SearchForArtist from "./SearchForArtist";
import ArtistList from "./ArtistList";
import UpdateArtist from "./UpdateArtist";
import { ArtistType } from "../../types/Artist";
import ModalHandler from "../helpers/ModalHandler";

type HandleArtistProps = {
  actionType: "delete" | "update" | "add";
};

const HandleArtist: React.FC<HandleArtistProps> = ({ actionType }) => {
  const { deleteArtist, updateArtist, addArtist } = useContext(
    ArtistContext
  ) as ArtistContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<ArtistType | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const openModal = (artist: ArtistType | null) => {
    console.log(`Opening ${actionType} modal for artist:`, artist);
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log(`Closing ${actionType} modal`);
    setSelectedArtist(null);
    setIsModalOpen(false);
  };

  const handleAction = async (artist: ArtistType) => {
    let message = "";
    switch (actionType) {
      case "delete":
        if (await deleteArtist(artist.id as number)) {
          message = `${artist.artistName} has been successfully deleted.`;
        }
        break;
      case "update":
        await updateArtist(artist);
        message = `${artist.artistName} has been successfully updated.`;
        break;
      case "add":
        await addArtist(artist);
        message = `${artist.artistName} has been successfully added.`;
        break;
    }
    closeModal();
    setConfirmationMessage(message);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const renderModalContent = () => {
    switch (actionType) {
      case "delete":
        return (
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="close"
                onClick={closeModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {selectedArtist && (
                <p>
                  Are you sure you want to delete {selectedArtist.artistName}?
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleAction(selectedArtist!)}
              >
                Yes, Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      case "update":
      case "add":
        return (
          <UpdateArtist
            selectedArtist={selectedArtist}
            clearSelectedArtist={closeModal}
            onSave={(artist) => handleAction(artist)}
          />
        );
    }
  };

  return (
    <section className="margin">
      {actionType !== "add" && (
        <>
          <div className="align-items-end">
            <SearchForArtist updateContext={true} />
          </div>
          <ArtistList
            buttonType={
              actionType === "delete" || actionType === "update"
                ? "updateAndDelete"
                : actionType
            }
            onClick={(id, name, type) =>
              openModal({
                id,
                artistName: name,
                genre: "",
                description: "",
                albums: [],
                image: "",
              } as ArtistType)
            }
          />
        </>
      )}
      <ModalHandler
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={`Confirm ${
          actionType.charAt(0).toUpperCase() + actionType.slice(1)
        }`}
      >
        {renderModalContent()}
      </ModalHandler>
      {showConfirmation && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}
    </section>
  );
};

export default HandleArtist;
