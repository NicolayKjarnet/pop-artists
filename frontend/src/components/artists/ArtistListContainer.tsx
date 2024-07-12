import React from "react";
import ArtistList from "./ArtistList";

type ArtistListContainerProps = {
  onArtistClick: (id: number) => void;
  selectedArtistId: number | null;
};

const ArtistListContainer: React.FC<ArtistListContainerProps> = ({
  onArtistClick,
  selectedArtistId,
}) => {
  return (
    <div className="artist-list-wrapper">
      <div className="artist-list-container">
        <ArtistList
          buttonType="none"
          onClick={(id: number) => onArtistClick(id)}
          isUpdatePage={true}
          selectedArtistId={selectedArtistId}
        />
      </div>
    </div>
  );
};

export default ArtistListContainer;
