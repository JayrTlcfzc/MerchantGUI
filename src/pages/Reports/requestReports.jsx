import React, { useState } from "react";
import { ClipboardPlus, Search, ArrowDownUp, X} from "lucide-react";
import RequestReportModal from "../../components/requestReportModal";

const RequestReports = () => {
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "reportname", direction: "ascending" });
    const [openModal, setOpenModal] = useState('');
    const [isViewModalOpen, setViewModalOpen] = useState(false);

    const data = [
        { daterequested: "2023-11-29", reportname: "TRANSACTION SUMMARY", reporttype: "BYACCOUNT ALLMSISDN BYTYPE", datefrom: "2023-11-01", dateto: "2023-11-29", transactiontype: "---" },
    ];

    const handleViewModal = () => setViewModalOpen(true);

    const handleProceedStatus = () => {
        setViewModalOpen(false)
        setModalState({ isOpen: true, status: 'success', message: 'Action Successful!' });
    }

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
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center mb-10">
                <ClipboardPlus color="#D95F08" className="mr-2" /> Request Reports
                </h2>

                {/* Request Button */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className='flex gap-4 items-end mb-4'>
                        <button className="w-1/6 px-2 py-2 bg-[#23587C] text-sm text-white rounded-md shadow-lg hover:bg-[#2C75A6]" onClick={handleViewModal}>
                            Request
                        </button>
                    </div>
                </div>

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
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("daterequested")}>
                        <span className="flex items-center justify-between">
                        DATE REQUESTED
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("reportname")}>
                        <span className="flex items-center justify-between">
                        REPORT NAME
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("reporttype")}>
                        <span className="flex items-center justify-between">
                        REPORT TYPE
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("datefrom")}>
                        <span className="flex items-center justify-between">
                        DATE FROM
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateto")}>
                        <span className="flex items-center justify-between">
                        DATE TO
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("transactiontype")}>
                        <span className="flex items-center justify-between">
                        TRANSACTION TYPE
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]">
                        <span className="flex items-center justify-between">
                        REPORT STATUS
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]">
                        <span className="flex items-center justify-between">
                        ACTION
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                        </span>
                    </th>
                    </tr>
                </thead>
                <tbody className="text-center divide-y divide-gray-200">
                    {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        <tr key={index} className="cursor-pointer">
                            <td className="px-4 py-2 whitespace-nowrap">{item.daterequested}</td>
                            <td className="px-4 py-2">{item.reportname}</td>
                            <td className="px-4 py-2">{item.reporttype}</td>
                            <td className="px-4 py-2">{item.datefrom}</td>
                            <td className="px-4 py-2">{item.dateto}</td>
                            <td className="px-4 py-2">{item.transactiontype}</td>
                            <td className="px-4 py-2">
                                <div className="py-1 bg-[#0FBA00] text-sm text-white rounded-lg">
                                Request has been generated
                                </div>
                            </td>
                            <td className="px-4 py-2">
                                <button className="px-4 py-2 bg-[#23587C] text-sm text-white rounded-md shadow-lg hover:bg-[#2C75A6]">
                                    DOWNLOAD
                                </button>
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
            {isViewModalOpen && (
                <RequestReportModal
                    isOpen={isViewModalOpen}
                    handleClose={() => setViewModalOpen(false)}
                    onProceed={handleProceedStatus}
                />
            )}
        </div>
    );
};

export default RequestReports;