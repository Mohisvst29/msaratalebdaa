import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Service from "@/models/Service";
import Setting from "@/models/Setting";
import { getTranslations } from "@/lib/i18n";

export async function GET() {
  try {
    await dbConnect();
    const ar = getTranslations("ar");
    const en = getTranslations("en");

    // Seed Settings
    const heroSettings = {
      title: ar["hero.title"],
      titleEn: en["hero.title"],
      subtitle: ar["hero.subtitle"],
      subtitleEn: en["hero.subtitle"],
      description: ar["hero.description"],
      descriptionEn: en["hero.description"],
    };
    await Setting.findOneAndUpdate({ key: "hero" }, { value: heroSettings }, { upsert: true });

    const aboutSettings = {
      story: ar["about.story"],
      storyEn: en["about.story"],
      storyText: ar["about.story.text"],
      storyTextEn: en["about.story.text"],
      vision: ar["about.vision"],
      visionEn: en["about.vision"],
      visionText: ar["about.vision.text"],
      visionTextEn: en["about.vision.text"],
    };
    await Setting.findOneAndUpdate({ key: "about" }, { value: aboutSettings }, { upsert: true });

    const contactSettings = {
      ctaTitle: ar["contact.cta.title"],
      ctaTitleEn: en["contact.cta.title"],
      ctaSubtitle: ar["contact.cta.subtitle"],
      ctaSubtitleEn: en["contact.cta.subtitle"],
    };
    await Setting.findOneAndUpdate({ key: "contact" }, { value: contactSettings }, { upsert: true });

    // Seed Services if empty
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const sampleServices = [
        {
          title: ar["services.parking"],
          titleEn: en["services.parking"],
          description: ar["services.parking.desc"],
          descriptionEn: en["services.parking.desc"],
          image: "/images/hero-bg.png"
        },
        {
          title: ar["services.interlock"],
          titleEn: en["services.interlock"],
          description: ar["services.interlock.desc"],
          descriptionEn: en["services.interlock.desc"],
          image: "/images/hero-bg.png"
        }
      ];
      await Service.create(sampleServices);
    }

    // Seed Products if empty
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const sampleProducts = [
        {
          name: ar["product.manholes_sewage"],
          nameEn: en["product.manholes_sewage"],
          description: "مناهل خرسانية عالية الجودة",
          descriptionEn: "High quality concrete manholes",
          image: "/images/hero-bg.png",
          category: "مناهل",
          categoryEn: "Manholes"
        }
      ];
      await Product.create(sampleProducts);
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
