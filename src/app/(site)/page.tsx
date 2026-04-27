import dbConnect from "@/lib/mongodb";
import Setting from "@/models/Setting";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import ContactCTASection from "@/components/sections/ContactCTASection";

async function getSettings() {
  await dbConnect();
  const settings = await Setting.find({});
  return settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
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
