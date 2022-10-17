import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'

import logo from '../utils/logo.svg'

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>()
  const { userProfile, addUser, removeUser } = useAuthStore()

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  return (
    <div className="w-full flex justify-between items-center border-b border-neutral-800 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="tiktok"
            // Layout="responsive"
          />
        </div>
      </Link>

      <div>Search</div>

      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center justify-between gap-1 py-2 px-4 border border-neutral-800 rounded-full cursor-pointer hover:bg-secondary">
                <IoMdAdd className="text-2xl" />
                <span>Upload</span>
              </button>
            </Link>

            {user?.image && (
              <Link href="/">
                <Image
                  alt=""
                  width={40}
                  height={40}
                  src={user?.image}
                  className="rounded-full"
                />
              </Link>
            )}
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout className="text-2xl text-muted-light" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => {}}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
