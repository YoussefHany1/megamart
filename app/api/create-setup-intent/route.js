import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { userId, email } = await request.json(); // يفضل تمرير الإيميل لو متاح

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // 1. البحث عن عميل موجود بالفعل في Stripe بنفس الـ userId
    // نستخدم search للبحث داخل الـ metadata
    const existingCustomers = await stripe.customers.search({
      query: `metadata['userId']:'${userId}'`,
    });

    let customerId;

    if (existingCustomers.data.length > 0) {
      // لو العميل موجود، نستخدم الـ ID بتاعه
      customerId = existingCustomers.data[0].id;
    } else {
      // لو مش موجود، ننشئ عميل جديد
      const newCustomer = await stripe.customers.create({
        email: email || undefined, // اختياري
        metadata: {
          userId: userId, // ده عشان نعرف نلاقيه المرة الجاية
        },
      });
      customerId = newCustomer.id;
    }

    // 2. إنشاء Setup Intent مع ربطه بالـ Customer
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId, // <--- 🚨 هذا هو السطر الناقص سابقاً وهو حل المشكلة
      payment_method_types: ["card"],
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (error) {
    console.error("Setup Intent Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
