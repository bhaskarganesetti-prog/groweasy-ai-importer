"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({
  onFileSelect,
}: UploadBoxProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "text/csv": [".csv"],
      },
      multiple: false,
      onDrop,
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
      ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />

      <p className="text-lg font-semibold">
        {isDragActive
          ? "Drop the CSV file here..."
          : "Drag & Drop your CSV file here"}
      </p>

      <p className="text-gray-500 mt-2">
        or click to select a CSV file
      </p>
    </div>
  );
}