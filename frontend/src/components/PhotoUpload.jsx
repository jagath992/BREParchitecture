import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

const PhotoUpload = ({ label, onChange, initialValue }) => {
  const [preview, setPreview] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    // If there's an initialValue (URL or File), set the preview
    if (initialValue) {
      if (typeof initialValue === "string") {
        // If it's a URL string
        setPreview(initialValue);
      } else if (initialValue instanceof File) {
        // If it's a File object
        const url = URL.createObjectURL(initialValue);
        setPreview(url);
        setFileName(initialValue.name);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [initialValue]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  const clearImage = () => {
    setPreview("");
    setFileName("");
    onChange(null);
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-32 w-auto object-cover rounded"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
              {fileName && (
                <p className="mt-2 text-sm text-gray-500">{fileName}</p>
              )}
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
