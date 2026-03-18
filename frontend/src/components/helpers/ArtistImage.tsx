import { FC } from "react";

const baseURL = process.env.REACT_APP_API_URL;

type ImageType = "artist" | "album";

type UniversalImageProps = {
  fileName: string;
  altTxt: string;
  className?: string;
  imageType: ImageType;
};

const UniversalImage: FC<UniversalImageProps> = ({
  fileName,
  altTxt,
  className = "card-img-top",
  imageType,
}) => {
  const imageUrl = fileName.startsWith("blob:")
    ? fileName
    : `${baseURL}/images/${imageType}s/${fileName}`;

  return <img className={className} src={imageUrl} alt={altTxt} />;
};

export default UniversalImage;
