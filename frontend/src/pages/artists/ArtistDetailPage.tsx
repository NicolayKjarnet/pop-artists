import { FC, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import { AlbumType } from "../../types/Album";
import UniversalImage from "../../components/helpers/ArtistImage";

const ArtistDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArtistById, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getArtistById(parseInt(id)).then(() => setLoading(false));
    }
  }, [id, getArtistById]);

  if (!id || loading) {
    return <div className="loading">Loading...</div>;
  }

  const artist = artistArray.find((artist) => artist.id === parseInt(id));
  console.log(artist);

  if (!artist) {
    return <div className="not-found">Artist not found</div>;
  }

  return (
    <div className="container mt-5 artist-detail-container bg-dark text-white">
      <button className="btn-back mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="artist-detail-grid">
        <div className="artist-info">
          <UniversalImage
            imageType="artist"
            fileName={artist.image}
            altTxt={artist.artistName}
            className="img-fluid rounded artist-image"
          />
          <h2 className="artist-name">{artist.artistName}</h2>
          <p className="artist-description">{artist.description}</p>
        </div>
        <div className="artist-albums">
          <div className="row">
            {artist.albums.map((album: AlbumType) => (
              <div key={album.id} className="col-md-6 mb-4">
                <div
                  id="album-card"
                  className="card bg-dark text-light album-card"
                >
                  <UniversalImage
                    fileName={album.albumImage}
                    altTxt={album.albumName}
                    className="card-img-top album-image"
                    imageType="album"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{album.albumName}</h4>
                    <h5 className="songs-title">Songs</h5>
                    <ol className="list-group list-group-flush list-group-numbered">
                      {album.songs.map((song) => (
                        <li
                          key={song.id}
                          id="list-group-item"
                          className="list-group-item"
                        >
                          {song.songName}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
