import AddNewArtist from "../../components/artists/AddNewArtist";
import ArtistList from "../../components/artists/ArtistList";

const AddNewArtistPage = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          <AddNewArtist />
        </div>
        <div className="col-md-7">
          <ArtistList
            buttonType="none"
            onClick={() => console.log("No button clicked")}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewArtistPage;
