"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import React from "react";
import { Toaster } from "react-hot-toast";
import { Login } from "@/action/userAction";
import Link from "next/link";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);
  const togglePassword = ()=>{
    setIsVisible(!isVisible);
  }
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };
  const handleSubmit = async (e) => {
    /*try {
      const response = await Login(form);
      if (response.error) {
        toast.error(response.error); // Show the error message from the server
        return;
      }
      toast.success("Logged in ");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred"); // Extract the error message
      console.error("Error in login profile:", error);
    }*/
   toast.error("this function is not working")
  };

  return (
    <>
    <Toaster/>
    <section className=" min-h-screen flex flex-col justify-center items-center">
    <h1 className="flex items-center justify-center text-red-500"> Use google or github to login , email service is not availaible</h1>
      <div className="bg-[#e7e3e0] rounded-2xl flex max-w-3xl p-5 box-border shadow-xl">
        <div className="md:w-1/2 px-8">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-sm mt-4 text-[#002D74]">
            Don not have account. <Link className="text-blue-950 font-semibold" href={"/register"} >Register</Link>
          </p>

          <form action={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-[#002D74]"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              value={form.email ? form.email : ""}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring focus:ring-[#002D74]"
                type={isVisible?"text":"password"}
                name="password"
                id="password"
                required
                placeholder="Password"
                onChange={handleChange}
                value={form.password ? form.password : ""}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                onClick={togglePassword}
                id="togglePassword"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>
            </div>
            <button
              className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="mt-6 items-center text-gray-100">
            <hr className="border-gray-300" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-300" />
          </div>

          <button
            onClick={() => signIn("google")}
            className="bg-white border border-gray-300 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Login with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="bg-white border border-gray-300 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25px"
            >
              <path
                fill="#333"
                d="M12 0C5.373 0 0 5.373 0 12c0 5.305 3.438 9.8 8.207 11.387.6.111.82-.261.82-.58v-2.11c-3.338.724-4.043-1.607-4.043-1.607-.546-1.385-1.333-1.755-1.333-1.755-1.085-.743.082-.729.082-.729 1.205.085 1.838 1.235 1.838 1.235 1.068 1.831 2.803 1.301 3.487.995.108-.773.418-1.301.761-1.601-2.665-.304-5.467-1.334-5.467-5.935 0-1.313.467-2.39 1.236-3.232-.124-.304-.536-1.53.115-3.189 0 0 1.008-.323 3.301 1.23a11.5 11.5 0 0 1 3.003-.403c1.019.004 2.036.138 3.003.403 2.293-1.553 3.301-1.23 3.301-1.23.651 1.659.238 2.885.115 3.189.77.842 1.236 1.919 1.236 3.232 0 4.609-2.803 5.627-5.467 5.93.431.373.816 1.104.816 2.221v3.293c0 .322.218.694.825.58C20.563 21.8 24 17.305 24 12c0-6.627-5.373-12-12-12z"
              ></path>
            </svg>
            Login with GitHub
          </button>
        </div>
        <div className=" flex items-center justify-center w-1/2">
          <img
            className="rounded-2xl max-h-[600px] flex items-center justify-center object-cover"
            src="https://cdn.pixabay.com/animation/2024/09/09/14/14/14-14-48-336_512.gif"
            alt="Login GIF"
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default LoginPage;
