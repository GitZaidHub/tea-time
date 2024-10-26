"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { SiCoffeescript } from "react-icons/si";



export default function Home() {
  const {data:session} = useSession();
  console.log("session",session)
  
  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <div >
    <div className="flex items-center justify-center flex-col h-[40vh] pt-5  rounded-lg shadow-sm">
  <div className="flex items-center text-3xl font-semibold gap-2 text-gray-800 mb-2">
    <SiCoffeescript className="text-5xl" />
    <span className="text-4xl">Tea Time</span>
  </div>
  
  <small className="text-gray-600 font-normal text-sm mb-4">
    Time to take a break and support your favorite creator
  </small>
  
  {session && (
    <p className="text-lg font-medium text-gray-700 mb-4">
      Hey, {session.user.name}!
    </p>
  )}

  <div className="flex gap-4">
    {session ? (
      <>
        <Link
          href="/users"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 transition duration-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          Creators
        </Link>
        <Link
          href={`/${session.user.name}`}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 transition duration-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          My Page
        </Link>
      </>
    ) : (
      <>
        <Link
          href="/login"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 transition duration-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          Get Started
        </Link>
        <Link
          href="/about"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 transition duration-200 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          Learn More
        </Link>
      </>
    )}
  </div>
</div>

      <div className="h-[1px] mx-3 opacity-35 bg-black"></div>
      <div className="flex flex-col container mx-auto md:h-[40vh] my-8 p-6  rounded-lg ">
  <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Your Fans Can Fund You</h1>

  <div className="flex flex-col md:flex-row items-center justify-around gap-8">
    {/* Fan Support Card 1 */}
    <div className="flex flex-col items-center text-center">
      <img 
        className="rounded-full w-28 h-28 border-4 border-gray-200 shadow-lg mb-4" 
        src="https://cdn.pixabay.com/photo/2015/10/16/19/18/balloon-991680_1280.jpg" 
        alt="Fan support" 
      />
      <span className="text-lg font-medium text-gray-700">Show Your Love</span>
      <span className="text-sm text-gray-500">Support us with a small donation</span>
    </div>

    {/* Fan Support Card 2 */}
    <div className="flex flex-col items-center text-center">
      <img 
        className="rounded-full w-28 h-28 border-4 border-gray-200 shadow-lg mb-4" 
        src="https://cdn.pixabay.com/photo/2016/10/26/16/45/rock-1771913_960_720.jpg" 
        alt="Fan support" 
      />
      <span className="text-lg font-medium text-gray-700">Help Us Grow</span>
      <span className="text-sm text-gray-500">Your support fuels our content</span>
    </div>

    {/* Fan Support Card 3 */}
    <div className="flex flex-col items-center text-center">
      <img 
        className="rounded-full w-28 h-28 border-4 border-gray-200 shadow-lg mb-4" 
        src="https://cdn.pixabay.com/photo/2018/06/29/09/51/business-3505614_1280.jpg" 
        alt="Fan support" 
      />
      <span className="text-lg font-medium text-gray-700">Become a Partner</span>
      <span className="text-sm text-gray-500">Join our community of supporters</span>
    </div>
  </div>
</div>


      <div className="h-[1px] mx-3 opacity-35 bg-black"></div>
      <div className="flex items-center justify-center flex-col gap-6 my-6">
        <h1 className="text-xl font-semibold">Know About Us</h1>
        <div className="max-w-[50vw] mx-3 flex items-center justify-center ">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/lXGudN_8ZJA?si=mLMpsr5PaHL9agsN" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
    </>

  );
}
