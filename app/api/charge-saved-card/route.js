import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { paymentMethodId, amount, userId, userEmail } = await request.json();

    if (!paymentMethodId || !amount) {
      return NextResponse.json(
        { error: "Payment Method ID and amount are required" },
        { status: 400 },
      );
    }

    // إنشاء Payment Intent مع البطاقة المحفوظة
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // تحويل إلى قروش
      currency: "egp",
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        userId: userId,
        userEmail: userEmail,
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success`,
    });

    return NextResponse.json({
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Charge Saved Card Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
