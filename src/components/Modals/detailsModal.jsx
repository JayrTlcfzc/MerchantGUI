import React, { useState, useEffect } from "react";
import { X, Search, ChevronDown, ArrowDownUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from "react-toastify";
import { batchDetailsData } from "../../api/batch";

const DetailsModal = ({ batchDetails, fileId, handleClose = () => {} }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "fileId", direction: "ascending" });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  // console.log("FILEID: "+ fileId);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      setLoading(true);

      try {
        const { success, batchDataFile, message } = await batchDetailsData(fileId);

        console.log("batchDataFile: " + batchDataFile);

        if (success) {
          let parsedData;
          if (Array.isArray(batchDataFile)) {
            console.log("HERE AGAIN!!!!");
            parsedData = batchDataFile[0];
          } else {
            parsedData = batchDataFile; 
          }
          if (parsedData) {
            parsedData = Array.isArray(batchDataFile) ? batchDataFile : [batchDataFile];
            console.log("parsedData: ", parsedData);
            setFiles(
              parsedData.map((batchDataFile) => ({
                FILEID: batchDataFile.fileId || '',
                REFERENCEID: batchDataFile.referenceId || '',
                LOADEDTIMESTAMP: batchDataFile.loadedTimeStamp || '',
                FRMSISDN: batchDataFile.frMsisdn || '',
                TOMSISDN: batchDataFile.toMsisdn || '',
                AMOUNT: batchDataFile.amount || '',
                REFERENCE: batchDataFile.reference || '',
                REFERENCETO: batchDataFile.referenceTo || '',
                WALLETID: batchDataFile.walletId || '',
                REMARKS: batchDataFile.remarks || '',
              }))
            );
          } else {
            console.log("ERROR!!!");
          }
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBatchDetails();

  }, [fileId]);

  // Available File Extensions Selection
  const fileExtensions = ["CSV", "XLSX", "PDF"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  
  // Download Function
  const handleDownload = (extension) => {
    toast.success(`${extension} is being downloaded`);
    setIsDropdownOpen(false);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const sortedData = [...files].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mx-1 hover:bg-[#F3EEEB] rounded-full text-sm ${currentPage === i ? 'bg-[#F4E6DC] text-black' : 'bg-none text-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  // To Display Total Transactions
  const totalTransactions = filteredData.length; 

  // Computation to get the Total Amount
  const totalAmount = filteredData.reduce((sum, item) => {
    // Remove spaces and parse the amount as a number
    const amount = parseFloat(item.AMOUNT.replace(/\s+/g, ''));
    return sum + (isNaN(amount) ? 0 : amount); // If not a valid number, return 0
  }, 0);
  
  return (
    <div className="fixed -inset-2 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-max w-full pb-6 border-2 border-[#D95F08]">
        <div className="flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2">
          <div className="flex flex-row">
            <h2 className="text-xl font-semibold text-white">
              {t('modal_batch_details')}
            </h2>
          </div>
          <div>
            <X className="cursor-pointer text-white" onClick={handleClose} />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 p-5">
          <div>
            {/* {batchDetails == 'UploadedFiles' && (<div>HELLO</div>)} */}
            {/* {batchDetails == 'BatchFiles' && (<div>HELLO</div>)} */}
            <h3 className="text-sm">
              {t('modal_total_transactions')}
              <span className="font-bold">{totalTransactions}</span>
            </h3>
            <h3 className="text-sm">
              {t('modal_total_amount')}
              <span className="font-bold">{totalAmount.toLocaleString()}</span>
            </h3>
          </div>
          <div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex text-sm px-4 py-2 bg-[#23587C] text-white rounded hover:bg-[#2C75A6] items-center"
              >
                {t('modal_download_button')}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-md z-50">
                  {fileExtensions.map((ext) => (
                    <li
                      key={ext}
                      onClick={() => handleDownload(ext)}
                      className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200"
                    >
                      {ext}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex justify-end gap-4 mb-4 mr-5">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearch}
            placeholder={t('search')}
            className="w-2/5 h-10 border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]"
          />
          {!searchInput ? (
            <Search
              color="#BFBFBF"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          ) : (
            <X
              color="#BFBFBF"
              onClick={() => setSearchInput('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>

        <table className="min-w-content divide-y table-auto border-collapse rounded-lg overflow-visible shadow-md text-xs mx-4">
          <thead className="rounded bg-[#D95F08] text-white">
            <tr className="divide-x divide-gray-200">
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"               onClick={() => requestSort("FILEID")}>
                <span className="flex items-center justify-between">
                  {t('file_id')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("REFERENCEID")}>
                <span className="flex items-center justify-between">
                  {t('reference_id')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("LOADEDTIMESTAMP")}>
                <span className="flex items-center justify-between">
                  {t('timestamp')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("FRMSISDN")}>
                <span className="flex items-center justify-between">
                  {t('from_msisdn')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("TOMSISDN")}>
                <span className="flex items-center justify-between">
                  {t('to_msisdn')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("AMOUNT")}>
                <span className="flex items-center justify-between">
                  {t('amount')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("REFERENCE")}>
                <span className="flex items-center justify-between">
                  {t('reference_one')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("REFERENCETO")}>
                <span className="flex items-center justify-between">
                  {t('reference_two')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("WALLETID")}>
                <span className="flex items-center justify-between">
                  {t('wallet_id')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"
                  onClick={() => requestSort("REMARKS")}>
                <span className="flex items-center justify-between">
                  {t('remarks')}
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="cursor-pointer">
                  <td className="px-4 py-2 whitespace-nowrap">{item.FILEID}</td>
                  <td className="px-4 py-2">{item.REFERENCEID}</td>
                  <td className="px-4 py-2">{item.LOADEDTIMESTAMP}</td>
                  <td className="px-4 py-2">{item.FRMSISDN}</td>
                  <td className="px-4 py-2">{item.TOMSISDN}</td>
                  <td className="px-4 py-2">{item.AMOUNT}</td>
                  <td className="px-4 py-2">{item.REFERENCE}</td>
                  <td className="px-4 py-2">{item.REFERENCETO}</td>
                  <td className="px-4 py-2">{item.WALLETID}</td>
                  <td className="px-4 py-2">{item.REMARKS}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-2 border text-center">
                  {t('td_no_results_found')}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 space-x-1">
          <button
            onClick={() => paginate(1)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB]"
            disabled={currentPage === 1}
          >
            «
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB]"
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB]"
            disabled={currentPage === totalPages}
          >
            ›
          </button>
          <button
            onClick={() => paginate(totalPages)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold rounded-full hover:bg-[#F3EEEB]"
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          <button
            type="submit"
            onClick={handleClose}
            className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
          >
            {t('modal_ok')}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DetailsModal;
