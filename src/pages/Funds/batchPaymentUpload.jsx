import React, { useState } from 'react';
import StatusModal from '../../components/statusModal';

function BatchPaymentUpload() {
  const [fileName, setFileName] = useState('No file chosen');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
  };

  const handleSubmit = () => {
    if (fileName !== 'No file chosen') {
      // Simulating successful file upload
      setStatusMessage({ type: 'success', text: 'File uploaded successfully!' });
    } else {
      // Handle case where no file is selected
      setStatusMessage({ type: 'error', text: 'No file uploaded. Please upload a file.' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center py-10">
      {/* Header */}
      <div className="flex flex-row text-center mb-16">
        <img 
          src="/path-to-logo" 
          alt="Logo" 
          className="mx-auto mb-4 w-12" 
        />
        <h1 className="text-2xl font-bold">BATCH PAYMENT UPLOAD</h1>
      </div>

      {/* File Upload Container */}
      <div className="relative w-full max-w-5xl h-80 border-dashed border-2 border-[#23587C] rounded-2xl p-8 mb-6">
        {/* Download Link */}
        <a 
          href="/path-to-template-file" 
          download 
          className="absolute -top-8 right-0 text-blue-500 hover:underline"
        >
          Download Template File (.xlsx)
        </a>

        <label
          htmlFor="file-upload"
          className="block w-1/6 bg-[#23587C] text-white py-2 px-4 rounded-md mt-16 mb-8 text-center cursor-pointer hover:bg-blue-800 mx-auto"
        >
          UPLOAD FILE
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <p className="text-gray-600 text-center">Upload batch payment excel file (.xlsx, .xls)</p>
        <p className="text-gray-400 text-center">{fileName}</p>
      </div>

      {/* Submit Button */}
      <button
        className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
        onClick={handleSubmit}
      >
        SUBMIT
      </button>

      {/* Status Modal */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={statusMessage.type}
        message={statusMessage.text}
      />
    </div>
  );
}

export default BatchPaymentUpload;
