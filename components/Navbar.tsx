import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin } from 'react-google-login'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'

import logo from '../utils/logo.svg'

const Navbar = () => {
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
    </div>
  )
}

export default Navbar
