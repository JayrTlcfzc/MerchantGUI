import React, { useState, useEffect, useRef } from "react";
import { Folder, Search, ArrowDownUp, X, EllipsisVertical } from "lucide-react";
import { FaCircleInfo, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa6";
import StatusModal from '../../components/Modals/statusModal'
import PasswordModal from '../../components/Modals/PasswordModal'
import { useTranslation } from 'react-i18next';

const BatchFiles = () => {
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "fileid", direction: "ascending" });
    const [activeButton, setActiveButton] = useState('REQUESTS');
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRef = useRef(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: "",
        message: "",
    });

    const { t, i18n } = useTranslation();
    
    const data = [
        { fileid: 1040, datecreated: "2024-05-17 11:01:12", dateuploaded: "2019-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "ABDUL", dateconfirmed: "2024-05-07 01:10:54", approvedby: "ABDUL", dateapproved: "2024-05-17 11:01:12", uploadedby: "ABDUL" },
        { fileid: 2103, datecreated: "2019-11-23 11:01:12", dateuploaded: "2022-12-29 08:24:15", filename: "BATCH-PAYMENT.xlsx", status: "FAILED", confirmedby: "JUAN", dateconfirmed: "2022-12-30 01:10:54", approvedby: "JUAN", dateapproved: "2022-05-17 11:01:12", uploadedby: "JUAN" },
        { fileid: 3214, datecreated: "2024-05-17 11:01:12", dateuploaded: "2019-12-29 08:24:15", filename: "BATCH-REGISTER-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "ALI", dateconfirmed: "2024-05-07 01:10:54", approvedby: "ALI", dateapproved: "2024-05-17 11:01:12", uploadedby: "ALI" },
        { fileid: 5687, datecreated: "2023-05-17 11:01:12", dateuploaded: "2023-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "FAILED", confirmedby: "TESTER", dateconfirmed: "2023-05-07 01:10:54", approvedby: "TESTER", dateapproved: "2023-05-17 11:01:12", uploadedby: "TESTER" },
        { fileid: 9876, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "FAILED", confirmedby: "MIGUEL", dateconfirmed: "2016-05-07 01:10:54", approvedby: "MIGUEL", dateapproved: "2016-05-17 11:01:12", uploadedby: "MIGUEL" },
        { fileid: 7869, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "JAFAR", dateconfirmed: "2016-05-07 01:10:54", approvedby: "JAFAR", dateapproved: "2016-05-17 11:01:12", uploadedby: "JAFAR"},
        { fileid: 98765, datecreated: "2014-10-12 11:01:12", dateuploaded: "2016-12-29 08:24:15", filename: "BATCH-PAYMENT-TEMPLATE.xlsx", status: "PROCESSED", confirmedby: "MIGUEL", dateconfirmed: "2016-05-07 01:10:54", approvedby: "MIGUEL", dateapproved: "2016-05-17 11:01:12", uploadedby: "MIGUEL" },
    ];

    const handleAction = (modalMessage) => {
        setModalMessage(modalMessage);
        setPasswordModalOpen(true);
    }

    const handleOpenModal = () => {
        setModalState({
            isOpen: true,
              status: 'success',
              message: `The file has been successfully ${modalMessage}!`
          });
      };

    // For Ellipsis Dropdown
    const handleEllipsisClick = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index);
    };

    const handleButtonClick = (buttonName) => { 
        setActiveButton(buttonName);
        setDropdownVisible(null);
    };
    
    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(null);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => { 
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    {t('batch_files')}
                </h2>

                {/* Action Selection Button */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className='flex items-center justify-center'>
                        <button
                            className={`w-1/6 px-2 py-2 text-sm ${activeButton === 'REQUESTS' ? 'bg-[#D95F08] text-white' : 'bg-[#ededed] text-gray-700 hover:bg-[#FC8937] hover:text-white'}`}
                            onClick={() => handleButtonClick('REQUESTS')}
                        >
                            {t('request')}
                        </button>
                        <button
                            className={`w-1/6 px-2 py-2 tracking-wide  text-sm ${activeButton === 'TRACKING' ? 'bg-[#D95F08] text-white' : 'bg-[#ededed] text-gray-700 hover:bg-[#FC8937] hover:text-white'}`}
                            onClick={() => handleButtonClick('TRACKING')}
                        >
                            {t('tracking')}
                        </button>
                    </div>
                </div>

                {/* Search Area */}
                <div className="relative flex justify-end gap-4 mb-4">
                <input
                    type='text'
                    value={searchInput}
                    onChange={handleSearch}
                    placeholder={t('search')}
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
                {activeButton === 'REQUESTS' && (
                    <div className="overflow-visible">
                        <table className="min-w-full divide-y table-auto border-collapse rounded-lg overflow-visible shadow-md text-xs">
                            <thead className="rounded bg-[#D95F08] text-white">
                                <tr className="divide-x divide-gray-200">
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("fileid")}>
                                    <span className="flex items-center justify-between">
                                    {t('file_id')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("datecreated")}>
                                    <span className="flex items-center justify-between">
                                    {t('date_created')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateuploaded")}>
                                    <span className="flex items-center justify-between">
                                    {t('date_uploaded')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("filename")}>
                                    <span className="flex items-center justify-between">
                                    {t('file_name')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("status")}>
                                    <span className="flex items-center justify-between">
                                    {t('status')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("confirmedby")}>
                                    <span className="flex items-center justify-between">
                                    {t('confirmed_by')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateconfirmed")}>
                                    <span className="flex items-center justify-between">
                                    {t('date_confirmed')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("approvedby")}>
                                    <span className="flex items-center justify-between">
                                    {t('approved_by')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateapproved")}>
                                    <span className="flex items-center justify-between">
                                    {t('date_approved')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("uploadedby")}>
                                    <span className="flex items-center justify-between">
                                    {t('uploaded_by')}
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
                                        <div className="relative">
                                            <EllipsisVertical 
                                            className="ml-2 cursor-pointer hover:text-[#D95F08]" 
                                            onClick={() => handleEllipsisClick(index)}
                                            />
                                            {dropdownVisible === index && (
                                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-max bg-white border border-gray-200 rounded shadow-lg z-50 text-left">
                                                <ul className="flex flex-row gap-1">
                                                    <div>
                                                        <li className="px-4 py-2">MSISDN:</li>
                                                        <li className="px-4 py-2">IP:</li>
                                                        <li className="px-4 py-2">ACTION: </li>
                                                    </div>
                                                    <div>
                                                        <li className="px-4 py-2 font-medium">0125638761</li>
                                                        <li className="px-4 py-2 font-medium">101.02.100</li>
                                                        <li className="px-4 py-2 flex flex-row gap-2">
                                                            <div className="relative group">
                                                                <FaCircleInfo 
                                                                className="w-5 h-5 cursor-pointer text-[#19405A] hover:text-[#317CB0]" />
                                                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {t('details')}
                                                                </span>
                                                            </div>
                                                            <div className="relative group">
                                                                <FaCircleCheck
                                                                    onClick={() => handleAction('accepted')}
                                                                    className="w-5 h-5 cursor-pointer text-[#0EAF00] hover:text-[#14FF00]" />
                                                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {t('accept')}
                                                                </span>
                                                            </div>
                                                            <div className="relative group">
                                                                <FaCircleXmark 
                                                                onClick={() => handleAction('rejected')}
                                                                className="w-5 h-5 cursor-pointer text-[#BA0000] hover:text-[#FF0000]" />
                                                                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {t('reject')}
                                                                </span>
                                                            </div>
                                                        </li>

                                                    </div>
                                                    
                                                </ul>
                                            </div>
                                            )}
                                        </div>
                                    </td>
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
                    </div>
                )}

                {activeButton === 'TRACKING' && (
                    <div className="overflow-visible">
                    <table className="min-w-full divide-y table-auto border-collapse rounded-lg overflow-visible shadow-md text-xs">
                        <thead className="rounded bg-[#D95F08] text-white">
                        <tr className="divide-x divide-gray-200">
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("fileid")}>
                            <span className="flex items-center justify-between">
                            {t('file_id')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("datecreated")}>
                            <span className="flex items-center justify-between">
                            {t('date_created')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateuploaded")}>
                            <span className="flex items-center justify-between">
                            {t('date_uploaded')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("filename")}>
                            <span className="flex items-center justify-between">
                            {t('file_name')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("status")}>
                            <span className="flex items-center justify-between">
                            {t('status')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("confirmedby")}>
                            <span className="flex items-center justify-between">
                            {t('confirmed_by')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateconfirmed")}>
                            <span className="flex items-center justify-between">
                            {t('date_confirmed')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("approvedby")}>
                            <span className="flex items-center justify-between">
                            {t('approved_by')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("dateapproved")}>
                            <span className="flex items-center justify-between">
                            {t('date_approved')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("uploadedby")}>
                            <span className="flex items-center justify-between">
                            {t('uploaded_by')}
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
                                    <div className="text-right w-full">{item.uploadedby}</div>
                                    <div className="relative">
                                        <EllipsisVertical
                                        className="ml-2 cursor-pointer hover:text-[#D95F08]"
                                        onClick={() => handleEllipsisClick(index)}
                                        />
                                        {dropdownVisible === index && (
                                            <div ref={dropdownRef} className="absolute right-0 mt-2 w-max bg-white border border-gray-200 rounded shadow-lg z-50 text-left">
                                                <ul className="flex flex-row gap-1">
                                                    <div>
                                                        <li className="px-4 py-2">MSISDN:</li>
                                                        <li className="px-4 py-2">IP:</li>
                                                        <li className="px-4 py-2">ACTION: </li>
                                                    </div>
                                                    <div>
                                                        <li className="px-4 py-2 font-medium">0125638761</li>
                                                        <li className="px-4 py-2 font-medium">101.02.100</li>
                                                        <li className="px-4 py-2 flex flex-row gap-2">
                                                            <FaCircleInfo className="w-5 h-5 text-[#19405A] cursor-not-allowed" />
                                                            <FaCircleCheck className="w-5 h-5 text-[#0EAF00] cursor-not-allowed" />
                                                            <FaCircleXmark className="w-5 h-5 text-[#BA0000] cursor-not-allowed" />
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </td>
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
                </div>
                )}

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

            {isPasswordModalOpen && (
                <PasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setPasswordModalOpen(false)}
                    onProceed={handleOpenModal}
                    handleClose={() => setPasswordModalOpen(false)}
                />
            )}

            {/* Status Modal */}
            <StatusModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                status={modalState.status}
                message={modalState.message}
            />

        </div>
    );
};

export default BatchFiles;
