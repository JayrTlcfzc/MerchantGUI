import React from 'react'
import { useState } from 'react'
import { Eye, Search, X, ArrowDownUp } from "lucide-react";
import { FaEye } from "react-icons/fa6";
import ViewWebUsersModal from '../../components/Modals/viewWebUsersModal';
import { useTranslation } from 'react-i18next';
import { viewWebUser, searchWebUser } from "../../api/webUserSearch";
import { toast, ToastContainer } from 'react-toastify';
import LoadingModal from '../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const ViewWebUsers = () => {
    const [selectUserBy, setSelectUserBy] = useState("USERNAME");
    const [userInput, setUserInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: "firstname", direction: "ascending" });
    const [openModal, setOpenModal] = useState('');
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    const handleViewModal = async (username) => {
        setLoading(true);
        try {
          const result = await searchWebUser({ username });
      
            if (result.logout) {
                toast.error(result.message);
                navigate('/login');
            } else if (result.success) {
                setModalData(result.webusers);
                setViewModalOpen(true);
            } else {
                toast.error("Failed to fetch web user:", result.message);
            }
        } catch (error) {
          toast.error(error);
        } finally {
            setLoading(false);
        }
      };
      
    const handleProceedStatus = () => {
        setViewModalOpen(false)
        setModalState({ isOpen: true, status: 'success', message: 'Action Successful!' });
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
    
        if (e.target.tagName === "SELECT") {
          setSelectUserBy(value); 
        } else {
          setUserInput(value); 
        }
      };

      const handleSubmit = async () => {
        const params = {
            USER: userInput,
            SEARCHOPTION: selectUserBy,
        };

        setLoading(true);
    
        try {
            const response = await viewWebUser(params);
            if (response.logout) {
                toast.error(response.message);
                navigate('/login');
            } else if (response.success) {
                setData(response.webusers || []); 
            } else {
                setData([]);
                toast.error(response.message);
            }
        } catch (error) {
            setData([]); 
        } finally {
            setLoading(false);
        }
    };
    

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
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
                className={`px-3 py-1 mx-1 hover:bg-[#F3EEEB] rounded-full text-sm ${currentPage === i ? 'bg-[#F4E6DC] text-black' : 'bg-transparent text-gray-700'}`}
                >
                {i}
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
                <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-4">
                <FaEye className="text-[#D95F08] mr-2" />
                {t('view_web_users')}
                </h2>

                {/* Search User*/}
                <div className="flex flex-col gap-4 mb-4">
                    <div>
                        <label className="text-sm font-semibold">{t('select_user_by')}</label>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <select
                        className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                        value={selectUserBy}
                        onChange={handleInputChange}
                        >
                        <option value="USERNAME">USERNAME</option>
                        <option value="MSISDN">MSISDN</option>
                        <option value="MSISDNOTP">MSISDN OTP</option>
                        </select>

                        <input
                        type="text"
                        placeholder={`Enter ${selectUserBy}`}
                        className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                        value={userInput}
                        onChange={handleInputChange}
                        />

                        <button
                        className="w-1/3 px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#D95F08] text-white hover:bg-[#FC8937]"
                        onClick={handleSubmit}
                        >
                        {t('search')}
                        </button>
                    </div>
                    </div>

                {/* Table - Search Area*/}
                <div className='relative flex justify-end mb-4'>
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
                            className='absolute right-2 top-1/2 -translate-y-1/2' 
                        />) 
                    }
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className='min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md' >
                        <thead className="rounded bg-[#D95F08] text-white">
                            <tr className="divide-x divide-gray-200">
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("userId")}>
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
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("msisdn")}>
                                    <span className="flex items-center justify-between">
                                     {t('msisdn')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("firstname")}>
                                    <span className="flex items-center justify-between">
                                     {t('first_name')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("lastname")}>
                                    <span className="flex items-center justify-between">
                                     {t('last_name')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("userslevel")}>
                                    <span className="flex items-center justify-between">
                                     {t('user_level')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("status")}>
                                    <span className="flex items-center justify-between">
                                    {t('status')}
                                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                                    </span>
                                </th>
                                <th className="px-4 py-2">
                                    {t('action')}
                                </th>
                            </tr>
                        </thead>
                                            
                        <tbody className="text-center divide-y divide-gray-200">
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                <tr key={index} className="cursor-default">
                                    <td className="px-4 py-2 whitespace-nowrap">{item.userId}</td>
                                    <td className="px-4 py-2">{item.username}</td>
                                    <td className="px-4 py-2">{item.msisdn}</td>
                                    <td className="px-4 py-2">{item.firstname}</td>
                                    <td className="px-4 py-2">{item.lastname}</td>
                                    <td className="px-4 py-2">{item.userslevel}</td>
                                    <td className="px-4 py-2">{item.status}</td>
                                    <td className="px-4 py-2 flex justify-center h-full cursor-pointer">
                                    <Eye
                                        onClick={() => handleViewModal(item.username)} // Pass the username here
                                        className="hover:text-[#D95F08]"
                                    />
                                    </td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="8" className="px-4 py-2 border text-center">
                                    {t("td_no_results_found")}
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

            {isViewModalOpen && modalData && (
                <ViewWebUsersModal
                    handleClose={() => setViewModalOpen(false)}
                    onProceed={handleProceedStatus}
                    webUserData={modalData} // Pass the fetched user data
                />
            )}

        </div>
    )
}

export default ViewWebUsers