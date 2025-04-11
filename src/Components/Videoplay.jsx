import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { useNavigate, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { GetNew } from "./GetNew"
import { useEffect, useState } from "react"
import { Loader } from "./Loader"
import { NetworkError } from "./NetworkError"

export default function Videoplay() {
    const { id } = useParams()
    const [channelVids, setchannelVids] = useState([])
    const [recommend, setRecommend] = useState([])
    const [recommendL, setRecommendL] = useState()
    const [recommendR, setRecommendR] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_KEY = "AIzaSyD6IZSWM5uPuporGCKky36AZYe5DnZKyoc"
    const navigate = useNavigate()
    // const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoCategoryId=27&q=${info}&type=video&maxResults=50&key=${API_KEY}`;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`

    useEffect(() => {
        fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${data.items[0].snippet.channelId}&type=video&key=${API_KEY}`).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
                setchannelVids(data)
                setLoading(false)
            }).catch((err) => {
                console.log(err.message)
                setError(err.message)
                setLoading(false)
            })
            // console.log(data.items[0].snippet.channelTitle)

            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoCategoryId=27&q=${data.items[0].snippet.title}&type=video&maxResults=100&key=${API_KEY}`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setRecommend(data.items.filter((current) => {
                        return current.snippet.title !== data.items[0].snippet.title
                    }))
                    setRecommendL(false)
                })
                .catch((error) => {
                    setRecommendR(error.message)
                    setRecommendL(false)
                })
        }).catch((err) => {
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        })
    }, [url]) // I will later remove the dependency


    console.log(id)
    console.log(loading)
    return <>
        <Navbar />
        <Sidebar />
        <section id="main_content" className=" ml-18 mt-18 flex justify-center flex-col">
            <section id="video-container" className="w-[98%] h-[400px] flex items-center">
                {
                    loading ? <Loader /> : error ? <NetworkError message={error} /> : <>
                        <div className="w-[950px] h-[400px]">
                            {/* <video src="/src/assets/video.mp4" className="w-full h-full" controls={true}></video> */}

                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${id}`}
                                width={"100%"}
                                height={"100%"}
                                controls={true}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0,
                                            showinfo: 0,
                                            controls: 1
                                        }
                                    }
                                }}
                                style={{
                                    all: "unset"
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap overflow-x-hidden overflow-y-auto h-[400px] w-2xl justify-center">
                            {
                                channelVids.items.map((current, index) => {
                                    const date = new Date(current.snippet.publishedAt)
                                    return <div key={index} onClick={() => { navigate(`/videos/${current.id.videoId}`) }}
                                        className="font-[calibri] m-3">
                                        <div style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
                                            className={`bg-center rounded-sm bg-cover h-39 w-60 flex items-end justify-end`}>
                                            <span className="text-sm  text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">{current.time}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-[15px]">{current.snippet.title.slice(0, 30) + '...'}</p>
                                            <div className="flex justify-between text-[13px] text-gray-700">
                                                <p>{current.snippet.channelTitle}</p>
                                                <p>{<GetNew date={date} />}</p>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </>
                }
            </section>
            <section className={`w-full mt-5 ${error ? 'hidden' : 'block'}`}>
                <h1 className="font-[calibri] text-2xl font-medium">Recommended videos</h1>
                <div className="w-full flex flex-wrap justify-start">
                    {
                        recommendL ? <Loader /> : recommendR ? recommendR :
                            recommend.map((current, index) => {
                                const date = new Date(current.snippet.publishedAt)
                                return <div key={index} className="font-[calibri] m-3">
                                    <div className={`bg-center rounded-sm bg-cover h-40 w-68 flex items-end justify-end`}
                                        style={{ backgroundImage: `url(${current.snippet.thumbnails.medium.url})` }}
                                    >
                                        <span className="text-sm  text-white font-[calibri] bg-black/80 rounded-xs px-1 py-0 mb-1 mr-1">{current.time}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[15.5px]">{current.snippet.title.slice(0, 30) + '...'}</p>
                                        <div className="flex justify-between text-[13px] text-gray-700">
                                            <p>{current.snippet.channelTitle}</p>
                                            <p>{<GetNew date={date} />}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                    }

                </div>
            </section>
        </section>
    </>
}