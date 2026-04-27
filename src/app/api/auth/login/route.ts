import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    await dbConnect();

    // Check DB for custom credentials first
    const dbSettings = await Setting.findOne({ key: "admin_creds" });
    const adminEmail = dbSettings?.value?.email || process.env.ADMIN_EMAIL;
    const adminPassword = dbSettings?.value?.password || process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان" },
        { status: 400 }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "بيانات الدخول غير صحيحة" },
        { status: 401 }
      );
    }

    const token = signToken({ email });

    const response = NextResponse.json(
      { success: true, message: "تم تسجيل الدخول بنجاح" },
      { status: 200 }
    );

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ في تسجيل الدخول" },
      { status: 500 }
    );
  }
}
