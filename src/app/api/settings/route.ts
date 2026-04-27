import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await dbConnect();
    const settings = await Setting.find({});
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return NextResponse.json({ success: true, data: settingsMap });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { key, value } = body;
    const setting = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
    return NextResponse.json({ success: true, data: setting });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
