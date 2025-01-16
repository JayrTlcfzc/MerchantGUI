import React, { useState, useEffect } from "react";
import { ClipboardPlus, Search, ArrowDownUp, X, Download} from "lucide-react";
import RequestReportModal from "../../components/Modals/requestReportModal";
import { useTranslation } from "react-i18next";
import { generateReview } from '../../api/reports';

const RequestReports = () => {
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "ID", direction: "descending" });
    const [openModal, setOpenModal] = useState('');
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [genReviewData, setGenReviewData] = useState([]);
    const [dateFromArray, setDateFromArray] = useState([]);
    const [dateToArray, setDateToArray] = useState([]);
    const [transTypeArray, setTransTypeArray] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGenerateReview = async () => {
            setLoading(true);
            try {
    
            const { success, rowData, dateFrom, dateTo, transType, message } = await generateReview();
    
                if (success) {
                    let parsedData;
                    if (Array.isArray(rowData)) {
                        parsedData = rowData[0];
                    } else {
                        parsedData = rowData; 
                    }
    
                    if (parsedData) {
                        parsedData = Array.isArray(rowData) ? rowData : [rowData];
                        console.log("parsedData: "+parsedData);
    
                        setGenReviewData(JSON.parse(parsedData));
                        setDateFromArray(dateFrom);
                        setDateToArray(dateTo);
                        setTransTypeArray(transType);
    
                    }
                    else {
                        console.log("ERROR!!!");
                    }
                } else {
                    setError(result.message || 'Invalid data format');
                    console.log("Unsuccesful");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                console.log("GenReviewData: ", genReviewData);
            }
        };
        
        fetchGenerateReview();
    }, [isViewModalOpen]);

    const handleViewModal = () => setViewModalOpen(true);

    const handleProceedStatus = () => {
        setViewModalOpen(false)
        setModalState({ isOpen: true, status: 'success', message: 'Action Successful!' });
    }

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const sortedData = [...genReviewData].sort((a, b) => {
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

    const getReportStatus = (status) => {
        if (status == 0) {
            return (
            <div className="p-1 bg-[#4CBB17] text-sm text-white rounded-lg">
                Reports has been generated
            </div> 
            )
        } if (status == 1) {
            return (
                <div className="p-1 bg-[#FF5733] text-sm text-white rounded-lg">
                    Pending
                </div> 
            )
        } if (status == 2) {
            return (
                <div className="p-1 bg-sky-600 text-sm text-white rounded-lg">
                    Processing
                </div> 
            )
        } if (status == 100) {
            return (
                <div className="p-1 bg-[#727272] text-sm text-white rounded-lg">
                    No Records Found
                </div> 
            )
        }
    }

    const getDownloadButton = (status) => {
        if (status == 0) {
            return (
                <div className="flex">
                    <button className="flex p-2 m-1 bg-[#408a1e] text-xs text-white rounded-md shadow-lg hover:bg-[#67c73a]">
                        <Download className="inline-block mr-1 w-4 h-4"/>
                        CSV
                    </button>
                    <button className=" flex p-2 m-1 bg-red-500 text-xs text-white rounded-md shadow-lg hover:bg-[#f66e6e]">
                        <Download className="inline-block mr-1 w-4 h-4"/>
                        PDF
                    </button>
                </div>
            )
        } else {
            return ('---')
        }
    }

    return (
        <div className="max-h-screen bg-gray-200 p-8">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">

                {/* Page Title */}
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-10">
                    <ClipboardPlus color="#D95F08" className="mr-2" />
                    {t('request_reports')}
                </h2>

                {/* Request Button */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className='flex gap-4 items-end mb-4'>
                        <button className="w-1/6 px-2 py-2 bg-[#23587C] text-sm text-white tracking-wide shadow-md rounded font-bold hover:bg-[#2C75A6] focus:outline-none focus:ring-2 focus:ring-[#2C75A6]/50 focus:ring-offset-2" onClick={handleViewModal}>
                            {t('request')}
                        </button>
                    </div>
                </div>

                {/* Search Area */}
                <div className="relative flex justify-end gap-4 mb-4">
                <input
                    type='text'
                    value={searchInput}
                    onChange={handleSearch}
                    placeholder= {t('search')}
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
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md text-xs">
                    <thead className="rounded bg-[#D95F08] text-white">
                        <tr className="divide-x divide-gray-200">
                        <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("ID")}>
                            <span className="flex items-center justify-between">
                                {t('report_id')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                        </th>
                        <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("REPORTEDDATE")}>
                            <span className="flex items-center justify-between">
                                {t('date_requested')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                        </th>
                        <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("REPORTNAME")}>
                            <span className="flex items-center justify-between">
                                {t('report_name')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                        </th>
                        <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("REPORTTYPE")}>
                            <span className="flex items-center justify-between">
                                {t('report_type')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                        </th>
                        <th className="px-4 py-2 cursor-pointer group">
                            {t('date_from')}
                        </th>
                        <th className="px-4 py-2 cursor-pointer group">
                            {t('date_to')}
                        </th>
                        <th className="px-4 py-2 cursor-pointer group">
                            {t('transaction_type')}
                        </th>
                        <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]"  onClick={() => requestSort("REPORTSTATUS")}>
                            <span className="flex items-center justify-between">
                                {t('report_status')}
                                <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                            </span>
                        </th>
                        <th className="px-4 py-2 cursor-deafult group">
                            {t('action')}
                        </th>
                        </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={index} className="cursor-pointer">
                                <td className="px-4 py-2 whitespace-nowrap">{item.ID}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{item.REPORTEDDATE}</td>
                                <td className="px-4 py-2">{item.REPORTNAME}</td>
                                <td className="px-4 py-2">{item.REPORTTYPE}</td>
                                <td className="px-4 py-2">{dateFromArray[indexOfFirstItem + index]}</td>
                                <td className="px-4 py-2">{dateToArray[indexOfFirstItem + index]}</td>
                                <td className="px-4 py-2">{transTypeArray[indexOfFirstItem + index]}</td>
                                <td className="px-4 py-2">
                                    {getReportStatus(item.REPORTSTATUS)}
                                </td>
                                <td className="px-4 py-2">
                                    {getDownloadButton(item.REPORTSTATUS)}
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="9" className="px-4 py-2 border text-center">
                            {t('td_no_results_found')}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>

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