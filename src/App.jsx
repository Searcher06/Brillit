import { Sidebar } from "./Components/Sidebar"
import { faCircleUser, faSnowflake } from "@fortawesome/free-regular-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { Navbar } from "./Components/Navbar"
import "../src/assets/bg.png"
import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./Context/SearchContext"
import { Loader } from "./Components/Loader"
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
const API_KEY = "AIzaSyD6IZSWM5uPuporGCKky36AZYe5DnZKyoc"
videos = videos.concat(videos)

export default function App() {
  const { search } = useContext(SearchContext)
  const [called, setIscalled] = useState()
  const [Videos, setVideos] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoCategoryId=27&q=${encodeURIComponent(search)}&type=video&maxResults=20&key=${API_KEY}`;

  useEffect(() => {
    fetch("/json.json").then((response) => {
      return response.json()
    }).then((data) => {
      setVideos(data.items)
      setLoading(false)
      console.log(data.items)
    }).catch((err) => {
      setError(err.message)
      setLoading(false)
      console.log(err.message)
    })
  }, [])

  const [searchedVideos, setSearchedVideos] = useState([])
  useEffect(() => {
    if (searchedVideos.length !== 0 || search.length > 1) {
      setLoading(true)
      fetch(url).then((response) => {
        return response.json()
      }).then((data) => {
        setSearchedVideos(data.items)
        setLoading(false)
        console.log(data.items)
      }).catch((err) => {
        setError(err.message)
        setLoading(false)
        console.log(err.message)
      })
    }
  }, [called])


  function GetNew({ date }) {
    let today = new Date()
    if (date.getFullYear() === today.getFullYear()) {

      if (date.getMonth() !== today.getMonth()) {
        return `${today.getMonth() - date.getMonth()} months ago`
      }

      if (date.getMonth() === today.getMonth()) {
        if (date.getDate() === today.getDate()) {
          if (date.getHours() === today.getHours()) {
            return `${today.getMinutes() - date.getMinutes()} minutes ago`
          }
          else if (date.getHours() !== today.getHours()) {
            return `${today.getHours() - date.getHours()} hours ago`
          }
        }
        else if (date.getDate() !== today.getDate()) {
          return `${today.getDate() - date.getDate()} days ago `
        }
      }
    }

    else if (date.getFullYear() !== today.getFullYear()) {
      return `${today.getFullYear() - date.getFullYear()} years ago`
    }
  }
  const recommended = [
    "All", "Calculus", "Differential equation", "Kirchoffs law", "Big bang theory", "Java programming", "Indices", "Mail merge", "Descrete structures", "Trigonometry"
  ]

  const [tabVideos, setTabVideos] = useState({})
  useEffect(() => {
    recommended.forEach((element, index) => {
      fetch(`/json.json`).then((response) => {
        return response.json()
      }).then((data) => {
        setTabVideos((prevVideos) => ({ ...prevVideos, [element]: { ...data, [element]: element } }))
      }).catch((err) => {
        console.log(err.message)
      })
    })
  }, [])
  const [tab, setTab] = useState("All")
  console.log(loading)
  console.log(tabVideos)
  return <>
    <Navbar called={called} setIsacalled={setIscalled} />

    <Sidebar faHome={faHome} faSnowflake={faSnowflake} faCircleUser={faCircleUser} />

    <section id="main_content" className=" ml-18 mt-18">
      <section id="recommendation" className="font-[calibri] flex flex-wrap">
        {
          recommended.map((current, index) => {
            return current === tab ? <span key={index} className="bg-black text-white px-4 py-1 rounded-sm m-1">{current} </span> :
              <span key={index} onClick={() => {
                setTab(current)
                console.log(tabVideos[current])
              }} className="bg-gray-200 px-4 py-1 rounded-sm m-1">{current} </span>
          })
        }
      </section>


      <section className="flex flex-wrap">
        {
          loading ? <Loader /> : error ? error : searchedVideos.length !== 0 ?
            searchedVideos.map((current, index) => {
              const date = new Date(current.snippet.publishedAt)
              return <div key={index} className="font-[calibri] m-3">
                <div
                  className="bg-[url('/src/assets/bg.png')] bg-center rounded-sm bg-cover h-40 w-70 flex items-end justify-end"
                // style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
                >
                  <span className="text-sm text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">
                    1:30
                  </span>
                </div>

                <div>
                  <p className="font-medium text-[15.5px]">{current.snippet.title.slice(0, 30)}</p>
                  <div className="flex justify-between text-[13px] text-gray-700">
                    <p>{current.snippet.channelTitle}</p>
                    <p>{<GetNew date={date} />}</p>
                  </div>
                </div>
              </div>
            }) :
            Videos.map((current, index) => {
              const date = new Date(current.snippet.publishedAt)
              return <div key={index} className="font-[calibri] m-3">
                <div
                  className="bg-[url('/src/assets/bg.png')] bg-center rounded-sm bg-cover h-40 w-70 flex items-end justify-end"
                // style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
                >
                  <span className="text-sm text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">
                    1:30
                  </span>
                </div>

                <div>
                  <p className="font-medium text-[15.5px]">{current.snippet.title.slice(0, 30)}</p>
                  <div className="flex justify-between text-[13px] text-gray-700">
                    <p>{current.snippet.channelTitle}</p>
                    <p>{<GetNew date={date} />}</p>
                  </div>
                </div>
              </div>
            })
        }
      </section>
    </section>
  </>
}


