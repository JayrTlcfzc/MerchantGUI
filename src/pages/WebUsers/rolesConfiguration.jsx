import React, { useState, useEffect } from 'react';
import { FaUsersGear } from 'react-icons/fa6';
import { Search, ArrowDownUp, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { userLevelCol } from "../../api/webuser";
import { getRolesConfigTable, updateRoles } from '../../api/rolesConfiguration';
import { toast, ToastContainer } from "react-toastify";
import ConfirmationModal from '../../components/Modals/confirmationModal';
import StatusModal from '../../components/Modals/statusModal';
import LoadingModal from '../../components/Modals/loadingModal';
import { useNavigate } from 'react-router-dom';

const rolesConfiguration = () => {
  const { t, i18n} = useTranslation();
  const [userLevel, setUserLevel] = useState("");
  const [newRole, setNewRole] = useState("")
  const [openModal, setOpenModal] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalData, setModalData] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, status: '', message: '' });
  const [rolesDetails, setRolesDetails] = useState([])
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLevels = async () => {
      setLoading(true);
      try {
        const result = await userLevelCol();
        if (result.logout) {
          toast.error(result.message);
          navigate('/login');
        } else if (result.success) {
          const parsedLevels = JSON.parse(result.level);

          if (Array.isArray(parsedLevels)) {
            setLevels(parsedLevels); 

          } else {
            toast.error(result.message);
          }
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserLevels();
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const sortedData = [...rolesDetails].sort((a, b) => {
    if (a[sortConfig.key]?.toLowerCase() < b[sortConfig.key]?.toLowerCase()) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key]?.toLowerCase() > b[sortConfig.key]?.toLowerCase()) {
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

  const handleSubmit = async (userlevel) => {
    if (!userLevel) {
      toast.error(t('userlevel_required'));
      return;
    }
    setLoading(true);

    try {
      const result = await getRolesConfigTable(userLevel);
      if (result.logout) {
        toast.error(result.message);
        navigate('/login');
      } else if (result.success) {
        const parsedRoles = JSON.parse(result.roles);
        setRolesDetails(parsedRoles);
        toast.success(result.message);
      } else {
        toast.error(result.message);
        setRolesDetails([]);
      }

    } catch (error) {
      toast.error(error.message);
      setRolesDetails([]);

    } finally {
      setLoading(false);
    } 
  }

  const changeRole = async () => {
    if (modalData) {
      const { userLevel, id, module, actionStatus } = modalData;

      try {
        const result = await updateRoles(
          userLevel,
          id,
          module,
          actionStatus
        );

        if (result.logout) {
          toast.error(result.message);
          navigate('/login');
        } else if (result.success) {
          setNewRole((prev) => ({
            ...prev,
            [id]: actionStatus,
          }));
    
          setModalState({
            isOpen: true,
              status: 'success',
              message: result.message
          });
        } else {
          setModalState({
            isOpen: true,
              status: 'error',
              message: result.message
          });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleOpenModal = (modalMessage, data) => {
    setModalMessage(modalMessage);
    setModalData(data);
    setOpenModal('confirmationModal');
  };

  const handleCloseModal = () => {
    setOpenModal('');
    setModalMessage('');
  };
  
  return (
    <div className="min-h-screen bg-gray-200 p-8">
      {loading && (<LoadingModal />)}
      <ToastContainer />

      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center mb-8">
          <FaUsersGear className="text-[#D95F08] mr-2" />
          {t('roles_configuration')}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">
          <p className='text-md font-medium'>
            {t('user_level')}
          </p>

          <select
            value={userLevel}
            onChange={(e) => setUserLevel(e.target.value)}
            className="md:w-2/5 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
          >
            <option value="">
              Please Select User Level
            </option>
            {levels.map((level) => (
              <option key={level.USERSLEVEL} value={level.USERSLEVEL.toUpperCase()}>
                {level.USERSLEVEL === 'TEMP1' ? 'TEMPORARY_NEW' : level.USERSLEVEL}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => handleSubmit(userLevel)}
            className="md:w-1/5 px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#D95F08] text-white hover:bg-[#FC8937]"
            disabled={loading}
          >
            {t('get_roles')}
          </button>
        </div>
  
        {/* GET ROLES TABLE */}
        {rolesDetails.length >= 0 && (
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            {/* SEARCH AREA */}
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
            
            {/* TABLE CONTENT */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md">
                <thead className="rounded bg-[#D95F08] text-white">
                  <tr className="divide-x divide-gray-200">
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("ID")}>
                      <span className="flex items-center justify-between"> 
                      {t('id')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("MODULE")}>
                      <span className="flex items-center justify-between">
                      {t('module')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("INTERFACE")}>
                      <span className="flex items-center justify-between">
                      {t('interface')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("DESCRIPTION")}>
                      <span className="flex items-center justify-between">
                      {t('description')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("USERSLEVEL")}>
                      <span className="flex items-center justify-between">
                      {t('user_level')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("RIGHTSINDICATOR")}>
                      <span className="flex items-center justify-between">
                      {t('rights_indicator')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("ACTIONSTATUS")}>
                      <span className="flex items-center justify-between">
                      {t('action')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index} className='cursor-default'>
                        <td className="px-4 py-2">{item.ID}</td>
                        <td className="px-4 py-2">{item.MODULE}</td>
                        <td className="px-4 py-2">{item.INTERFACE}</td>
                        <td className="px-4 py-2">{item.DESCRIPTION}</td>
                        <td className="px-4 py-2">{item.USERSLEVEL}</td>
                        <td className="px-4 py-2">{item.RIGHTSINDICATOR}</td>
                        <td className="px-4 py-2">
                          <select
                            className='cursor-pointer'
                            value={newRole[item.ID] || item.ACTIONSTATUS}
                            onChange={(e) => {
                              const updatedActionStatus = e.target.value;
                              handleOpenModal(t('modal_change_the_role_of'), {  
                                userLevel: item.USERSLEVEL,
                                id: item.ID,
                                module: item.MODULE,
                                actionStatus: updatedActionStatus
                              });
                            }}  
                          >
                              <option value="NO">NO</option>
                              <option value="YES">YES</option>
                          </select>
                          </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 border text-center">
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
        )}

      </div>

      {openModal === 'confirmationModal' && (
        <ConfirmationModal
          openModal={Boolean(openModal)}
          modalMessage={modalMessage}
          setModalData={modalData}
          setNewRole={newRole}
          handleCloseModal={handleCloseModal}
          onProceed={changeRole}
        />
      )}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        status={modalState.status}
        message={modalState.message}
      />

    </div>
  )
}

export default rolesConfiguration