import Link from 'next/link';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const Sidebar = () => {
    const [isSidebar, setIsSidebar] = useState(true)
    const user = false

    const normalLink = "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded"

    return (
        <div>
            <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" onClick={() => setIsSidebar((prev) => !prev)}>
            {isSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>
            {isSidebar && (
                <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-1 border-gray-100 xl:border-0 p-3">
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                        <Link href="/">
                            <div>
                                <p className="text-2xl">
                                    <AiFillHome />
                                </p>
                                <span className="text-xl hidden xl:block">For you</span>
                            </div>
                        </Link>
                    </div>
                    {!user && (
                        <div className="px-2 py-4 hidden xl:block">
                            <p>Log in to like and comment on videos</p>
                            <div className="pr-4">
                                <GoogleLogin
                                clientId=""
                                render={(renderProps) => (
                                    <button className="cursor-pointer bg-white text-lg text-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    >
                                        Log in
                                    </button>
                                )}

                                onSuccess={() => {}}
                                onFailure={()=> {}}
                                cookiePolicy="single_host_origin"
                                />
                            </div>
                        </div>
                    )}
                    
                </div>
            )}
        </div>
    )
}

export default Sidebar
