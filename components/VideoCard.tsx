import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

import { Video } from '../types'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
}) => {
  const [isHover, setIsHover] = useState(true)
  const [isPlay, setIsPlay] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideo = () => {
    if (isPlay) {
      videoRef?.current?.pause()
      setIsPlay(false)
    } else {
      videoRef?.current?.play()
      setIsPlay(true)
    }
  }

  return (
    <div className="flex flex-col border-b border-neutral-800 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold">
          <div className="md:w-12 md:h-12 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={40}
                  height={40}
                  src={postedBy.image}
                  className="rounded-full"
                  layout="responsive"
                  alt="profile"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center">
                <p className="text-secondary-light mr-2">{postedBy.userName}</p>
                <GoVerified className="text-blue-400" />
                <p className="hidden sm:block text-muted-light text-xs ml-2">
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href="/">
              <p className="text-primary-light text-sm mt-2 font-normal">
                {caption}
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 py-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl relative"
        >
          <Link href={`/detail/${_id}`}>
            <video
              ref={videoRef}
              loop
              muted={isMuted ? true : false}
              className="h-[400px] w-[300px] sm:[h-400px] sm:w-[600px] rounded-2xl cursor-pointer bg-secondary-dark"
              src={video.asset.url}
            ></video>
          </Link>

          {isHover ? (
            <div className="absolute bottom-4 px-8 flex justify-between w-full">
              {isPlay ? (
                <button onClick={onVideo}>
                  <BsPauseFill className="text-2xl lg:text-3xl" />
                </button>
              ) : (
                <button onClick={onVideo}>
                  <BsFillPlayFill className="text-2xl lg:text-3xl" />
                </button>
              )}
              <button onClick={() => setIsMuted((prev) => !prev)}>
                {isMuted ? (
                  <HiVolumeOff className="text-xl lg:text-2xl" />
                ) : (
                  <HiVolumeUp className="text-xl lg:text-2xl" />
                )}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
