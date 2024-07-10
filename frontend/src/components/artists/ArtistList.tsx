import { useContext, FC } from "react";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import ArtistItem from "./ArtistItem";
import { ArtistType } from "../../types/Artist";

interface ArtistListProps {
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
    type: "seeMore" | "delete" | "update"
  ) => void;
  artists?: ArtistType[];
}

const ArtistList: FC<ArtistListProps> = ({ buttonType, onClick, artists }) => {
  const { artistArray } = useContext(ArtistContext) as ArtistContextType;

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
