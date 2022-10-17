import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { FiMessageSquare, FiShare } from 'react-icons/fi'
import { IoSend } from 'react-icons/io5'

import { BASE_URL } from '../../utils'
import { Video } from '../../types'

const Detail = ({ postDetails }: { postDetails: Video }) => {
  const [post, setPost] = useState(postDetails)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')

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

  if (!post) return null

  return (
    <div className="w-full absolute top-[65px] left-0 bottom-0 bg-primary-dark overflow-hidden">
      {post && (
        <div className="grid grid-cols-1 md:grid-cols-3 h-[90vh]">
          <div className="w-full span-cols-1 md:col-span-2 flex justify-center items-center relative cursor-pointer">
            <video
              ref={videoRef}
              loop
              onClick={onVideo}
              muted={isMuted}
              src={post.video.asset.url}
              className="w-[80%] h-[400px]"
            />
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

          <div className="flex flex-col justify-start py-10 px-4 bg-secondary-dark">
            <div className="flex gap-3 font-semibold">
              <div className="md:w-12 md:h-12 w-10 h-10">
                <Link href="/">
                  <>
                    <Image
                      width={40}
                      height={40}
                      src={post.postedBy.image}
                      className="rounded-full"
                      layout="responsive"
                      alt="profile"
                    />
                  </>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <div className="flex flex-col justify-start ">
                    <div className="flex items-center ">
                      <p className="text-secondary-light mr-2">
                        {post.postedBy.userName}
                      </p>
                      <GoVerified className="text-blue-400" />
                    </div>
                    <p className=" text-muted-light text-xs">
                      {`@${post.postedBy.userName}`}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="border-b border-b-neutral-800">
              <p className="text-primary-light text-sm my-4 font-normal">
                {post.caption}
              </p>
            </div>
            <div className="flex justify-between items-center gap-5 py-4 px-8 border-b border-b-neutral-800">
              {liked ? (
                <button className="text-md text-primary">
                  <BsHeartFill onClick={() => setLiked(false)} />
                </button>
              ) : (
                <button className="text-md hover:text-primary ">
                  <BsHeart onClick={() => setLiked(true)} />
                </button>
              )}
              <button className="text-md hover:text-blue-500">
                <FiMessageSquare />
              </button>
              <button className="text-md hover:text-green-600">
                <FiShare />
              </button>
            </div>
            <div>
              <form className="flex mt-4">
                <input
                  type="text"
                  className="w-full flex-1 py-2 px-4 bg-neutral-800 outline-0 rounded-lg border-0 focus:outline-2 focus:outline-neutral-700 focus:border-0"
                />
                <button className=" px-4 text-2xl hover:text-primary">
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data },
  }
}

export default Detail
