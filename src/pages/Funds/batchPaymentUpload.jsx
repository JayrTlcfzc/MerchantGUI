import React, { useState } from 'react';
import StatusModal from '../../components/Modals/statusModal';
import { toast, ToastContainer } from 'react-toastify';
import { FaUpload } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { batchPaymentUpload, fileUpload } from '../../api/batch';
import axios from 'axios';
import LoadingModal from '../../components/Modals/loadingModal';

function BatchPaymentUpload() {
  const [filename, setFileName] = useState('No file chosen');
  const [filePath, setFilePath] = useState('');
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      setLoading(false);
      const newFileName = file.name;
      setFileName(newFileName);
      // setFilePath(`MerchantGUI/uploads/${newFileName}`);
      setFilePath(`/var/www/html/MerchantCDI/uploads/${newFileName}`);
      setFile(file);
    } else {
      setFileName('No file chosen');
      setFilePath('');
      setFile(null);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setLoading(true);
        const res = await batchPaymentUpload(filename, filePath);

        if (res.success) {
          setStatusMessage({ type: 'success', text: 'File uploaded successfully!' });
          const result = await fileUpload(formData);
          if (result.success) {
            toast.success("File uploaded successfully!");
          } else {
            toast.success("File uploaded unsuccessfully!");
          }

        } else {
          setStatusMessage({ type: 'error', text: 'Error in batch payment upload.' });
          toast.success("Error in batch payment upload!");
        }
      } catch (error) {
        setStatusMessage({ type: 'error', text: 'Error in batch payment upload.' });
      } finally {
        setLoading(false);
      }
    } else {
      setStatusMessage({ type: 'error', text: 'No file uploaded. Please upload a file.' });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {loading && (<LoadingModal />)}

      {/* Header */}
      <div className="flex flex-row text-center mb-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center text-center">
          <FaUpload className="text-[#D95F08] mr-2" />
          {t('batch_payment_upload')}
        </h2>
      </div>

      {/* File Upload Container */}
      <div className="relative w-full max-w-5xl h-80 border-dashed border-2 border-[#23587C] rounded-2xl p-8 mb-6 bg-[#FFFFFF]">
        {/* Download Link */}
        <a
          href="src/assets/Batch-Payment-Template.xlsx"
          download 
          className="absolute -top-8 right-0 text-blue-500 hover:underline"
        >
          Download Template File (.xlsx)
        </a>

        <label
          htmlFor="file-upload"
          className="block w-1/6 bg-[#23587C] tracking-wide shadow-md font-bold text-white py-2 px-4 rounded mt-16 mb-8 text-center cursor-pointer mx-auto hover:bg-[#2C75A6]"
        >
          {t('upload_file')}
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
        <p className="text-gray-600 text-center">Upload batch payment excel file (.xlsx, .xls)</p>
        <p className="text-gray-400 text-center">{filename}</p>
      </div>

      {/* Submit Button */}
      <button
        className="bg-[#BFC3D2] tracking-wide shadow-md rounded font-bold text-gray-800 py-2 px-4 hover:bg-[#9D9D9D] focus:outline-none focus:ring-2 focus:ring-[#9D9D9D]/50 focus:ring-offset-2"
        onClick={handleSubmit}
      >
        {t('submit')}
      </button>

      {/* Status Modal */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={statusMessage.type}
        message={statusMessage.text}
      />

      <ToastContainer />
    </div>
  );
}

export default BatchPaymentUpload;
