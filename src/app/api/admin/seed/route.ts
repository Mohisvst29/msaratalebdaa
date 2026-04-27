import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import Product from "@/models/Product";
import Setting from "@/models/Setting";

export const dynamic = "force-dynamic";

const servicesData = [
  {
    title: "تركيب وتخطيط مواقف السيارات",
    titleEn: "Parking Layout & Installation",
    description: "نقدم خدمات متكاملة لتخطيط وتنفيذ مواقف السيارات وفق أعلى المعايير الهندسية لضمان الاستخدام الأمثل للمساحات.",
    descriptionEn: "We provide complete parking layout and installation services based on engineering standards.",
  },
  {
    title: "تركيب وصيانة البلدورة والإنترلوك",
    titleEn: "Curbstone & Interlock Installation",
    description: "تنفيذ وتركيب أعمال البلدورة والإنترلوك بدقة عالية مع خدمات الصيانة.",
    descriptionEn: "We install curbstone and interlock works with high precision and maintenance support.",
  },
  {
    title: "أعمال صيانة وأسفلت الطرق",
    titleEn: "Road Asphalt & Maintenance",
    description: "نوفر خدمات صيانة الطرق وإعادة السفلتة باستخدام مواد عالية الجودة.",
    descriptionEn: "We provide road maintenance and asphalt paving using high-quality materials.",
  },
  {
    title: "أعمال البنية التحتية الخرسانية",
    titleEn: "Concrete Infrastructure Works",
    description: "تنفيذ مشاريع البنية التحتية الخرسانية وفق المعايير الهندسية.",
    descriptionEn: "Execution of concrete infrastructure projects with engineering standards.",
  },
  {
    title: "تجهيز الحدائق والمتنزهات",
    titleEn: "Landscaping & Parks تجهيز",
    description: "تجهيز الحدائق باستخدام منتجات خرسانية عالية الجودة.",
    descriptionEn: "Landscaping solutions using high-quality concrete products.",
  }
];

const productsData = [
  {
    name: "مناهل الصرف الصحي",
    nameEn: "Sewage Manholes",
    description: "مناهيل خرسانية مسبقة الصنع تتحمل الأحمال الثقيلة.",
    descriptionEn: "Precast concrete manholes for heavy-duty sewage systems.",
    category: "Infrastructure",
    categoryEn: "Infrastructure"
  },
  {
    name: "مناهل الكهرباء",
    nameEn: "Electrical Manholes",
    description: "مناهيل مخصصة لشبكات الكهرباء والاتصالات.",
    descriptionEn: "Manholes for electrical and telecom networks.",
    category: "Infrastructure",
    categoryEn: "Infrastructure"
  },
  {
    name: "قواعد خرسانية",
    nameEn: "Concrete Bases",
    description: "قواعد خرسانية لدعم المنشآت والمعدات.",
    descriptionEn: "Reinforced concrete bases for structural support.",
    category: "Infrastructure",
    categoryEn: "Infrastructure"
  },
  {
    name: "أغطية مناهل زهر",
    nameEn: "Cast Iron Covers",
    description: "أغطية قوية تتحمل الأحمال العالية.",
    descriptionEn: "Heavy-duty cast iron covers.",
    category: "Accessories",
    categoryEn: "Accessories"
  },
  {
    name: "كراسي حدائق",
    nameEn: "Concrete Benches",
    description: "كراسي خرسانية بتصميمات حديثة.",
    descriptionEn: "Modern concrete benches for outdoor spaces.",
    category: "Landscaping",
    categoryEn: "Landscaping"
  },
  {
    name: "أحواض زهور",
    nameEn: "Flower Pots",
    description: "أحواض زهور خرسانية لمشاريع التجميل.",
    descriptionEn: "Concrete flower pots for landscaping.",
    category: "Landscaping",
    categoryEn: "Landscaping"
  },
  {
    name: "مصدات مواقف",
    nameEn: "Wheel Stoppers",
    description: "مصدات لتنظيم مواقف السيارات.",
    descriptionEn: "Parking wheel stoppers.",
    category: "Traffic Safety",
    categoryEn: "Traffic Safety"
  },
  {
    name: "بلدورات",
    nameEn: "Curbstones",
    description: "بلدورات خرسانية لتنظيم الطرق.",
    descriptionEn: "Concrete curbstones.",
    category: "Roads",
    categoryEn: "Roads"
  },
  {
    name: "إنترلوك",
    nameEn: "Interlock",
    description: "بلاط إنترلوك عالي الجودة.",
    descriptionEn: "High-quality interlock paving.",
    category: "Roads",
    categoryEn: "Roads"
  },
  {
    name: "حواجز طرق",
    nameEn: "Road Barriers",
    description: "حواجز خرسانية للطرق.",
    descriptionEn: "Concrete road barriers.",
    category: "Traffic Safety",
    categoryEn: "Traffic Safety"
  }
];

export async function GET() {
  try {
    await dbConnect();

    // Seed Services
    for (const service of servicesData) {
      await Service.findOneAndUpdate(
        { title: service.title },
        { $setOnInsert: service },
        { upsert: true }
      );
    }

    // Seed Products
    for (const product of productsData) {
      await Product.findOneAndUpdate(
        { name: product.name },
        { $setOnInsert: product },
        { upsert: true }
      );
    }

    // Seed Default Settings if they don't exist
    const defaultSettings = [
      { key: "logo", value: { companyName: "مسارات الإبداع", companyNameEn: "Masarat Al Ibdaa", size: 150, fontFamily: "Tajawal", primaryColor: "#00AEEF" } },
      { key: "hero_bg", value: "/images/hero-bg.png" },
      { key: "services_bg", value: "" },
      { key: "products_bg", value: "" },
      { key: "contact_bg", value: "" },
      { key: "contact_info", value: { email: "info@masarat.com", phone1: "966507655173", addressAr: "المملكة العربية السعودية" } }
    ];

    for (const setting of defaultSettings) {
      await Setting.findOneAndUpdate(
        { key: setting.key },
        { $setOnInsert: setting },
        { upsert: true }
      );
    }

    // Seed Admin Credentials (if not exists)
    await Setting.findOneAndUpdate(
      { key: "admin_creds" },
      { 
        $set: { 
          value: { 
            email: "admin@masarat.com", 
            password: "masarat2030" 
          } 
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully with services, products, and admin credentials" 
    });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
