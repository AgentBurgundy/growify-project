import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = "https://api.growify.ai/v1";

export async function POST(request: Request) {
  const credentials = await request.json();

  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }

    const data = await response.json();

    // Set the HTTP-only cookie
    const c = await cookies();
    c.set("auth_token", data.data.token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
