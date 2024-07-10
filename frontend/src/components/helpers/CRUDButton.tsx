import { FC } from "react";
import { Link } from "react-router-dom";

type ButtonType = "seeMore" | "delete" | "update" | "add" | "none";

type CRUDButtonProps = {
  id: number;
  buttonType: ButtonType;
  onClick: (id: number) => void;
  className?: string;
};

const CRUDButton: FC<CRUDButtonProps> = ({
  id,
  buttonType,
  onClick,
  className,
}) => {
  if (buttonType === "none") {
    return null;
  }

  const getButtonLabel = () => {
    switch (buttonType) {
      case "seeMore":
        return "See more";
      case "delete":
        return "Delete";
      case "update":
        return "Update";
      default:
        return "Button";
    }
  };

  const getButtonClass = () => {
    switch (buttonType) {
      case "seeMore":
        return "btn-main";
      case "delete":
        return "btn btn-danger";
      case "update":
        return "btn btn-warning";
      default:
        return "btn";
    }
  };

  return (
    <>
      {buttonType === "seeMore" ? (
        <Link
          to={`/artists/${id}`}
          className={`${className} ${getButtonClass()}`}
        >
          {getButtonLabel()}
        </Link>
      ) : (
        <button
          className={`${className} ${getButtonClass()}`}
          onClick={() => onClick(id)}
        >
          {getButtonLabel()}
        </button>
      )}
    </>
  );
};

export default CRUDButton;
