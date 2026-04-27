import dbConnect from "@/lib/mongodb";
export const dynamic = "force-dynamic";

import Setting from "@/models/Setting";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

async function getSettings() {
  try {
    await dbConnect();
    const settings = await Setting.find({});
    return settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {};
  }
}

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <HeroSection initialData={settings.hero} />
      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <ClientsSection />
      <ContactCTASection />
    </>
  );
}
