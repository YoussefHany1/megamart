import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { paymentMethodId } = body;

    if (!paymentMethodId) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    // محاولة فصل البطاقة
    try {
      await stripe.paymentMethods.detach(paymentMethodId);
    } catch (stripeError) {
      // 💡 الحل السحري هنا
      // لو الخطأ بيقول إن البطاقة مش مرتبطة بعميل، نعتبرها اتحذفت ونكمل عادي
      if (stripeError.message.includes("not attached to a customer")) {
        console.log("Card was not attached, proceeding to delete from DB...");
        return NextResponse.json({
          success: true,
          message: "Card was already detached",
        });
      }

      // لو الخطأ إن البطاقة مش موجودة أصلاً (ممسوحة قبل كده)
      if (stripeError.code === "resource_missing") {
        return NextResponse.json({
          success: true,
          message: "Card not found in Stripe",
        });
      }

      // لو أي خطأ تاني، نرجعه
      throw stripeError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
