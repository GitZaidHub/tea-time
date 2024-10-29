"use client";
import Link from "next/link";
import {React,useState,useEffect} from "react";
import { SiCoffeescript } from "react-icons/si";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";
import { fetchUser } from "@/action/userAction";

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropDown, setShowDropDown] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    getData();
  }, [session]);

  const getData = async()=>{
    try {
      const u = await fetchUser(session?.user?.name)
      setCurrentUser(u)
    } catch (error) {
    }
  }

  return (
    <div className="">
      <header className="text-gray-600  bg-gray-200  body-font">
        <div className="container mx-auto flex flex-wrap px-5 py-3 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <SiCoffeescript />
            <span className="ml-3 text-xl">Tea Time</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {/*<Link href={"/"} className="mr-5 hover:text-gray-900">Home</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-900">About</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-900">Projects</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-900">Login</Link>
            <Link href={"/"} className="mr-5 hover:text-gray-900">Logout</Link>*/}
            <div className="flex justify-center gap-3 items-center">
              {session && (
                <>
                  <button
                  onClick={()=>setShowDropDown(!showDropDown)}
                  onBlur={()=>setTimeout(() => {
                    setShowDropDown(false)
                  }, 300)}
                    id="dropdownUserAvatarButton"
                    data-dropdown-toggle="dropdownAvatar"
                    className="flex text-sm  rounded-full md:me-0 focus:right-1 focus:to-black "
                    type="button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-11 h-11 object-cover rounded-full"
                      src={currentUser.profilepic}
                      alt="user photo"
                    />
                  </button>

                  <div
                    id="dropdownAvatar"
                    className={`z-10 absolute top-16 right-12 bg-white divide-y ${showDropDown ? "":"hidden"} divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`
                  }>
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>{session.user.email.split('@')[0]}</div>
                      
                    </div>
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      <li>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${session.user.name}`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Your Page
                        </Link>
                      </li>
                      
                    </ul>
                    <div   className="py-2 flex w-full justify-center dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 hover:bg-gray-100 items-center">
                      <button
                       onClick={() => signOut()}
                        className="block px-4 py-2 text-sm text-white  "
                      >
                        Sign out 
                      </button>
                      <p onClick={() => signOut()} className="text-white cursor-pointer"><IoLogOutOutline/></p>
                    </div>
                  </div>
                </>
              )}
              
              

              {!session && (
                <Link
                  href={"/login"}
                  className=" hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 "
                >
                  LogIn
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
