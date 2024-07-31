import React from "react";
import CameraIcon from "../icons/CameraIcon";
import Loading from "./Loading";
import { IKUpload } from "imagekitio-react";

function UploadImage({
  imageUrlResponse,
  className = "input-img",
  loadingImage = false,
  setLoadingImage = null,
  classNameImage = "",
  onSuccess,
  onError,
}) {
  return (
    <label
      // htmlFor="input-file"
      className={`cursor-pointer ${className}`}
    >
      {/* <input onChange={onChange} type="file" accept="image/*" /> */}
      <IKUpload
        onChange={() => [setLoadingImage(true)]}
        onError={onError}
        onSuccess={onSuccess}
      />
      {loadingImage ? (
        <div className="w-full min-h-[176px] flex items-center justify-center">
          <Loading />
        </div>
      ) : imageUrlResponse ? (
        <div className="flex flex-col items-center justify-center w-max">
          <img
            src={imageUrlResponse}
            alt={"avatar"}
            className={`rounded w-full h-full object-cover ${classNameImage}`}
          />
        </div>
      ) : (
        <AddImageBtn />
      )}
    </label>
  );
}

export default UploadImage;

function AddImageBtn() {
  return (
    <div className="w-[200px] h-[200px] border border-dashed border-primary rounded flex flex-col items-center justify-center">
      <CameraIcon />
      <div className="px-4 py-3 font-medium border rounded text-primary border-primary">
        Đăng ảnh
      </div>
    </div>
  );
}
