import React from "react";
import { X } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

const SidePhotoItem = ({ photo, index, onChange, onRemove }) => {
  const handleCaptionChange = (e) => {
    const caption = e.target.value;
    onChange(index, { ...photo, caption: caption || "" });
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Photo {index + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <X size={20} />
        </button>
      </div>

      <PhotoUpload
        label="Upload Photo"
        onChange={(file) => onChange(index, { ...photo, photo: file })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Caption
        </label>
        <input
          type="text"
          value={photo.caption || ""}
          onChange={handleCaptionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter photo caption"
        />
      </div>
    </div>
  );
};

export default SidePhotoItem;
