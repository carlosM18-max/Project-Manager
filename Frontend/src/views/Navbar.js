import React, { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <nav className="bg-cyan-500 dark:border-blue-600 relative">
                <div className="w-full bg-blue-500" style={{ position: 'absolute', top: 0, left: 0, height: 90 }} />
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative z-10">
                    <div className="flex items-center">
                        {/* <img src={cipsasidebar} className="h-8 mr-3 md:border-0 rounded" alt="cipsa Logo" style={{ width: '150px', height: 'auto' }} /> */}
                    </div>
                    <button
                        onClick={handleDropdownToggle}
                        type="button"
                        className={`inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 absolute top-4 right-4 transition duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        aria-controls="navbar-dropdown"
                        aria-expanded={isDropdownOpen}
                    >
                        <span className="sr-only"></span>
                        <ChevronDownIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    <div className={`w-full md:block md:w-auto transition-all duration-300 ${isDropdownOpen ? '' : 'hidden'}`} id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <a
                                    href="/inicio"
                                    className="block py-2 pl-3 pr-4 text-white "
                                    aria-current="page"
                                >
                                    INICIO
                                </a>
                            </li>
                            <li>
                                <button
                                    id="dropdownNavbarLink"
                                    onClick={handleDropdownToggle}
                                    className="flex items-center justify-between w-full text-white rounded hover:bg-blue-500 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700 md:p-0 md:w-auto dark:text-cyan-600 md:dark:hover:text-cyan-500 dark:focus:text-cyan-600 dark:border-blue-700 dark:hover:bg-cyan-700 md:dark:hover:bg-transparent transition-colors duration-200"
                                >
                                    Crear Proyecto
                                    <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <Transition
                                    show={isDropdownOpen}
                                    enter="transition ease-out duration-200 transform opacity-0 scale-95"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-75 transform opacity-100 scale-100"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    {(ref) => (
                                        <div ref={ref} id="dropdownNavbar" className="z-10 font-normal bg-blue-300 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-blue-600 absolute mt-2">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                                <li>
                                                    <div className="flex items-center">
                                                        <span className="text-cyan-200 float:left">
                                                            <FaTasks />
                                                        </span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-2 text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}></svg>
                                                    </div>
                                                    <a href="/proyectos" className="block px-2 py-2 hover:bg-blue-800-100 dark:hover:bg-cyan-600 dark:hover:text-white">
                                                        Proyectos
                                                    </a>
                                                </li>
                                                <li>

                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </Transition>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
