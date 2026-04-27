import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update project" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete project" }, { status: 400 });
  }
}
