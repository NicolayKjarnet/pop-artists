// import { FC } from "react";
// import { ArtistType } from "../../types/Artist";
// import ArtistImage from "../helpers/ArtistImage";
// import CRUDButton from "../helpers/CRUDButton";

// interface ArtistItemProps extends ArtistType {
//   buttonType: "seeMore" | "delete" | "update" | "none";
//   onClick?: (id: number, artistName: string) => void;
//   isDetailPage?: boolean;
//   isUpdatePage?: boolean;
//   isSelected?: boolean;
// }

// const ArtistItem: FC<ArtistItemProps> = ({
//   id,
//   artistName,
//   description,
//   genre,
//   image,
//   buttonType,
//   onClick,
//   isDetailPage = false,
//   isUpdatePage = false,
//   isSelected = false,
// }) => {
//   const getShortDescription = (text: string) => {
//     const sentences = text.split(". ");
//     return sentences.length > 2 ? sentences.slice(0, 2).join(". ") + "." : text;
//   };

//   const handleClick = () => {
//     if (onClick) onClick(id as number, artistName);
//   };

//   return (
//     <div
//       className={`col-12 col-sm-12 col-md-6 col-lg-4 mt-3 ${
//         isSelected ? "selected" : ""
//       }`}
//       onClick={isUpdatePage ? handleClick : undefined}
//     >
//       <article className="card bg-dark text-white artist-card">
//         <ArtistImage
//           imageType="artist"
//           className="card-img-top"
//           fileName={image}
//           altTxt={artistName}
//         />
//         <div className="card-body artist-info">
//           <h3 className="card-title">{artistName}</h3>
//           {isUpdatePage && <p className="card-text">ID: {id}</p>}
//           <p className="card-text">
//             {isDetailPage ? description : getShortDescription(description)}
//           </p>
//           {buttonType !== "none" && (
//             <div className="d-flex justify-content-between">
//               <CRUDButton
//                 id={id as number}
//                 buttonType={buttonType}
//                 onClick={handleClick}
//               />
//             </div>
//           )}
//         </div>
//       </article>
//     </div>
//   );
// };

// export default ArtistItem;

import React, { FC, forwardRef } from "react";
import { ArtistType } from "../../types/Artist";
import ArtistImage from "../helpers/ArtistImage";
import CRUDButton from "../helpers/CRUDButton";

interface ArtistItemProps extends ArtistType {
  buttonType: "seeMore" | "delete" | "update" | "none";
  onClick?: (id: number, artistName: string) => void;
  isDetailPage?: boolean;
  isUpdatePage?: boolean;
  isSelected?: boolean;
}

const ArtistItem: FC<ArtistItemProps & React.RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, ArtistItemProps>(
    (
      {
        id,
        artistName,
        description,
        genre,
        image,
        buttonType,
        onClick,
        isDetailPage = false,
        isUpdatePage = false,
        isSelected = false,
      },
      ref
    ) => {
      const getShortDescription = (text: string) => {
        const sentences = text.split(". ");
        return sentences.length > 2
          ? sentences.slice(0, 2).join(". ") + "."
          : text;
      };

      const handleClick = () => {
        if (onClick) onClick(id as number, artistName);
      };

      return (
        <div
          className={`col-12 col-sm-12 col-md-6 col-lg-4 mt-3 ${
            isSelected ? "selected" : ""
          }`}
          onClick={isUpdatePage ? handleClick : undefined}
          ref={ref}
        >
          <article className="card bg-dark text-white">
            <ArtistImage
              imageType="artist"
              className="card-img-top"
              fileName={image}
              altTxt={artistName}
            />
            <div className="card-body artist-info">
              <h3 className="card-title">{artistName}</h3>
              {isUpdatePage && <p className="card-text">ID: {id}</p>}
              <p className="card-text">
                {isDetailPage ? description : getShortDescription(description)}
              </p>
              {buttonType !== "none" && (
                <div className="d-flex justify-content-between">
                  <CRUDButton
                    id={id as number}
                    buttonType={buttonType}
                    onClick={handleClick}
                  />
                </div>
              )}
            </div>
          </article>
        </div>
      );
    }
  );

export default ArtistItem;
