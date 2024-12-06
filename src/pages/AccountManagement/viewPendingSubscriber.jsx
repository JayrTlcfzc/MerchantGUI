import React, { useState } from "react";
import { Eye, Search } from "lucide-react";

const ViewPendingSubscriber = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "firstname", direction: "ascending" });

  const data = [
    { firstname: "Abdul", lastname: "Jafar", msisdn: 2381389, status: "ACTIVE" },
    { firstname: "Juan", lastname: "Dela Cruz", msisdn: 3458762, status: "DEACTIVE" },
    { firstname: "John", lastname: "Doe", msisdn: 9786432, status: "ACTIVE" },
    { firstname: "Ali", lastname: "Mohammad", msisdn: 12323453, status: "DEACTIVE" },
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
          className={`px-3 py-1 mx-1 rounded-full text-sm ${currentPage === i ? 'bg-[#F4E6DC] text-black' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">

        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center mb-10">
          <Eye color="#D95F08" className="mr-2" /> View Pending Subscriber
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
                className='absolute right-2 top-1/2 -translate-y-1/2' 
            />) 
          }
        </div>

        {/* Table Content */}
        <table className="min-w-full divide-y table-auto border-collapse rounded-lg shadow overflow-hidden shadow-md">
          <thead className="rounded bg-[#D95F08] text-white">
            <tr className="divide-x divide-gray-200">
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("firstname")}>
                FIRST NAME
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("lastname")}>
                LAST NAME
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("msisdn")}>
                MSISDN
              </th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => requestSort("status")}>
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="cursor-pointer">
                  <td className="px-4 py-2 whitespace-nowrap">{item.firstname}</td>
                  <td className="px-4 py-2">{item.lastname}</td>
                  <td className="px-4 py-2">{item.msisdn}</td>
                  <td className="px-4 py-2">{item.status}</td>
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
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold"
            disabled={currentPage === 1}
          >
            «
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold"
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {renderPageNumbers()} {/* PAGE NUMBERS */}
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold"
            disabled={currentPage === totalPages}
          >
            ›
          </button>
          <button
            onClick={() => paginate(totalPages)}
            className="px-3 py-1 bg-none text-xl text-[#19405A] font-bold"
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPendingSubscriber;
