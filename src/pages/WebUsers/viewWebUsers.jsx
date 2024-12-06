import React from 'react'
import { useState } from 'react'
import { Eye, Search, X, ArrowDownUp } from "lucide-react";
import ViewWebUsersModal from './viewWebUsersModal.jsx';

const ViewWebUsers = () => {
    const [selectUserBy, setSelectUserBy] = useState("USER ID");
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: "firstname", direction: "ascending" });
    const [openModal, setOpenModal] = useState('');

    const data = [
        { userid: 1, username: "User1", msisdn: 345876, firstname: "Abdul",lastname: "Jafar", userlevel: "IT_ADMIN_MERCHANT", status: "ACTIVE" },
        { userid: 2, username: "User2", msisdn: 127413, firstname: "Juan",lastname: "Cruz", userlevel: "IT_ADMIN_MERCHANT", status: "DEACTIVE" },
        { userid: 3, username: "User3", msisdn: 5327452, firstname: "Sara",lastname: "Brook", userlevel: "IT_ADMIN_MERCHANT", status: "ACTIVE" },
        { userid: 4, username: "User2", msisdn: 127413, firstname: "Juan",lastname: "Cruz", userlevel: "IT_ADMIN_MERCHANT", status: "DEACTIVE" },
        { userid: 5, username: "User3", msisdn: 5327452, firstname: "Sara",lastname: "Brook", userlevel: "IT_ADMIN_MERCHANT", status: "ACTIVE" },
        { userid: 6, username: "User2", msisdn: 127413, firstname: "Juan",lastname: "Cruz", userlevel: "IT_ADMIN_MERCHANT", status: "DEACTIVE" },
        { userid: 7, username: "User3", msisdn: 5327452, firstname: "Sara",lastname: "Brook", userlevel: "IT_ADMIN_MERCHANT", status: "ACTIVE" },
    ];

    const handleInputChange = (e) => {
        setSelectUserBy(e.target.value);
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
        <div className="min-h-screen bg-gray-200 p-8">
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">

                {/* Page Title */}
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center mb-4">
                    <Eye color="#D95F08" className="mr-2" /> VIEW WEB USERS
                </h2>

                {/* Search User*/}
                <div className="flex flex-col gap-4 mb-4">
                    <div>
                        <label className='text-sm font-semibold'>SELECT USER BY:</label>
                    </div>

                    <div className='flex gap-4 mb-4'>
                        <select
                        className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                        defaultValue={selectUserBy}
                        onChange={handleInputChange}
                        >
                            <option value="USER ID">USER ID</option>
                            <option value="SAMPLE">SAMPLE</option>
                        </select>

                        <input
                            type="text"
                            placeholder={selectUserBy}
                            className="w-1/3 px-4 py-2 border rounded-md shadow-md text-gray-600 focus:outline-none"
                        />

                        <button className="w-1/3 px-6 py-2 bg-[#D95F08] text-white rounded-md shadow-md hover:bg-[#FC8937]">
                        SEARCH
                        </button>
                    </div>
                </div>

                {/* Table - Search Area*/}
                <div className='relative flex justify-end mb-4'>
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
                            className='absolute right-2 top-1/2 -translate-y-1/2' 
                        />) 
                    }
                </div>

                {/* Table Content */}
                <table className='min-w-full divide-y table-auto border-collapse rounded-lg overflow-hidden shadow-md' >
                    <thead className="rounded bg-[#D95F08] text-white">
                        <tr className="divide-x divide-gray-200">
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("userid")}>
                                <span className="flex items-center justify-between">
                                    USER ID
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("username")}>
                                <span className="flex items-center justify-between">
                                    USERNAME
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("msisdn")}>
                                <span className="flex items-center justify-between">
                                    MSISDN
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("firstname")}>
                                <span className="flex items-center justify-between">
                                    FIRST NAME
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("lastname")}>
                                <span className="flex items-center justify-between">
                                    LAST NAME
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("username")}>
                                <span className="flex items-center justify-between">
                                    USER LEVEL
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2 cursor-pointer group hover:bg-[#E4813A]" onClick={() => requestSort("status")}>
                                <span className="flex items-center justify-between">
                                    STATUS
                                    <ArrowDownUp className="inline-block ml-1 w-4 h-4 opacity-0 group-hover:opacity-100"/>
                                </span>
                            </th>
                            <th className="px-4 py-2">
                                ACTION
                            </th>
                        </tr>
                    </thead>
                                        
                    <tbody className="text-center divide-y divide-gray-200">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={index} className="">
                                    <td className="px-4 py-2 whitespace-nowrap">{item.userid}</td>
                                    <td className="px-4 py-2">{item.username}</td>
                                    <td className="px-4 py-2">{item.msisdn}</td>
                                    <td className="px-4 py-2">{item.firstname}</td>
                                    <td className="px-4 py-2">{item.lastname}</td>
                                    <td className="px-4 py-2">{item.userlevel}</td>
                                    <td className="px-4 py-2">{item.status}</td>
                                    <td className='px-4 py-2 flex justify-center h-full cursor-pointer'>
                                      <Eye
                                        onClick={() => setOpenModal('viewWebUsersModal')}
                                        className='hover:text-[#D95F08]' />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-2 border text-center">
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
            {openModal === 'viewWebUsersModal' && (
              <ViewWebUsersModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} />
            )}
            {/* <ViewWebUsersModal openModal={Boolean(openModal)} handleClose={() => setOpenModal('')} /> */}
        </div>
    )
}

export default ViewWebUsers