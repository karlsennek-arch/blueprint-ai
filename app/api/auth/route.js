import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { access_token } = await req.json();

    if (!access_token) {
      return NextResponse.json({ user: null, paid: false });
    }

    // Create a Supabase client with the user's access token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      }
    );

    // Verify the token and get user
    const { data: { user }, error: authErr } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ user: null, paid: false });
    }

    // Get profile with paid status
    const { data: profile } = await supabase
      .from("profiles")
      .select("paid, paid_at, email")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      paid: profile?.paid || false,
      paidAt: profile?.paid_at || null,
    });
  } catch (err) {
    console.error("Auth check error:", err);
    return NextResponse.json({ user: null, paid: false });
  }
}
