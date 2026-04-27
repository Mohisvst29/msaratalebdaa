import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const partners = await Partner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: partners });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const partner = await Partner.create(body);
    return NextResponse.json({ success: true, data: partner });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
