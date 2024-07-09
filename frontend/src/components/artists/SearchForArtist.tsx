import { useState, useRef, useEffect, useContext, FC } from "react";
import { ArtistType } from "../../types/Artist";
import ArtistService from "../../services/ArtistService";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import debounce from "lodash/debounce";
import ArtistList from "./ArtistList";

type SearchForArtistProps = {
  updateContext: boolean;
};

const SearchForArtist: FC<SearchForArtistProps> = ({ updateContext }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setArtistArray, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

  const debouncedSearch = useRef(
    debounce(async (search: string) => {
      if (search.trim() !== "") {
        const results: ArtistType[] = await ArtistService.getArtistByName(
          search
        );
        if (updateContext) {
          setArtistArray(results);
        }
      } else {
        const allArtists: ArtistType[] = await ArtistService.getAllArtists();
        if (updateContext) {
          setArtistArray(allArtists);
        }
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (updateContext) {
      debouncedSearch(searchValue);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch, updateContext]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = event.target.value;
    setSearchValue(searchName);
    if (!updateContext) {
      debouncedSearch(searchName);
    }
  };

  return (
    <section className="margin">
      <div className="form-group">
        <input
          className="form-control"
          value={searchValue}
          onChange={(e) => handleNameChange(e)}
          placeholder="Sarch for artist by name..."
        />
      </div>
      {!updateContext && (
        <ArtistList
          onClick={() => handleNameChange}
          buttonType="seeMore"
          artists={artistArray}
        />
      )}
    </section>
  );
};

export default SearchForArtist;
