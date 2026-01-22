import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { paymentMethodId } = await request.json();

    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Payment Method ID is required" },
        { status: 400 },
      );
    }

    // جلب تفاصيل البطاقة من Stripe
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    return NextResponse.json(paymentMethod);
  } catch (error) {
    console.error("Get Payment Method Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
