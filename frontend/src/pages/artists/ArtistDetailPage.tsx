import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistContext } from "../../contexts/ArtistContext";
import { ArtistContextType } from "../../types/ArtistContext";
import { AlbumType } from "../../types/Album";
import UniversalImage from "../../components/helpers/ArtistImage";

const ArtistDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getArtistById, artistArray } = useContext(
    ArtistContext
  ) as ArtistContextType;

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

  if (!artist) {
    return <div className="not-found">Artist not found</div>;
  }

  return (
    <div className="container mt-5 artist-detail-container bg-dark text-white p-4 rounded">
      <button className="btn-back" onClick={() => window.history.back()}>
        Back
      </button>
      {artist ? (
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h2 className="artist-name">{artist.artistName}</h2>
            <UniversalImage
              imageType="artist"
              fileName={artist.image}
              altTxt={artist.artistName}
              className="img-fluid rounded artist-image mb-3"
            />
            <p className="artist-description">{artist.description}</p>
          </div>
          <div className="col-lg-8 album-container">
            <h3 className="album-name">Albums</h3>
            <div className="row">
              {artist.albums.map((album: AlbumType) => (
                <div key={album.id} className="col-md-6 mb-4">
                  <div
                    id="album-card"
                    className="card bg-dark text-light album-card h-100"
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
                            className="list-group-item bg-dark text-light"
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
      ) : (
        <p>Artist not found</p>
      )}
    </div>
  );
};

export default ArtistDetailPage;
