import React from "react";
import type { UploadProps } from "../../interfaces";



export const UploadFile: React.FC<UploadProps> = ({
  setSelectedFile,
  closeModal,
  handleFileUpload,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Upload de Fichas</h2>
        <input
          type="file"
          className="mb-4"
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleFileUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Upload
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
