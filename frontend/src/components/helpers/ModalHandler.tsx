import React from "react";
import Modal from "react-modal";

interface ModalHandlerProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const ModalHandler: React.FC<ModalHandlerProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
}) => {
  console.log(`Rendering modal: ${contentLabel}, isOpen: ${isOpen}`);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
      className="modal-dialog-centered"
    >
      <div className="modal-dialog bg-dark p-4" role="document">
        {children}
      </div>
    </Modal>
  );
};

export default ModalHandler;
