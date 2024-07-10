// import { useState, useContext } from "react";
// import { ArtistContext } from "../../contexts/ArtistContext";
// import { ArtistContextType } from "../../types/ArtistContext";
// import SearchForArtist from "./SearchForArtist";
// import UpdateArtist from "./UpdateArtist";
// import AddNewArtist from "./AddNewArtist";
// import ArtistList from "./ArtistList";
// import { ArtistType } from "../../types/Artist";
// import Modal from "react-modal";

// const ArtistManagement = () => {
//   const { deleteArtist, updateArtist, addArtist } = useContext(
//     ArtistContext
//   ) as ArtistContextType;
//   const [selectedArtist, setSelectedArtist] = useState<ArtistType | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmationMessage, setConfirmationMessage] = useState("");
//   const [actionType, setActionType] = useState<"add" | "update" | "delete">(
//     "update"
//   );

//   const openModal = (
//     artist: ArtistType | null,
//     type: "add" | "update" | "delete"
//   ) => {
//     setSelectedArtist(artist);
//     setActionType(type);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedArtist(null);
//     setIsModalOpen(false);
//   };

//   const handleAction = async (artist: ArtistType) => {
//     let message = "";
//     switch (actionType) {
//       case "delete":
//         if (await deleteArtist(artist.id as number)) {
//           message = `${artist.artistName} has been successfully deleted.`;
//         }
//         break;
//       case "update":
//         await updateArtist(artist);
//         message = `${artist.artistName} has been successfully updated.`;
//         break;
//       case "add":
//         await addArtist(artist);
//         message = `${artist.artistName} has been successfully added.`;
//         break;
//     }
//     closeModal();
//     setConfirmationMessage(message);
//     setShowConfirmation(true);
//     setTimeout(() => {
//       setShowConfirmation(false);
//     }, 3000);
//   };

//   const renderModalContent = () => {
//     switch (actionType) {
//       case "delete":
//         return (
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Confirm Deletion</h5>
//               <button
//                 type="button"
//                 className="close"
//                 onClick={closeModal}
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               {selectedArtist && (
//                 <p>
//                   Are you sure you want to delete {selectedArtist.artistName}?
//                 </p>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => handleAction(selectedArtist!)}
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         );
//       case "update":
//         return (
//           <UpdateArtist
//             selectedArtist={selectedArtist}
//             clearSelectedArtist={closeModal}
//             onSave={(artist) => handleAction(artist)}
//           />
//         );
//       case "add":
//         return (
//           <AddNewArtist
//             onSave={(artist) => handleAction(artist)}
//             clearSelectedArtist={closeModal}
//           />
//         );
//     }
//   };

//   return (
//     <div>
//       <button
//         onClick={() => openModal(null, "add")}
//         className="btn btn-primary"
//       >
//         Add New Artist
//       </button>
//       <SearchForArtist updateContext={true} />
//       <div className="artist-list">
//         <ArtistList
//           buttonType="updateAndDelete"
//           onClick={(id, name, type) =>
//             openModal(
//               { id, artistName: name } as ArtistType,
//               type as "update" | "delete"
//             )
//           }
//         />
//       </div>
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel={`Confirm ${
//           actionType.charAt(0).toUpperCase() + actionType.slice(1)
//         }`}
//         ariaHideApp={false}
//         className="modal-dialog-centered"
//       >
//         <div className="modal-dialog bg-dark p-4" role="document">
//           {renderModalContent()}
//         </div>
//       </Modal>
//       {showConfirmation && (
//         <div className="confirmation-message">{confirmationMessage}</div>
//       )}
//     </div>
//   );
// };

// export default ArtistManagement;
import React, { useState } from "react";
import HandleArtist from "./HandleArtist";
import ModalHandler from "../helpers/ModalHandler";
import UpdateArtist from "./UpdateArtist";
import { ArtistType } from "../../types/Artist";

const ArtistManagement = () => {
  const [actionType, setActionType] = useState<"add" | "update" | "delete">(
    "update"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    console.log("Opening add modal");
    setActionType("add");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  const handleAdd = (artist: ArtistType) => {
    console.log("Handling add action for artist:", artist);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openAddModal} className="btn btn-primary">
        Add New Artist
      </button>
      <HandleArtist actionType={actionType} />
      <ModalHandler
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Artist"
      >
        <UpdateArtist
          selectedArtist={null}
          clearSelectedArtist={closeModal}
          onSave={handleAdd}
        />
      </ModalHandler>
    </div>
  );
};

export default ArtistManagement;
