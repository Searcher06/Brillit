import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-400 text-white px-4 py-2 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left - Logo & Menu Icon */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl md:hidden">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <a href="#" className="text-2xl font-bold text-white font-[cursive]">
            Brillit.io
          </a>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex items-center w-1/2">
            <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 bg-white text-black rounded-l-full focus:outline-none"
          />
          <button className="bg-gray-700 px-4 py-2 rounded-r-full hover:bg-gray-600">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Right - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faBell} className="text-xl cursor-pointer hover:text-gray-400" />
          <FontAwesomeIcon icon={faUserCircle} className="text-2xl cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden flex items-center mt-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 text-black rounded-l-full focus:outline-none"
        />
        <button className="bg-gray-700 px-4 py-2 rounded-r-full hover:bg-gray-600">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </nav>
  );
}
