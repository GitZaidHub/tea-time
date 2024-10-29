"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { fetchPayment, fetchUser, initiate } from "@/action/userAction";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: 0,
  });
  const [currentUser, setCurrentUser] = useState({});
  const [Payments, setPayments] = useState([]);
  const searchparams = useSearchParams();
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchparams.get("paymentdone") == "true") {
      toast.success("Payment Successful", {
        duration: 5000, // Duration in milliseconds, 5000ms = 5 seconds
      });
      // Delay navigation for the duration of the toast
      setTimeout(() => {
        router.push(`/${username}`);
      }, 7000); // Delay to match the toast duration
    }
  }, []);
  
  if (loading) {
    return (
      <div class="relative flex justify-center h-screen items-center">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full h-28 w-28"/>
</div>
  );
  }

  const getData = async () => {
    setLoading(true)

    let u = await fetchUser(username);
    setCurrentUser(u);
    let dbpayment = await fetchPayment(username);
    setPayments(dbpayment);
    setLoading(false)

  };
  

  const Pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Tea Time", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="cover w-full relative bg-red-300">
        <img
          className="object-cover w-full h-[350px]"
          src={currentUser.coverpic}
          alt="cover picture"
        />
        <div className="profile-pic absolute overflow-hidden left-[38%] md:left-[46%] bottom-[-43px] ">
          <img
            className="md:w-32 md:h-32 w-28 h-28  object-cover border-2 border-white rounded-full"
            src={currentUser.profilepic}
            alt="user photo"
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-1  flex-col">
        <div className="text-center text-lg  font-semibold  mt-[40px]">
          @{username}
        </div>
        <div className="text-center text-sm">
          Lets Help {username} to have a Tea
        </div>
        <div className="text-center text-slate-500 text-sm ">
          <span className="mr-3">● payments {Payments.length}</span>
          <span className="">
            ● raised ₹
            {Payments.reduce(
              (a, b) => a + (Number(b.amount) || 0),
              0
            ).toLocaleString("en-IN")}
          </span>
        </div>
        <div className="payments w-full flex md:flex-row flex-col text-black md:gap-0 gap-5 justify-around my-6 items-center">
          <div className="supporters bg-[#7adba4]  bg-opacity-55 md:w-[55%] px-6 py-4 w-[90%] md:h-[50vh] h-[60vh] my-4 rounded-lg custom-scrollbar shadow-lg">
            <h2 className="text-center text-2xl my-4 font-bold text-gray-800">
              Top 7 Supporters
            </h2>

            <ul className="flex flex-col justify-start items-start p-2   text-gray-700">
              {Payments.length > 0 ? (
                Payments.map((p, i) => {
                  return (
                    <li
                      key={i}
                      className=" flex gap-2 my-2 justify-center text-md items-center"
                    >
                      {session?.user?.image ? (
                        <img
                          className="rounded-full w-7"
                          src={session?.user?.image}
                          alt="user-avatar"
                        />
                      ) : (
                        <span>
                          <FaRegUserCircle className="h-7" />
                        </span>
                      )}
                      <span>
                        {p.name} <span className="font-bold">₹{p.amount}</span>{" "}
                        with message{" "}
                        <span className="font-thin">{p.message}</span>
                      </span>
                    </li>
                  );
                })
              ) : (
                <li className="text-xl font-semibold">
                  No Payments to Display
                </li>
              )}
            </ul>
          </div>

          <div className="make-payments  bg-[#7adba4] shadow-lg bg-opacity-55 rounded-lg px-5 py-3  md:w-[35%] w-[90%] md:h-[50vh] h-[60vh] ">
            <h2 className="text-center text-2xl my-4 font-bold text-gray-800 ">
              Make Payments
            </h2>
            <div className="flex  flex-col gap-3">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                className="w-full p-2 rounded-lg bg-white focus:ring-1 focus:ring-white "
                placeholder=" Name"
              />
              <input
                type="text"
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                className="w-full p-2 rounded-lg bg-white focus:ring-1 focus:ring-white "
                placeholder=" Message"
              />
              <input
                type="text"
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                className="w-full p-2 rounded-lg bg-white focus:ring-1 focus:ring-white "
                placeholder=" Amount"
              />
              <button
                onClick={() => Pay(Number.parseInt(paymentform.amount) * 100)}
                type="submit"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 5 ||
                  paymentform.amount < 2
                }
                className={`p-3 text-center  rounded-lg bg-slate-100 hover:bg-[#7adba4] w-1/4 hover:text-white hover:shadow-lg disabled:bg-slate-500  disabled:hover:bg-slate-800 disabled:cursor-not-allowed`}
              >
                Pay
              </button>
            </div>
            <div className="flex my-3 gap-2">
              <button
                onClick={() => Pay(Number.parseInt(500) * 100)}
                className="p-3 bg-slate-50 hover:bg-[#7adba4] hover:text-white rounded-lg hover:shadow-lg"
              >
                ₹500
              </button>
              <button
                onClick={() => Pay(Number.parseInt(1000 * 100))}
                className="p-3 bg-slate-50 hover:bg-[#7adba4] hover:text-white rounded-lg hover:shadow-lg"
              >
                ₹1000
              </button>
              <button
                onClick={() => Pay(Number.parseInt(5000 * 100))}
                className="p-3 bg-slate-50 hover:bg-[#7adba4] hover:text-white rounded-lg hover:shadow-lg"
              >
                ₹5000
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
