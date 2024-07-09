import axios from "axios";

const ImageUploadService = (() => {
  const baseURL = process.env.REACT_APP_API_URL;

  const imageUploadEndpoint = `${baseURL}/UploadImage`;

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    await axios({
      url: imageUploadEndpoint,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Important to avoid overwriting image with multiple uploads
    formData.delete("file");
  };

  return {
    uploadImage,
  };
})();

export default ImageUploadService;
