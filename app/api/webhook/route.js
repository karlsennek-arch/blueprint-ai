import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const sessionId = session.id;
    const customerId = session.customer;

    if (!customerEmail) {
      console.error("No email in checkout session");
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Find the user profile by email
    const { data: profile, error: findErr } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", customerEmail.toLowerCase())
      .single();

    if (findErr || !profile) {
      // User might not have an account yet (edge case: paid without signing up)
      // Create a placeholder — they'll claim it when they sign up with this email
      console.warn("No profile found for", customerEmail, "— will match on login");
      
      // Try to update by email in case profile exists with different casing
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({
          paid: true,
          stripe_customer_id: customerId,
          stripe_session_id: sessionId,
          paid_at: new Date().toISOString(),
        })
        .eq("email", customerEmail.toLowerCase());

      if (updateErr) {
        console.error("Failed to update profile:", updateErr);
      }
    } else {
      // Update the user's paid status
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({
          paid: true,
          stripe_customer_id: customerId,
          stripe_session_id: sessionId,
          paid_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateErr) {
        console.error("Failed to update profile:", updateErr);
      } else {
        console.log("✅ User marked as paid:", customerEmail);
      }
    }
  }

  return NextResponse.json({ received: true });
}
