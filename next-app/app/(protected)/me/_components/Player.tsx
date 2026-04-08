
"use client"
import { useEffect, useState } from "react"
import ReactPLayer from "react-player"

export function Player() {
  const videoUrl = "https://www.youtube.com/watch?v=5dDFG1cSyZ8"
  const [videoData, setVideoData] = useState<{ title: string; thumbnail_url: string } | null>(null)
  const [muted, setMuted] = useState<boolean>(true)
  const [hasUserMuted, setHasUserMuted] = useState<boolean>(false)


  useEffect(() => {
    async function fetchtestData() {

      const response = await fetch("https://www.youtube.com/oembed?url=https://youtu.be/cqL3jvlU61c?si=mcEty4l-epVvWJcr")
      const data = await response.json()

      setVideoData({
        title: data.title,
        thumbnail_url: data.thumbnail_url
      })
    }
    fetchtestData()
  }, [])


  const handleMuted = () => {
    setMuted(false)
    setHasUserMuted(true)
  }

  return (

    <div className="pl-10">
      <>THis is a test video </>
      < ReactPLayer

        src={videoUrl}
        playing={true}
        width={900}
        height={600}
        muted={muted}
        controls={true}


        config={{
          youtube: {
            cc_load_policy: 0,
            rel: 0,
          }
        }}

      />
      {muted && (

        <button onClick={handleMuted}
          className="bg-red-300 p-5">
          Unmute
        </button>
      )}
      <>{videoData?.title}</>
      <img src={videoData?.thumbnail_url} />
    </div>
  )
}

