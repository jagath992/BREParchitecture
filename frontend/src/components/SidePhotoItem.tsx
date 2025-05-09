import React from "react";
import { X } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

interface SidePhoto {
  id: string;
  url: string;
  caption: string;
}

interface SidePhotoItemProps {
  photo: SidePhoto;
  index: number;
  onChange: (index: number, photo: SidePhoto) => void;
  onRemove: (index: number) => void;
}

const SidePhotoItem: React.FC<SidePhotoItemProps> = ({
  photo,
  index,
  onChange,
  onRemove,
}) => {
  const handlePhotoChange = (url: string) => {
    onChange(index, { ...photo, url });
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, { ...photo, caption: e.target.value });
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Photo {index + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <PhotoUpload
        label="Photo"
        onChange={handlePhotoChange}
        initialValue={photo.url}
      />

      <div className="mt-2">
        <label
          htmlFor={`caption-${index}`}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Caption
        </label>
        <input
          id={`caption-${index}`}
          type="text"
          value={photo.caption}
          onChange={handleCaptionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Add a caption for this photo"
        />
      </div>
    </div>
  );
};

export default SidePhotoItem;
