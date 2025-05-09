import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../lib/utils";

interface PhotoUploadProps {
  onChange: (value: string) => void;
  label: string;
  initialValue?: string;
  multiple?: boolean;
  className?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onChange,
  label,
  initialValue = "",
  multiple = false,
  className,
}) => {
  const [preview, setPreview] = useState<string>(initialValue);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // In a real app, we would upload to a server. Here we're creating a blob URL
    // to simulate an uploaded image URL
    const url = URL.createObjectURL(file);
    setPreview(url);

    // Pass the "URL" to the parent component
    onChange(url);
  };

  const clearImage = () => {
    setPreview("");
    setFileName("");
    onChange("");
  };

  return (
    <div className={cn("mb-4", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors hover:border-indigo-400">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md"
            />

            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>

            <p className="mt-2 text-sm text-gray-500 truncate">
              {fileName || "Image uploaded"}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600 mt-2">
              <label
                htmlFor={`photo-upload-${label}`}
                className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={`photo-upload-${label}`}
                  name="file"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  multiple={multiple}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
