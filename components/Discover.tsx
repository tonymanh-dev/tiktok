import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'
import { useState } from 'react'

const active =
  'lg:border hover:bg-secondary lg:border-primary px-3 py-2 rounded-md lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-primary'
const normal =
  'lg:border hover:bg-secondary lg:border-neutral-800 px-3 py-2 rounded-md lg:rounded-full  flex items-center gap-2 justify-center cursor-pointer'

const Discover = () => {
  const router = useRouter()
  const { topic } = router.query

  console.log(topic)

  return (
    <div className="lg:border-b lg:border-neutral-800 pb-6 px-2">
      <p className="hidden lg:block mt-4 text-md">Popular Topics</p>
      <div className="flex justify-center lg:justify-start gap-3 flex-wrap mt-4">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? active : normal}>
              <span className="font-bold text-xl lg:text-lg">{item.icon}</span>
              <span className="hidden lg:block capitalize text-sm">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
