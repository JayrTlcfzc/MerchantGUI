import React, { useState, useEffect } from 'react';
import { FaUsersGear } from 'react-icons/fa6';
import { Search, ArrowDownUp, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations';
import { userLevelCol } from "../../api/webuser";

const rolesConfiguration = () => {
  const { t, i18n} = useTranslation();
  const [error, setError] = useState(null);
  const [userLevel, setUserLevel] = useState("");
  const [rolesDetails, setRolesDetails] = useState([]);
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "firstname", direction: "ascending" });

  useEffect(() => {
    const fetchUserLevels = async () => {
      setLoading(true);
      try {
        const result = await userLevelCol();
        if (result.success) {
          const parsedLevels = JSON.parse(result.level);
          console.log(parsedLevels)
          if (Array.isArray(parsedLevels)) {
            setLevels(parsedLevels); 

          } else {
            setError('Invalid user level data format');
          }
        } else {
          setError(result.message || 'Invalid data format');
        }
      } catch (err) {
        setError(err.message); // Handle fetch errors
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserLevels();
  }, []);

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const sortedData = [...userLevel].sort((a, b) => {
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
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 mx-1 hover:bg-[#F3EEEB] rounded-full text-sm ${currentPage === i ? 'bg-[#F4E6DC] text-black' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
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
            // onClick={() => handleSubmit(msisdn)}
            className="md:w-1/5 px-6 py-2 tracking-wide shadow-md rounded font-bold bg-[#D95F08] text-white hover:bg-[#FC8937]"
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
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("id")}>
                      <span className="flex items-center justify-between"> 
                      {t('id')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("module")}>
                      <span className="flex items-center justify-between">
                      {t('module')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("interface")}>
                      <span className="flex items-center justify-between">
                      {t('interface')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("description")}>
                      <span className="flex items-center justify-between">
                      {t('description')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("userlevel")}>
                      <span className="flex items-center justify-between">
                      {t('user_level')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("rightsindicator")}>
                      <span className="flex items-center justify-between">
                      {t('rights_indicator')}
                        <ArrowDownUp className="inline-block ml-1 w-4 h-4"/>
                      </span>
                    </th>
                    <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("action")}>
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
                      <tr key={index} className="cursor-pointer">
                        <td className="px-4 py-2 whitespace-nowrap">{item.ID}</td>
                        <td className="px-4 py-2">{item.MODULE}</td>
                        <td className="px-4 py-2">{item.INTERFACE}</td>
                        <td className="px-4 py-2">{item.DESCRIPTION}</td>
                        <td className="px-4 py-2">{item.USERLEVEL}</td>
                        <td className="px-4 py-2">{item.RIGHTSINDICATOR}</td>
                        <td className="px-4 py-2">{item.ACTION}</td>
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
    </div>
  )
}

export default rolesConfiguration