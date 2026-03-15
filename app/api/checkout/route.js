import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let email = null;
  try {
    const body = await req.json();
    email = body.email || null;
  } catch {}

  const sessionConfig = {
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1TAy5fPT5iBkgnrIfsvo9Qph",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: (process.env.NEXT_PUBLIC_URL || "https://ventrixai.com") + "/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: (process.env.NEXT_PUBLIC_URL || "https://ventrixai.com"),
  };

  // Pre-fill email if we have it (from logged-in user)
  if (email) {
    sessionConfig.customer_email = email;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  return NextResponse.json({ url: session.url });
}
