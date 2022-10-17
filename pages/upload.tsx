import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [videoStore, setVideoStore] = useState<
    SanityAssetDocument | undefined
  >()
  const [fileError, setFileError] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState<String>(topics[0].name)
  const [post, setPost] = useState(false)

  const { userProfile }: { userProfile: any } = useAuthStore()
  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoStore(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setFileError(true)
    }
  }

  const handlePost = async () => {
    if (caption && videoStore && category) {
      setPost(true)

      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoStore?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
      }

      await axios.post(`${BASE_URL}/api/post`, document)

      router.push('/')
    }
  }

  const handleDiscard = () => {
    setPost(false)
    setVideoStore(undefined)
    setCaption('')
    setCategory('')
  }

  return (
    <div className="flex justify-center w-full h-full absolute top-[65px] left-0 bg-primary-dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-0 items-center justify-center pt-10 h-[80vh] ">
        <div className="flex flex-col items-start">
          <div className="flex flex-col justify-center md:justify-start">
            <p className="font-medium text-left">Upload Videos</p>
            <p className="text-xs text-muted-light">
              Post a video to your account
            </p>
          </div>

          <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-10 ">
            <div className="flex flex-col items-center lg:w-[300px] w-[360px] mt-8 rounded-lg  bg-secondary-dark outline-dashed outline-2 outline-neutral-600 hover:outline-red-400 ">
              {!videoStore ? (
                <label className="cursor-pointer w-full h-full p-6">
                  <div className="flex flex-col items-center gap-3">
                    <FaCloudUploadAlt className="text-4xl lg:text-6xl text-muted-light" />
                    <p className="font-semibold text-primary-light">
                      Upload video
                    </p>
                  </div>

                  <p className="mt-6 text-center text-muted-light text-xs leading-7">
                    MP4, WebM or OGG <br />
                    720x1280 or higher <br />
                    Up to 10 minutes <br />
                    Less than 2GB <br />
                  </p>
                  <p className="flex justify-center items-center bg-primary mt-14 px-4 py-2 rounded-full cursor-pointer hover:opacity-90">
                    Select file
                  </p>
                  <input
                    type="file"
                    name="upload-video"
                    className="w-0 h-0"
                    onChange={uploadVideo}
                  />
                </label>
              ) : (
                <div>
                  <video
                    controls
                    loop
                    src={videoStore?.url}
                    className="h-[400px] rounded bg-secondary-dark"
                  />
                </div>
              )}
            </div>
            {fileError && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[260px]">
                Please select an video file (mp4 or webm or ogg)
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start w-[360px] md:w-[400px] pb-20 lg:p-0">
          <label className="font-semibold text-secondary-light mb-2">
            Caption
          </label>
          <input
            type="text"
            onChange={(e) => setCaption(e.target.value)}
            className="bg-secondary-dark p-3 mb-6 rounded-lg outline-0 w-full"
          />

          <label className="font-semibold text-secondary-light mb-2">
            Choose a Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-primary-light bg-secondary-dark  capitalize p-4 rounded-lg cursor-pointer"
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className="outline-none capitalize p-2 pr-4 mr-4"
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex gap-8 w-full justify-between items-center mt-10">
            <button
              onClick={handleDiscard}
              className="w-full border border-neutral-800 hover:bg-secondary text-primary-light font-semibold bg-secondary-dark rounded-lg py-3 px-6"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              className="w-full border border-primary hover:opacity-90 text-primary-light font-semibold bg-primary rounded-lg py-3 px-6"
            >
              {post ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
