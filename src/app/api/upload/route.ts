import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const resource_type = (formData.get("resource_type") as string) || "auto";

    if (!file) {
      return NextResponse.json({ success: false, error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    console.log(`Attempting to upload ${file.name} to Cloudinary...`);

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "masarat_website",
      resource_type: resource_type as any,
    });

    return NextResponse.json({ 
      success: true,
      url: result.secure_url, 
      type: result.resource_type 
    });

  } catch (error: any) {
    console.error("Cloudinary Detailed Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "حدث خطأ غير متوقع أثناء الرفع",
      details: error
    }, { status: 500 });
  }
}
