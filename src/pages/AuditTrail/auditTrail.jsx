import React from 'react';
import { useState } from 'react';
import { Search, X, ArrowDownUp } from "lucide-react";
import { FaEye } from "react-icons/fa6";
import { HandleChange } from '../../components/Validations';
import { useTranslation } from 'react-i18next';
import { GetAuditTrail } from "../../api/getAuditTrails";
import { toast, ToastContainer } from "react-toastify";
import LoadingModal from '../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const AuditTrail = () => {

    const initialFormData = {
        userinput: 'ALL',
        datefrom: '',
        dateto: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const { t, i18n } = useTranslation();
    const [selectUserBy, setSelectUserBy] = useState("ALL");
    const [labelText, setLabelText] = useState("USER ID");
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "timestamp", direction: "descending" });
    const [auditData, setAuditData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        isOpen: false,
        status: "",
        message: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = async () => {
        const { userinput, datefrom, dateto } = formData;

       // Validate inputs
        if (!userinput || !datefrom || !dateto) {
            toast.error(t("modal_fill_all_fields"));
            return
        }

        setLoading(true);
        try {
            const response = await GetAuditTrail({ formData });

            if (response.logout) {
                toast.error(response.message);
                navigate('/login');
            } else if (response.audit) {
                setAuditData(response.audit);
                setModalState({
                    isOpen: true,
                    status: "success",
                    message: response.message,
                });
            } else {
                setAuditData([]);
                throw new Error(response.message);
            }
        } catch (error) {
            setAuditData([]);
            setModalState({
                isOpen: true,
                status: "error",
                message: error.message || t("failed_fetch"),
            });
        } finally {
            setLoading(false);
        }
    };

    const sortedData = [...auditData].sort((a, b) => {
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
        const maxPagesToShow = 5; 
        let startPage, endPage;
    
        if (totalPages <= maxPagesToShow) {
           
            startPage = 1;
            endPage = totalPages;
        } else {
            
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
    
        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key="prev-ellipsis"
                    className="px-3 py-1 mx-1 text-sm text-gray-700 bg-transparent"
                    disabled
                >
                    &#8230;
                </button>
            );
        }
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-3 py-1 mx-1 hover:bg-[#F3EEEB] rounded-full text-sm ${currentPage === i ? 'bg-[#F4E6DC] text-black' : 'bg-transparent text-gray-700'}`}
                >
                    {i}
                </button>
            );
        }
    
        if (endPage < totalPages) {
            pageNumbers.push(
                <button
                    key="next-ellipsis"
                    className="px-3 py-1 mx-1 text-sm text-gray-700 bg-transparent"
                    disabled
                >
                    &#8230;
                </button>
            );
        }
    
        return pageNumbers;
    };
    
    return (
        <div className="max-h-screen bg-gray-200 p-8">
            {loading && (<LoadingModal />)}
            <ToastContainer />
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">

                {/* Page Title */}
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-10">
                    <FaEye className="text-[#D95F08] mr-2" />
                    {t('audit_trail')}
                </h2>

                {/* Filteration */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className='flex gap-4 items-end mb-4'>
                         <div className="w-1/4">
                            <label className="block mb-1 text-gray-700">{t('select_user_by')}</label>
                            <select
                                className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                                value={selectUserBy}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    setSelectUserBy(selectedValue);
                                    setFormData((prev) => ({
                                        ...prev,
                                        userinput: selectedValue === 'ALL' ? 'ALL' : '', // Reset userinput for USERID
                                    }));
                                }}
                            >
                                <option value="ALL">ALL</option>
                                <option value="USERID">USER ID</option>
                            </select>
                        </div>

                        <div className="w-1/5">
                            <label className="block mb-1 text-gray-700">{t('user_id')}</label>
                            <input
                                type="text"
                                name="userinput"
                                value={formData.userinput}
                                onChange={(e) => {
                                    if (selectUserBy === 'USERID') {
                                        HandleChange(setFormData)(e); // Allow input changes only for USER ID
                                    }
                                }}
                                placeholder={selectUserBy}
                                readOnly={selectUserBy === 'ALL'} // Make input non-editable for 'ALL'
                                className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                            />
                        </div>

                         <div className="w-1/5">
                            <label className="block mb-1 text-gray-700">{t('date_from')}</label>
                            <input
                                type="date"
                                name="datefrom"
                                value={formData.datefrom}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                            />
                        </div>

                        <div className="w-1/5">
                            <label className="block mb-1 text-gray-700">{t('date_to')}</label>
                            <input
                                type="date"
                                name="dateto"
                                value={formData.dateto}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                            />
                        </div>
                        
                        <button
                            className="w-1/5 px-4 py-2 bg-[#D95F08] text-white tracking-wide shadow-md rounded font-bold hover:bg-[#FC8937]"
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {t('view')}
                        </button>
                    </div>
                </div>

                {/* Table - Search Area */}
                <div className='relative flex justify-end mb-4'>
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
                    <table className='min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md' >
                        <thead className="rounded bg-[#D95F08] text-white">
                            <tr className="divide-x divide-gray-200">
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("timestamp")}>
                                    <span className="flex items-center justify-between">
                                        {t('timestamp')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("userid")}>
                                    <span className="flex items-center justify-between">
                                        {t('user_id')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("username")}>
                                    <span className="flex items-center justify-between">
                                        {t('username')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("log")}>
                                    <span className="flex items-center justify-between">
                                        {t('log')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("interface")}>
                                    <span className="flex items-center justify-between">
                                        {t('interface')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("ip")}>
                                    <span className="flex items-center justify-between">
                                    {t('ip')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                    </th>
                            </tr>
                        </thead>
                                            
                        <tbody className="text-center divide-y divide-gray-200 cursor-default">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{item.timestamp}</td>
                                        <td className="px-4 py-2">{item.userId}</td>
                                        <td className="px-4 py-2">{item.username}</td>
                                        <td className="px-4 py-2">{item.log}</td>
                                        <td className="px-4 py-2">{item.interface}</td>
                                        <td className="px-4 py-2">{item.ip}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-4 py-2 border text-center">
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
            </div>
        </div>
    )
}

export default AuditTrail;
