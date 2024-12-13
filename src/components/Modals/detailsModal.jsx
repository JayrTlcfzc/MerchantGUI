import React, { useState, useEffect, useRef } from "react";
import { X, Search, ChevronDown, ArrowDownUp } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from "react-toastify";

const detailsModal = ({handleClose = () => {} }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "fileid", direction: "ascending" });
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const data = [
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
    { fileid: 1040, referenceid: "", timestamp: "2024-05-17 11:01:12", frommsisdn: "22504930432", tomsisdn: "2503937282", amount: "2 000", reference1: "ABDUL", reference2: "SALARY", walletid: "0", remarks: "FOR PROCESSING" },
];

  const fileExtensions = ["CSV", "XLSX", "PDF"];

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDownload = (extension) => {
    // Handle the logic for the selected file extension
    toast.success(`${extension} is being downloaded`)
    setIsDropdownOpen(false);
  };

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
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
  ));

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

    // Pagination Number Rendering Function
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

  return (
    <div className="fixed -inset-2 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-7xl w-full pb-6 border-2 border-[#D95F08]">
              
                <div className='flex justify-between flex-row items-center bg-[#D95F08] rounded-t-sx p-2'>
                    <div className='flex flex-row'>
                        <h2 className="text-xl font-semibold text-white">
                        BATCH DETAILS
                        </h2>
                    </div>
                    <div>
                        <X className='cursor-pointer text-white' onClick={handleClose} />
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6 p-5">
                  <div>
                    <h3 className="text-sm">
                      Total Transactions:
                      <span className="font-bold">3</span>
                    </h3>
                    <h3 className="text-sm">
                      Total Amount: 
                      <span className="font-bold">13 000</span>
                    </h3>
                  </div>
                  <div>
                    <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex text-sm px-4 py-2 bg-[#23587C] text-white rounded hover:bg-[#2C75A6] items-center"
                    >
                      Download
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

                {/* Search Area */}
                <div className="relative flex justify-end gap-4 mb-4 mr-5">
                <input
                    type='text'
                    value={searchInput}
                    onChange={handleSearch}
                    placeholder={t('search')}
                    className='w-2/5 h-10 border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]' 
                />

                {!searchInput ? (
                    <Search 
                        color='#BFBFBF'
                        className='absolute right-2 top-1/2 -translate-y-1/2' 
                    />) 
                    : (
                    <X 
                        color='#BFBFBF'
                        onClick={() => setSearchInput('')}
                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer' 
                    />) 
                }
                </div>

                <table className="min-w-content divide-y table-auto border-collapse rounded-lg overflow-visible shadow-md text-xs mx-auto">
                  <thead className="rounded bg-[#D95F08] text-white">
                      <tr className="divide-x divide-gray-200">
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("fileid")}>
                          <span className="flex items-center justify-between">
                          FILE ID
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("referenceid")}>
                          <span className="flex items-center justify-between">
                          REFERENCE ID
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("timestamp")}>
                          <span className="flex items-center justify-between">
                          TIMESTAMP
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("frommsisdn")}>
                          <span className="flex items-center justify-between">
                          FROM MSISDN
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("tomsisdn")}>
                          <span className="flex items-center justify-between">
                          TO MSISDN
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("amount")}>
                          <span className="flex items-center justify-between">
                          AMOUNT
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("reference1")}>
                          <span className="flex items-center justify-between">
                          REFERENCE 1
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("reference2")}>
                          <span className="flex items-center justify-between">
                          REFERENCE 2
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("walletid")}>
                          <span className="flex items-center justify-between">
                          WALLET ID
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                          <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("remarks")}>
                          <span className="flex items-center justify-between">
                          REMARKS
                              <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                          </span>
                          </th>
                  </tr>
                  </thead>
                  <tbody className="text-center divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                      currentItems.map((item, index) => (
                      <tr key={index} className="cursor-pointer">
                          <td className="px-4 py-2 whitespace-nowrap">{item.fileid}</td>
                          <td className="px-4 py-2">{item.referenceid}</td>
                          <td className="px-4 py-2">{item.timestamp}</td>
                          <td className="px-4 py-2">{item.frommsisdn}</td>
                          <td className="px-4 py-2">{item.tomsisdn}</td>
                          <td className="px-4 py-2">{item.amount}</td>
                          <td className="px-4 py-2">{item.reference1}</td>
                          <td className="px-4 py-2">{item.reference2}</td>
                          <td className="px-4 py-2">{item.walletid}</td>
                          <td className="px-4 py-2">{item.remarks}</td>
                      </tr>
                      ))
                  ) : (
                      <tr>
                      <td colSpan="11" className="px-4 py-2 border text-center">
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
                    {renderPageNumbers()} {/* PAGE NUMBERS */}
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
                
              <div className='flex justify-center gap-2 mt-6'>
                  <button
                      type="submit"
                      onClick={handleClose}
                      className="px-4 py-2 text-white bg-[#23587C] rounded hover:bg-[#2C75A6] font-bold tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2"
                  >
                      OK
                  </button>
              </div>

            </div>

            <ToastContainer />

        </div>
  )
}

export default detailsModal