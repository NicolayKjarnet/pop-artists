// import { useContext, FC } from "react";
// import { ArtistContext } from "../../contexts/ArtistContext";
// import { ArtistContextType } from "../../types/ArtistContext";
// import ArtistItem from "./ArtistItem";
// import { ArtistType } from "../../types/Artist";

// interface ArtistListProps {
//   buttonType: "seeMore" | "delete" | "update" | "none";
//   onClick?: (id: number, artistName: string) => void;
//   artists?: ArtistType[];
//   isUpdatePage?: boolean;
//   selectedArtistId?: number | null;
// }

// const ArtistList: FC<ArtistListProps> = ({
//   buttonType,
//   onClick,
//   artists,
//   isUpdatePage = false,
//   selectedArtistId,
// }) => {
//   const { artistArray } = useContext(ArtistContext) as ArtistContextType;

//   const getArtistList = () => {
//     const list = artists || artistArray;
//     if (list && list.length > 0) {
//       return list.map((artist, i) => (
//         <ArtistItem
//           key={`artist-${i}`}
//           id={artist.id}
//           artistName={artist.artistName}
//           genre={artist.genre}
//           image={artist.image}
//           description={artist.description}
//           albums={artist.albums}
//           buttonType={buttonType}
//           onClick={onClick}
//           isDetailPage={false}
//           isUpdatePage={isUpdatePage}
//           isSelected={artist.id === selectedArtistId}
//         />
//       ));
//     } else {
//       return <p>No artists found.</p>;
//     }
//   };

//   return (
//     <section>
//       <div className="artist-container row">{getArtistList()}</div>
//     </section>
//   );
// };

// export default ArtistList;

import React, { useContext, FC, useEffect, useRef } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import ArtistItem from "./ArtistItem";
import { ArtistType } from "../../types/Artist";

interface ArtistListProps {
  buttonType: "seeMore" | "delete" | "update" | "none";
  onClick?: (id: number, artistName: string) => void;
  artists?: ArtistType[];
  isUpdatePage?: boolean;
  selectedArtistId?: number | null;
}

const ArtistList: FC<ArtistListProps> = ({
  buttonType,
  onClick,
  artists,
  isUpdatePage = false,
  selectedArtistId,
}) => {
  const { artistArray } = useContext(ArtistContext) as ArtistContextType;
  const artistRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Scroll to the selected artist
  useEffect(() => {
    if (selectedArtistId && artistRefs.current.has(selectedArtistId)) {
      const element = artistRefs.current.get(selectedArtistId);
      const offset = -32; // Equals to 2rem to align with the fixed input form
      const elementPosition =
        element!.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [selectedArtistId]);

  const getArtistList = () => {
    const list = artists || artistArray;
    if (list && list.length > 0) {
      return list.map((artist, i) => (
        <ArtistItem
          key={`artist-${i}`}
          id={artist.id}
          artistName={artist.artistName}
          genre={artist.genre}
          image={artist.image}
          description={artist.description}
          albums={artist.albums}
          buttonType={buttonType}
          onClick={onClick}
          isDetailPage={false}
          isUpdatePage={isUpdatePage}
          isSelected={artist.id === selectedArtistId}
          ref={(el) => artistRefs.current.set(artist.id as number, el)}
        />
      ));
    } else {
      return <p>No artists found.</p>;
    }
  };

  return (
    <section>
      <div className="artist-container row">{getArtistList()}</div>
    </section>
  );
};

export default ArtistList;
