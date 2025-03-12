import { Sidebar } from "./Components/Sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faSnowflake } from "@fortawesome/free-regular-svg-icons"
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Navbar } from "./Components/Navbar"
import "../src/assets/bg.png"
// import { faFacebook } from "@fortawesome/free-brands-svg-icons"
export let videos = [
  {
    img: "/src/assets/bg.png",
    title: "Vscode tricks",
    date: "2 days ago",
    time: "12:20",
    channel: "CodewithMosh"
  },
  {
    img: "/src/assets/bg.png",
    title: "Implicit differentiation",
    date: "9 days ago",
    time: "18:20",
    channel: "organic chemistry"
  }, {
    img: "/src/assets/bg.png",
    title: "Introduction to Python P1",
    date: "2 months ago",
    time: "1:00:00",
    channel: "Brocode"
  }, {
    img: "/src/assets/bg.png",
    title: "Indices power law",
    date: "2 weeks ago",
    time: "2:40",
    channel: "Organic chemistry"
  }, {
    img: "/src/assets/bg.png",
    title: "Laws of indices",
    date: "2 days ago",
    time: "1:20",
    channel: "Orsborn"
  }, {
    img: "/src/assets/bg.png",
    title: "React.js full course",
    date: "8 days ago",
    time: "1:20:23",
    channel: "Traversy media"
  }, {
    img: "/src/assets/bg.png",
    title: "Python full tutorial",
    date: "3 days ago",
    time: "2:34:39",
    channel: "WebDevSimplified"
  }, {
    img: "/src/assets/bg.png",
    title: "The A.I boom",
    date: "2 mins ago",
    time: "1:20",
    channel: "CodewithMosh"
  },
]

videos = videos.concat(videos)
export default function App() {
  return <>
    <Navbar faSearch={faSearch} />

    <Sidebar faHome={faHome} faSnowflake={faSnowflake} faCircleUser={faCircleUser} />

    <section id="main_content" className=" ml-18 mt-18">
      <section id="recommendation" className="font-[calibri] flex flex-wrap">
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Calculus</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Differential equation</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">{"Kirchoff's law"}</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Mail merge</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Indices</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Descrete structures</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">The big bang</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Java Programming</span>
        <span className="bg-gray-200 px-4 py-1 rounded-sm m-1">Trigonometry</span>
      </section>

      <section className="flex flex-wrap">
        {
          videos.map((current, index) => {
            return <div key={index} className="font-[calibri] m-3">
              <div className={`bg-[url('${current.img}')] bg-center rounded-sm bg-cover h-40 w-70 flex items-end justify-end`}>
                <span className="text-sm  text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">{current.time}</span>
              </div>
              <div>
                <p className="font-medium text-[15.5px]">{current.title}</p>
                <div className="flex justify-between text-[13px] text-gray-700">
                  <p>{current.channel}</p>
                  <p>{current.date}</p>
                </div>
              </div>
            </div>
          })
        }
      </section>
    </section>
  </>
}


