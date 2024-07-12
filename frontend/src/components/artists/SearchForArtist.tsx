import React, { useState, useRef, useEffect, useContext, FC } from "react";
import { ArtistType } from "../../types/Artist";
import ArtistService from "../../services/ArtistService";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import debounce from "lodash/debounce";
import SearchInput from "../helpers/inputs/SearchInput";
import axios from "axios";

type SearchForArtistProps = {
  updateContext: boolean;
  onArtistSelect?: (artistId: number) => void;
};

const SearchForArtist: FC<SearchForArtistProps> = ({ updateContext }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setArtistArray, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

  const debouncedSearch = useRef(
    debounce(async (search: string) => {
      try {
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
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError(`No artists found.`);
          if (updateContext) {
            setArtistArray([]);
          }
        } else {
          setError("An error occurred while searching for artists.");
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
      <SearchInput
        value={searchValue}
        onChange={handleNameChange}
        placeholder="Search for artist by name..."
      />
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </section>
  );
};

export default SearchForArtist;
