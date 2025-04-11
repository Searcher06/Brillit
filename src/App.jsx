import { Sidebar } from "./Components/Sidebar"
import { faCircleUser, faSnowflake } from "@fortawesome/free-regular-svg-icons"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { Navbar } from "./Components/Navbar"
import "../src/assets/bg.png"
import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./Context/SearchContext"
import { Loader } from "./Components/Loader"
import { useNavigate } from "react-router-dom"
import { CallContext } from "./Context/CallContext"
import { ActiveContext } from "./Context/ActiveContext"
import { NetworkError } from "./Components/NetworkError"
import { searchedVideosContext } from "./Context/searchVideosContext"
import FormatYouTubeDuration from "./Components/FormatTime"
import { GetNew } from "./Components/FormatDate"
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url = `https://www.googleapis.com/youtube/v3/search?part=id&videoCategoryId=27&q=${encodeURIComponent(search)}&type=video&maxResults=50&key=${API_KEY}`;
  const { called } = useContext(CallContext)

  // useEffect(() => {
  //   fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=programming&type=video&maxResults=20&key=${API_KEY}`).then((response) => {
  //     return response.json()
  //   }).then((data) => {
  //     console.log("Fetched the searched videos", data)
  //     let ids = data.items.map((current) => {
  //       return current.id.videoId
  //     }).toString()
  //     fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${API_KEY}`).then((response) => {
  //       return response.json()
  //     }).then((data) => {
  //       console.log("Fetched the video duration", data)
  //     }).catch((err) => {
  //       console.log(err.message)
  //     })
  //   }).catch((err) => {
  //     console.log(err.message)
  //   })
  // }, [])

  const { searchedVideos, setSearchedVideos } = useContext(searchedVideosContext)
  useEffect(() => {
    if (search.length > 0) {
      setLoading(true)
      fetch(url).then((response) => {
        return response.json()
      }).then((data) => {
        let ids = data.items.map((current) => {
          return current.id.videoId
        }).toString()
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${API_KEY}`).then((response) => {
          return response.json()
        }).then((data) => {
          setSearchedVideos(data.items.filter((current) => {
            return current.snippet.categoryId === '26' || current.snippet.categoryId === '27'
          }))
          setLoading(false)
        }).catch((err) => {
          setError(err.message)
          setLoading(false)
          console.log(err.message)
        })
      }).catch((err) => {
        setError(err.message)
        setLoading(false)
        console.log(err.message)
      })
    }
  }, [called])

  console.log(searchedVideos.length, search.length)

  const recommended = [
    "All", "Calculus", "Differential equation", "Kirchoffs law", "Big bang theory", "Java programming", "Indices", "Mail merge", "Descrete structures", "Trigonometry"
  ]
  const [tabVideos, setTabVideos] = useState({})
  const [tab, setTab] = useState("All")

  useEffect(() => {
    if (!tabVideos[tab]) {
      console.log(tab)
      fetch("/duration.json").then((response) => {
        setLoading(true)
        return response.json()
      })
        .then((data) => {
          setTabVideos((prevs) => ({
            ...prevs, [tab]: {
              ...data, items: data.items.filter((current) => {
                return current.snippet.categoryId === '26' || current.snippet.categoryId === '27'
              }), [tab]: tab
            }
          }))
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
          console.log(err.message)
        })
    }
  }, [tab])

  const navigate = useNavigate()
  const { active, setActive } = useContext(ActiveContext)
  console.log(tabVideos)
  return <>
    <Navbar />

    <Sidebar faHome={faHome} faSnowflake={faSnowflake} faCircleUser={faCircleUser} />

    <section id="main_content" className=" ml-18 mt-18">
      <section id="recommendation" className="font-[calibri] flex flex-wrap">
        {
          recommended.map((current, index) => {
            return current === tab ? <span key={index} className="bg-black text-white px-4 py-1 rounded-sm m-1">{current} </span> :
              <span key={index} onClick={() => {
                setTab(current)
                setActive("tab")
                setError(null)
                // console.log(tabVideos[current])
              }} className="bg-gray-200 px-4 py-1 rounded-sm m-1">{current} </span>
          })
        }
      </section>


      <section className={`flex flex-wrap`}>
        {
          loading ? <Loader /> : error ? <NetworkError /> : active == "tab" ? tabVideos[tab]?.items.map((current, index) => {
            const date = new Date(current.snippet.publishedAt)
            const isoDuration = current.contentDetails.duration
            return <div onClick={() => {
              navigate(`/videos/${current.id}`)
            }}
              key={index} className="font-[calibri] m-3 hover:scale-[1.05] transition duration-300">
              <div
                className=" bg-center rounded-sm bg-cover h-40 w-70 flex items-end justify-end"
                style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
              // bg-[url('/src/assets/bg.png')]
              >
                <span className="text-sm text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">
                  {<FormatYouTubeDuration isoDuration={isoDuration} />}
                </span>
              </div>

              <div>
                <p className="font-medium text-[15.5px]">{current.snippet.title.slice(0, 30) + '...'}</p>
                <div className="flex justify-between text-[13px] text-gray-700">
                  <p>{current.snippet.channelTitle.slice(0, 30)}</p>
                  <p>{<GetNew date={date} />}</p>
                </div>
              </div>
            </div>
          }) :
            active == "search" ? searchedVideos.map((current, index) => {
              const date = new Date(current.snippet.publishedAt)
              const isoDuration = current.contentDetails.duration
              return <div key={index} className="font-[calibri] m-3 hover:scale-[1.05] transition duration-300">
                <div
                  onClick={() => {
                    navigate(`/videos/${current.id}`)
                  }}
                  className=" bg-center rounded-sm bg-cover h-40 w-70 flex items-end justify-end"
                  style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
                >
                  <span className="text-sm text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">
                    {<FormatYouTubeDuration isoDuration={isoDuration} />}
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
              : null
        }
      </section>
    </section>
  </>
}


