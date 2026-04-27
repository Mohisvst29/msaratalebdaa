import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 400 });
  }
}
