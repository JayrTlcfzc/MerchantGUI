import React, { useState } from "react";
import { Folders, Search, ArrowDownUp, X, EllipsisVertical } from "lucide-react";
import { FaFolder } from "react-icons/fa6";

const BatchUploadedFiles = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "fileid", direction: "ascending" });

  const data = [
    { fileid: 1040, datecreated: "2024-05-17 11:01:12", dateuploaded: "2019-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "ABDUL", dateconfirmed: "2024-05-07 01:10:54", approvedby: "ABDUL", dateapproved: "2024-05-17 11:01:12", uploadedby: "ABDUL" },
    { fileid: 2103, datecreated: "2019-11-23 11:01:12", dateuploaded: "2022-12-29 08:24:15", filename: "BATCH-PAYMENT.xlsx", status: "FAILED", confirmedby: "JUAN", dateconfirmed: "2022-12-30 01:10:54", approvedby: "JUAN", dateapproved: "2022-05-17 11:01:12", uploadedby: "JUAN" },
    { fileid: 3214, datecreated: "2024-05-17 11:01:12", dateuploaded: "2019-12-29 08:24:15", filename: "BATCH-REGISTER-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "ALI", dateconfirmed: "2024-05-07 01:10:54", approvedby: "ALI", dateapproved: "2024-05-17 11:01:12", uploadedby: "ALI" },
    { fileid: 5687, datecreated: "2023-05-17 11:01:12", dateuploaded: "2023-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "FAILED", confirmedby: "TESTER", dateconfirmed: "2023-05-07 01:10:54", approvedby: "TESTER", dateapproved: "2023-05-17 11:01:12", uploadedby: "TESTER" },
    { fileid: 9876, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "FAILED", confirmedby: "MIGUEL", dateconfirmed: "2016-05-07 01:10:54", approvedby: "MIGUEL", dateapproved: "2016-05-17 11:01:12", uploadedby: "MIGUEL" },
    { fileid: 7869, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "JAFAR", dateconfirmed: "2016-05-07 01:10:54", approvedby: "JAFAR", dateapproved: "2016-05-17 11:01:12", uploadedby: "JAFAR"},
    { fileid: 98765, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "MIGUEL", dateconfirmed: "2016-05-07 01:10:54", approvedby: "MIGUEL", dateapproved: "2016-05-17 11:01:12", uploadedby: "MIGUEL" },
  ];

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
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-8">
          <FaFolder className="text-[#D95F08] mr-2" />
          BATCH UPLOADED FILES
        </h2>

        {/* Search Area */}
        <div className="relative flex justify-end gap-4 mb-4">
          <input
            type='text'
            value={searchInput}
            onChange={handleSearch}
            placeholder='Search...'
            className='w-1/5 h-10 border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]' 
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

        {/* Table Content */}
        <table className="min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md text-xs">
          <thead className="rounded bg-[#D95F08] text-white">
            <tr className="divide-x divide-gray-200">
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("fileid")}>
                <span className="flex items-center justify-between">
                  FILE ID
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("datecreated")}>
                <span className="flex items-center justify-between">
                  DATE CREATED
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateuploaded")}>
                <span className="flex items-center justify-between">
                  DATE UPLOADED
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("filename")}>
                <span className="flex items-center justify-between">
                  FILE NAME
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("status")}>
                <span className="flex items-center justify-between">
                  STATUS
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("confirmedby")}>
                <span className="flex items-center justify-between">
                  CONFIRMED BY
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateconfirmed")}>
                <span className="flex items-center justify-between">
                  DATE CONFIRMED
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("approvedby")}>
                <span className="flex items-center justify-between">
                  APPROVED BY
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateapproved")}>
                <span className="flex items-center justify-between">
                  DATE APPROVED
                  <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                </span>
              </th>
              <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("uploadedby")}>
                <span className="flex items-center justify-between">
                  UPLOADED BY
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
                    <td className="px-4 py-2">{item.datecreated}</td>
                    <td className="px-4 py-2">{item.dateuploaded}</td>
                    <td className="px-4 py-2">{item.filename}</td>
                    <td className="px-4 py-2">{item.status}</td>
                    <td className="px-4 py-2">{item.confirmedby}</td>
                    <td className="px-4 py-2">{item.dateconfirmed}</td>
                    <td className="px-4 py-2">{item.approvedby}</td>
                    <td className="px-4 py-2">{item.dateapproved}</td>
                    <td className="px-4 py-2 flex justify-between items-center">
                        <div className="text-right w-full"> 
                            {item.uploadedby} 
                        </div> 
                        <EllipsisVertical className="ml-2" /> 
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center">
                  No results found
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
      </div>
    </div>
  );
};

export default BatchUploadedFiles;
