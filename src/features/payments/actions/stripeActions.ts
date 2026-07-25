"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function chargeSavedCard(paymentMethodId: string, amount: number, userId: string, userEmail: string) {
  if (!paymentMethodId || !amount) {
    throw new Error("Payment Method ID and amount are required");
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "egp",
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        userId: userId,
        userEmail: userEmail,
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success`,
    });

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    };
  } catch (error: unknown) {
    console.error("Charge Saved Card Error:", error);
    throw new Error((error as Error).message);
  }
}

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "egp",
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export async function createSetupIntent(userId: string, email: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const existingCustomers = await stripe.customers.search({
      query: `metadata['userId']:'${userId}'`,
    });

    let customerId;

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: email || undefined,
        metadata: {
          userId: userId,
        },
      });
      customerId = newCustomer.id;
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ["card"],
      metadata: {
        userId: userId,
      },
    });

    return {
      clientSecret: setupIntent.client_secret,
    };
  } catch (error: unknown) {
    console.error("Setup Intent Error:", error);
    throw new Error((error as Error).message);
  }
}

export async function deletePaymentMethod(paymentMethodId: string) {
  if (!paymentMethodId) {
    throw new Error("Missing ID");
  }

  try {
    await stripe.paymentMethods.detach(paymentMethodId);
    return { success: true };
  } catch (stripeError: unknown) {
    if ((stripeError as Error).message?.includes("not attached to a customer")) {
      console.log("Card was not attached, proceeding to delete from DB...");
      return { success: true, message: "Card was already detached" };
    }

    if ((stripeError as any).code === "resource_missing") {
      return { success: true, message: "Card not found in Stripe" };
    }

    throw new Error((stripeError as Error).message || "Internal Server Error");
  }
}

export async function getPaymentMethod(paymentMethodId: string) {
  if (!paymentMethodId) {
    throw new Error("Payment Method ID is required");
  }

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    // Convert to a plain object as Stripe objects can have complex prototypes that don't serialize well in Server Actions
    return JSON.parse(JSON.stringify(paymentMethod));
  } catch (error: unknown) {
    console.error("Get Payment Method Error:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
