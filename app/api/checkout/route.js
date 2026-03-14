import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1TAy5fPT5iBkgnrIfsvo9Qph",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: process.env.NEXT_PUBLIC_URL + "?success=true",
    cancel_url: process.env.NEXT_PUBLIC_URL + "?canceled=true",
  });

  return NextResponse.json({ url: session.url });
}