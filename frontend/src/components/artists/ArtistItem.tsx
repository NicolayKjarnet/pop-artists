import { FC } from "react";
import { ArtistType } from "../../types/Artist";
import ArtistImage from "../helpers/ArtistImage";
import CRUDButton from "../helpers/CRUDButton";

interface ArtistItemProps extends ArtistType {
  buttonType:
    | "seeMore"
    | "delete"
    | "update"
    | "add"
    | "none"
    | "updateAndDelete";
  onClick?: (
    id: number,
    artistName: string,
    type: "update" | "delete" | "seeMore"
  ) => void;
  isDetailPage?: boolean;
}

const ArtistItem: FC<ArtistItemProps> = ({
  id,
  artistName,
  description,
  genre,
  image,
  buttonType,
  onClick,
  isDetailPage = false,
}) => {
  const getShortDescription = (text: string) => {
    const sentences = text.split(". ");
    return sentences.length > 2 ? sentences.slice(0, 2).join(". ") + "." : text;
  };

  const handleClick = (
    type: "update" | "delete" | "seeMore" | "add" | "none"
  ) => {
    if (onClick)
      onClick(
        id as number,
        artistName,
        type as "update" | "delete" | "seeMore"
      );
  };

  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-3">
      <article className="card bg-dark text-white">
        <ArtistImage
          imageType="artist"
          className="card-img-top"
          fileName={image}
          altTxt={artistName}
        />
        <div className="card-body artist-info">
          <h3 className="card-title">{artistName}</h3>
          <p className="card-text">
            {isDetailPage ? description : getShortDescription(description)}
          </p>
          <div className="d-flex justify-content-between">
            {buttonType === "updateAndDelete" && (
              <>
                <CRUDButton
                  id={id as number}
                  buttonType="update"
                  onClick={() => handleClick("update")}
                />
                <CRUDButton
                  id={id as number}
                  buttonType="delete"
                  onClick={() => handleClick("delete")}
                />
              </>
            )}
            {buttonType !== "updateAndDelete" && (
              <CRUDButton
                id={id as number}
                buttonType={buttonType}
                onClick={() => handleClick(buttonType)}
              />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArtistItem;
