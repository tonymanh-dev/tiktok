import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Discover from './Discover'
import Footer from './Footer'
import SuggestedAccounts from './SuggestedAccounts'

const activeLink =
  'flex items-center gap-3 hover:bg-secondary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-primary rounded'

const normalLink =
  'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded'

const Sidebar = () => {
  const [isSidebar, setIsSidebar] = useState(true)
  const user = false
  const { pathname } = useRouter()

  return (
    <div className="">
      <div
        className="block lg:hidden m-2 ml-4 mt-3 text-xl "
        onClick={() => setIsSidebar((prev) => !prev)}
      >
        {isSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {isSidebar && (
        <div className="lg:w-400 w-20 flex flex-col justify-start mb-10 border-r border-neutral-800 lg:border-0 p-3">
          <div className="lg:border-b border-neutral-800 lg:pb-4">
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl text-center">
                  <AiFillHome />
                </p>
                <span className="hidden lg:block">For you</span>
              </div>
            </Link>
          </div>
          {!user && (
            <div className="px-2 py-4 hidden lg:block">
              <p>Log in to like and comment on videos</p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      className="cursor-pointer text-lg text-primary font-semibold px-5 py-2 border border-primary rounded-md outline-none w-full mt-3 hover:bg-secondary"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
