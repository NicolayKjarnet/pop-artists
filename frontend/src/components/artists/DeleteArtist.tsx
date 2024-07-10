import React, { useContext, useState } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import SearchForArtist from "./SearchForArtist";
import ArtistList from "./ArtistList";
import Modal from "react-modal";

const DeleteArtist = () => {
  const { deleteArtist } = useContext(ArtistContext) as ArtistContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<{
    id: number;
    artistName: string;
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const openModal = (artist: { id: number; artistName: string }) => {
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArtist(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedArtist) {
      const artist = await deleteArtist(selectedArtist.id);
      closeModal();
      if (artist) {
        setConfirmationMessage(
          `${artist.artistName} has been successfully deleted.`
        );
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 3000);
      }
    }
  };

  return (
    <section className="margin">
      <div className="align-items-end">
        <SearchForArtist updateContext={true} />
      </div>
      <ArtistList
        buttonType="delete"
        onClick={(artistId: number, artistName: string) => {
          openModal({ id: artistId, artistName });
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Deletion"
        ariaHideApp={false}
        className="modal-dialog-centered"
      >
        <div className="modal-dialog bg-dark p-4" role="document">
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
                onClick={handleDelete}
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
        </div>
      </Modal>
      {showConfirmation && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}
    </section>
  );
};

export default DeleteArtist;
