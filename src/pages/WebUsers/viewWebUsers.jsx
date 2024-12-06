import React from 'react'
import { useState } from 'react'
import { Eye, Search, X } from "lucide-react";

const viewWebUsers = () => {
    const [selectUserBy, setSelectUserBy] = useState("USER ID");
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        setSelectUserBy(e.target.value);
      };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-center mb-4">
            <Eye color="#D95F08" className="mr-2" />
            VIEW WEB USERS
            </h2>

            {/* Search User */}
            <div className="flex flex-col gap-4 mb-4">
                <div>
                    <label className='text-sm'>SELECT USER BY:</label>
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

            <div className='relative flex justify-end'>
                <input
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search...'
                    className='w-1/5 h-10 border border-gray-400 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#23587C]' />
                    {!searchInput ? (
                        <Search 
                        color='#BFBFBF'
                        className='absolute right-2 top-1/2 -translate-y-1/2' />) 
                        : (
                        <X 
                            color='#BFBFBF'
                            onClick={() => setSearchInput('')}
                            className='absolute right-2 top-1/2 -translate-y-1/2' />) }
            </div>
            
        </div>

    </div>
  )
}

export default viewWebUsers