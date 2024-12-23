import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);

  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }


  let user = await User.findOne({username:p.receiver})
  const secret = user.razorpaySecret;

  let xx = validatePaymentVerification(
    {
      "order_id": body.razorpay_order_id,
      "payment_id": body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (xx) {
    const updatePayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${updatePayment.receiver}?paymentdone=true`
    );
  }else{
    return NextResponse.json({success:false, message:"Payment Verification Failed"})  
  }
};
