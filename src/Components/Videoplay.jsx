import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"
import { videos } from "../App"
const relatedV = videos.slice(0, 5)
const recommended = videos.slice(0, 15)
export default function Videoplay() {
    return <>
        <Navbar />
        <Sidebar />
        <section id="main_content" className=" ml-18 mt-18 flex justify-center flex-col">
            <section id="video-container" className="w-[98%] flex items-center">
                <div className="w-[950px] h-[400px]">
                    <video src="/src/assets/video.mp4" className="w-full h-full" controls={true}></video>
                </div>
                <div className="flex flex-wrap overflow-x-hidden overflow-y-auto h-[400px] w-2xl justify-center">
                    {
                        relatedV.map((current, index) => {
                            return <div key={index} className="font-[calibri] m-3">
                                <div className={`bg-[url('${current.img}')] bg-center rounded-sm bg-cover h-39 w-54 flex items-end justify-end`}>
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
                </div>
            </section>
            <section className="w-full mt-5">
                <h1 className="font-[calibri] text-2xl font-medium">Recommended videos</h1>
                <div className="w-full flex flex-wrap justify-start">
                    {
                        recommended.map((current, index) => {
                            return <div key={index} className="font-[calibri] m-3">
                                <div className={`bg-[url('${current.img}')] bg-center rounded-sm bg-cover h-40 w-68 flex items-end justify-end`}>
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
                </div>
            </section>
        </section>
    </>
}