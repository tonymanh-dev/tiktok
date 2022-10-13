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
  return (
    <div className="flex flex-col border-b border-neutral-800 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
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

      <div className="lg:ml-20 flex gap-4 relative">
        <div className="rounded-3xl">
          <Link href="/">
            <video
              loop
              className="h-[300px] w-[200px] md:[h-400px] lg:h-[600px lg:w-[360px] rounded-2xl cursor-pointer bg-secondary-dark"
              src={video.asset.url}
            ></video>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
