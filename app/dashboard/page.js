"use client";
import { React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { fetchUser, updateProfile } from "@/action/userAction";
import { toast, Toaster } from "react-hot-toast";

const Dashboard = () => {
  const { data: session } = useSession();
   const router = useRouter();
  const [form, setform] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [session, router]);

  const getData = async () => {
    try {
      let u = await fetchUser(session.user.name);
      setform(u);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      let response = await updateProfile(form, session.user.name, session.user.email);
      if (response.error) {
        toast.error(response.error); // Show the error message from the server
        return;
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred"); // Extract the error message
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className=" flex flex-col items-center justify-center    w-full">
        <h1 className="font-bold text-2xl my-4">Welcome To Dashboard</h1>
        <form className="md:w-[45%] w-[80%] " action={handleSubmit}>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              type="text"
              value={form.name ? form.name : ""}
              onChange={handleChange}
              id="name"
              name="name"
              className="p-2  bg-slate-200 rounded-lg border-1 border-gray-400"
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              type="text"
              value={form.username ? form.username : ""}
              onChange={handleChange}
              id="username"
              name="username"
              className={`p-2  bg-slate-200 rounded-lg border-1 border-gray-400 ${form.username.length>1?"cursor-not-allowed":""} `}
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              type="text"
              value={form.email ? form.email : ""}
              onChange={handleChange}
              id="email"
              name="email"
              className={`p-2  bg-slate-200 rounded-lg border-1 border-gray-400 ${form.email.length>1?"cursor-not-allowed":""} `}
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="profilepic" className="">
              Profile Pic
            </label>
            <input
              type="text"
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              id="profilepic"
              name="profilepic"
              className="p-2  bg-slate-200 rounded-lg border-1 border-gray-400"
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="coverpic" className="">
              Cover Pic
            </label>
            <input
              type="text"
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              id="coverpic"
              name="coverpic"
              className="p-2  bg-slate-200 rounded-lg border-1 border-gray-400"
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="razorpayId" className="">
              RazorPay Id
            </label>
            <input
              type="text"
              value={form.razorpayId ? form.razorpayId : ""}
              onChange={handleChange}
              id="razorpayId"
              name="razorpayId"
              required
              className="p-2  bg-slate-200 rounded-lg border-1 border-gray-400"
            />
          </div>
          <div className="flex flex-col my-2 w-full">
            <label htmlFor="razorpaySecret" className="">
              RazorPay Secret
            </label>
            <input
              type="password"
              value={form.razorpaySecret ? form.razorpaySecret : ""}
              onChange={handleChange}
              id="razorpaySecret"
              name="razorpaySecret"
              required
              className="p-2  bg-slate-200 rounded-lg border-1 border-gray-400"
            />
          </div>
          <button
            className="text-black hover:text-white border mb-10 border-gray-800 hover:bg-gray-900 my-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-600"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
