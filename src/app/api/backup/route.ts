import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Partner from "@/models/Partner";
import Setting from "@/models/Setting";

export async function GET() {
  try {
    await connectDB();
    
    const [products, services, projects, partners, settings] = await Promise.all([
      Product.find({}),
      Service.find({}),
      Project.find({}),
      Partner.find({}),
      Setting.find({})
    ]);
    
    const backupData = {
      timestamp: new Date().toISOString(),
      version: "1.0",
      data: {
        products,
        services,
        projects,
        partners,
        settings
      }
    };
    
    return NextResponse.json({ success: true, backup: backupData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { backup } = await req.json();
    
    if (!backup || !backup.data || !backup.version) {
      return NextResponse.json({ success: false, error: "ملف النسخة الاحتياطية غير صالح" }, { status: 400 });
    }

    const { products, services, projects, partners, settings } = backup.data;

    // Restore Products
    if (products && Array.isArray(products)) {
      await Product.deleteMany({});
      if (products.length > 0) await Product.insertMany(products);
    }
    
    // Restore Services
    if (services && Array.isArray(services)) {
      await Service.deleteMany({});
      if (services.length > 0) await Service.insertMany(services);
    }
    
    // Restore Projects
    if (projects && Array.isArray(projects)) {
      await Project.deleteMany({});
      if (projects.length > 0) await Project.insertMany(projects);
    }
    
    // Restore Partners
    if (partners && Array.isArray(partners)) {
      await Partner.deleteMany({});
      if (partners.length > 0) await Partner.insertMany(partners);
    }
    
    // Restore Settings
    if (settings && Array.isArray(settings)) {
      await Setting.deleteMany({});
      if (settings.length > 0) await Setting.insertMany(settings);
    }

    return NextResponse.json({ success: true, message: "تم استعادة النسخة الاحتياطية بنجاح" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
