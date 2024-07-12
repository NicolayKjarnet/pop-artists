import React, { useState, useEffect, ChangeEvent } from "react";
import { ArtistType } from "../../types/Artist";
import TextInput from "../helpers/inputs/TextInput";
import TextArea from "../helpers/inputs/TextArea";
import FileInput from "../helpers/inputs/FileInput";
import ImageUploadService from "../../services/UploadImageService";

type ArtistFormProps = {
  artist?: ArtistType;
  onSave: (artist: ArtistType) => Promise<void>;
  onChange: (artist: ArtistType) => void;
  showIdField?: boolean;
  className?: string;
};

const ArtistForm: React.FC<ArtistFormProps> = ({
  artist,
  onSave,
  onChange,
  showIdField = false,
  className = "",
}) => {
  const [formData, setFormData] = useState<ArtistType>(
    artist || {
      id: 0,
      artistName: "",
      genre: "",
      image: "placeholder.jpg",
      description: "",
      albums: [],
    }
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    artist?.image || "placeholder.jpg"
  );

  useEffect(() => {
    if (artist) {
      setFormData(artist);
      setImagePreviewUrl(artist.image || "placeholder.jpg");
    }
  }, [artist, imagePreviewUrl]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedArtist = { ...formData, [name]: value };
    setFormData(updatedArtist);
    onChange(updatedArtist);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size < 2_000_000) {
        setImage(file);
        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);
        const updatedArtist = { ...formData, image: imageUrl };
        setFormData(updatedArtist);
        onChange(updatedArtist);
      } else {
        alert("File size too big, cannot exceed 2MB.");
      }
    }
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleSubmit = async () => {
    if (image) {
      await ImageUploadService.uploadImage(image);
    }
    await onSave(formData);
  };

  return (
    <div className={`card bg-dark text-white ${className}`}>
      {showIdField && (
        <TextInput
          label="Artist ID"
          name="id"
          value={formData.id?.toString()}
          onChange={handleInputChange}
        />
      )}
      <TextInput
        label="Artist Name"
        name="artistName"
        value={formData.artistName}
        onChange={handleInputChange}
      />
      <TextInput
        label="Genre"
        name="genre"
        value={formData.genre}
        onChange={handleInputChange}
      />
      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <FileInput label="Image" name="image" onChange={handleFileChange} />
      <div className="text-center">
        <button className="btn btn-primary mt-3 px-5" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ArtistForm;
