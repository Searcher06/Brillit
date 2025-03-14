import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export function Navbar() {
  return (<nav className="bg-white z-10 w-full flex h-16 items-center justify-between fixed top-0 left-0">
    <div className="logo  text-3xl text-blue-600 font-semibold pl-8">
      Brillit.io
    </div>
    <div className="search">
      <input type="text" placeholder="Search" className="h-11 bg-gray-100 pl-5 outline-0 w-120 rounded-l-full" />
      <button className="w-14 bg-blue-600 h-11 rounded-r-full">
        <FontAwesomeIcon icon={faSearch} className="text-white" />
      </button>
    </div>
    <div className="icons pr-7">
      <button className="w-17 bg-blue-600 h-9 text-white  font-[calibri] rounded-sm">
        Login
      </button>
    </div>
  </nav>);
}

