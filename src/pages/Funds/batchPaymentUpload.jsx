import React, { useState } from 'react';
import StatusModal from '../../components/statusModal';
import { FaUpload } from 'react-icons/fa6';

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
    <div className="flex flex-col items-center p-4">
      {/* Header */}
      <div className="flex flex-row text-center mb-6">
        
        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center text-center">
          <FaUpload className="text-[#D95F08] mr-2" />
          BATCH PAYMENT UPLOAD
        </h2>
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
          className="block w-1/6 bg-[#23587C] tracking-wide shadow-md font-bold text-white py-2 px-4 rounded mt-16 mb-8 text-center cursor-pointer mx-auto hover:bg-[#2C75A6]"
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
        className="bg-[#BFC3D2] tracking-wide shadow-md rounded font-bold text-gray-800 py-2 px-4 hover:bg-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2"
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
