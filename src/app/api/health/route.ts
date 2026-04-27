import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const status: any = {
    mongodb: "unknown",
    cloudinary: "unknown",
  };

  try {
    await dbConnect();
    status.mongodb = "connected";
  } catch (err: any) {
    status.mongodb = `error: ${err.message}`;
  }

  try {
    const config = cloudinary.config();
    if (config.cloud_name && config.api_key) {
      status.cloudinary = "configured";
    } else {
      status.cloudinary = "missing credentials";
    }
  } catch (err: any) {
    status.cloudinary = `error: ${err.message}`;
  }

  return NextResponse.json(status);
}
