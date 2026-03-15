import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Save a blueprint
export async function POST(req) {
  try {
    const { access_token, answers, report, language } = await req.json();

    if (!access_token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${access_token}` } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("blueprints")
      .insert({
        user_id: user.id,
        answers,
        report,
        language: language || "en",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Blueprint save error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error("Blueprint save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Load blueprints for current user
export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ blueprints: [] });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ blueprints: [] });
    }

    const { data, error } = await supabase
      .from("blueprints")
      .select("id, answers, report, language, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Blueprint load error:", error);
      return NextResponse.json({ blueprints: [] });
    }

    return NextResponse.json({ blueprints: data || [] });
  } catch (err) {
    return NextResponse.json({ blueprints: [] });
  }
}
