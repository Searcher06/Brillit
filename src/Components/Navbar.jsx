import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../Context/SearchContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
export function Navbar({ setIsacalled, setActive }) {
  const { search, SearchHandler } = useContext(SearchContext)
  return (<nav className="bg-white z-10 w-full flex h-16 items-center justify-between fixed top-0 left-0">
    <div className="logo  text-3xl text-blue-600 font-semibold pl-8">
      Brillit.io
    </div>
    <div className="search">
      <input type="text" onChange={(event) => {
        SearchHandler(event.target.value)
      }} value={search}
        placeholder="Search" className="h-11 bg-gray-100 pl-5 outline-0 w-120 rounded-l-full" />
      <button onClick={() => {
        setIsacalled((prevState) => !prevState)
        setActive("search")
        console.log("executed")
      }} className="w-14 bg-blue-600 h-11 rounded-r-full">
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

