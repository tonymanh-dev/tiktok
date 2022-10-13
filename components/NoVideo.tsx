import React from 'react'
import { Video } from '../types'
import { NextPage } from 'next'

interface IProps {
  text: string
}

const NoVideo: NextPage<IProps> = () => {
  return <div>No video</div>
}

export default NoVideo
