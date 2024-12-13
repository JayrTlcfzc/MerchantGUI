import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUser, Globe } from "lucide-react";
import ChangePasswordModal from '../Modals/changePasswordModal';
import { useTranslation } from 'react-i18next';

const Topbar = ({ handleMouseEnter, handleMouseLeave, hoveredIcon, username, lastLogin }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [disableHover, setDisableHover] = useState(false);
    const dropdownRef = useRef(null);
    const languageDropdownRef = useRef(null);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // Access i18n instance
    
    // Toggle profile dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Toggle language dropdown
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    // Handle language change
    const changeLanguage = (language) => {
        i18n.changeLanguage(language); // Update language globally
        setIsLanguageDropdownOpen(false); // Close dropdown after selection
    };

    // Handle clicks inside language dropdown
    const handleClickInsideLanguageDropdown = (event) => {
        event.stopPropagation();
    };

    // Dropdown closing state handler
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
        if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
            setIsLanguageDropdownOpen(false);
        }
    };

    // Event Listener to detect clicks outside dropdowns
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Logout function
    const handleLogout = () => {
        navigate('/login'); // Navigate to login page
    };

    // Handle change password modal close
    const handleCloseChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
        setDisableHover(null);
    };

    return (
        <div className="ml-auto flex items-center space-x-2 text-lg">
            <div
                className="cursor-default relative"
                onMouseEnter={() => {
                    if (!isChangePasswordModalOpen && !disableHover) {
                        handleMouseEnter('user');
                    }
                }}
                onMouseLeave={() => {
                    if (!isChangePasswordModalOpen && !disableHover) {
                        handleMouseLeave();
                    }
                }}
                onClick={toggleDropdown}
                ref={dropdownRef}
            >
                <CircleUser
                    size={34}
                    color={
                        disableHover || isChangePasswordModalOpen
                            ? "#D95F08"
                            : hoveredIcon === 'user' || isDropdownOpen
                            ? "#FCAD74"
                            : "#D95F08"
                    }
                />
                {isDropdownOpen && (
                    <div className="absolute -right-10 mt-2 w-64 bg-[#23587C] text-black shadow-lg rounded-tl-lg rounded-bl-3xl">
                        <div className="p-4">
                            <p className="font-bold text-white">{username}</p>
                            <p className="text-sm text-white">Last Login: {lastLogin}</p>
                            <button
                                onClick={() => {setIsChangePasswordModalOpen(true);
                                    handleMouseLeave();
                                }}
                                className="block mt-6 text-white hover:text-[#FCAD74]"
                            >
                                {t('change_password')}
                            </button>
                            <button onClick={handleLogout} className="block text-white hover:text-[#FCAD74]">
                            {t('logout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="cursor-pointer relative"
                onMouseEnter={() => handleMouseEnter('globe')}
                onMouseLeave={handleMouseLeave}
                onClick={toggleLanguageDropdown}
                ref={languageDropdownRef}
            >
                <Globe
                    size={34}
                    color={hoveredIcon === 'globe' || isLanguageDropdownOpen ? "#FCAD74" : "#D95F08"}
                />
                {isLanguageDropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-40 bg-[#23587C] text-black shadow-lg rounded-tl-lg rounded-bl-3xl"
                        onClick={handleClickInsideLanguageDropdown}
                    >
                        <div className="p-4">
                            <button
                                onClick={() => {changeLanguage('en');
                                    handleMouseLeave();
                                }}
                                className="block mt-2 w-full text-left px-4 text-white hover:text-[#FCAD74]"
                                
                            >
                                English
                            </button>
                            <button
                                onClick={() => {changeLanguage('fr')
                                    handleMouseLeave();
                                }}
                                className="block mt-2 w-full text-left px-4 text-white hover:text-[#FCAD74]"
                            >
                                Français
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {isChangePasswordModalOpen && (
                <ChangePasswordModal handleClose={handleCloseChangePasswordModal} />
            )}
        </div>
    );
};

export default Topbar;
