export type Locale = "ar" | "en";

export const defaultLocale: Locale = "ar";

export const locales: Locale[] = ["ar", "en"];

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const localeDirection: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

const translations = {
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.products": "منتجاتنا",
    "nav.projects": "مشاريعنا",
    "nav.contact": "تواصل معنا",
    "nav.admin": "لوحة التحكم",

    // Hero
    "hero.title": "مسارات الإبداع الرائدة",
    "hero.subtitle": "نحو رؤية مستقبلية لمشاريع أكثر قوة وجودة",
    "hero.description": "نقدم لك حلول خرسانية متكاملة تلبي احتياجات مشاريعك بأعلى معايير الجودة والسرعة.",
    "hero.cta.quote": "اطلب عرض سعر الآن",
    "hero.cta.contact": "تواصل معنا",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "حلول متكاملة لجميع أعمال الخرسانة والبنية التحتية",
    "services.parking": "تركيب وتخطيط مواقف السيارات",
    "services.parking.desc": "تنفيذ أعمال تخطيط وتركيب مواقف السيارات بأعلى معايير الدقة والترتيب لضمان الانسيابية والأمان.",
    "services.interlock": "تركيب وصيانة البلدورة والإنترلوك",
    "services.interlock.desc": "أعمال تركيب متكاملة للأرصفة والإنترلوك بمختلف التصاميم والألوان مع توفير خدمات الصيانة الدورية.",
    "services.asphalt": "أعمال صيانة وأسفلت الطرق والمواقف",
    "services.asphalt.desc": "تنفيذ وصيانة الأسفلت للطرق والمواقف بجودة عالية تتحمل الحمولات والأوزان الثقيلة.",
    "services.infrastructure": "تنفيذ أعمال البنية التحتية الخرسانية",
    "services.infrastructure.desc": "مشاريع بنية تحتية متكاملة تشمل المناهل، تمديدات الكهرباء، وشبكات الصرف الصحي.",
    "services.gardens": "تجهيز مشاريع الحدائق والمتنزهات",
    "services.gardens.desc": "توريد وتركيب الكراسي الخرسانية التجميلية، المصدات، وأحواض الزهور لإنشاء بيئة جمالية متكاملة.",

    // Products
    "products.title": "منتجاتنا",
    "products.subtitle": "تشكيلة واسعة من المنتجات الخرسانية مسبقة الصنع",
    "products.order": "اطلب المنتج",
    "products.viewAll": "عرض جميع المنتجات",
    
    // Product Items
    "product.manholes_sewage": "مناهل الصرف الصحي",
    "product.manholes_electric": "مناهل الكهرباء والاتصالات",
    "product.concrete_bases": "القواعد الخرسانية المسلحة",
    "product.cast_iron_covers": "أغطية المناهل الزهر",
    "product.drainage_covers": "أغطية الصرف (حمولات متوسطة وعالية)",
    "product.garden_benches": "كراسي حدائق خرسانية",
    "product.flower_pots": "أحواض زهور",
    "product.parking_barriers": "مصدات مواقف",
    "product.curbstones": "بلدورات",
    "product.interlock": "إنترلوك",
    "product.road_barriers": "حواجز طرق خرسانية",

    // Projects
    "projects.title": "صور من أعمالنا",
    "projects.subtitle": "نمتلك خبرة واسعة في تنفيذ المشاريع الخرسانية بمختلف أنواعها، وقد شاركنا في تنفيذ العديد من المشاريع التي تخدم البنية التحتية والمرافق العامة، مع الالتزام بأعلى معايير الجودة والدقة.",
    "projects.viewAll": "عرض جميع المشاريع",

    // Why Choose Us
    "why.title": "لماذا مسارات الإبداع؟",
    "why.subtitle": "نتميز بخبرة واسعة والتزام تام بأعلى معايير الجودة لضمان نجاح مشروعك",
    "why.credibility": "المصداقية",
    "why.credibility.desc": "نلتزم بوعودنا ومواثيقنا مع جميع عملائنا لضمان الشفافية المطلقة في العمل.",
    "why.speed_production": "سرعة الإنتاج",
    "why.speed_production.desc": "نعتمد على معدات حديثة تضمن إنتاج كميات ضخمة في وقت قياسي.",
    "why.quality": "الجودة العالية",
    "why.quality.desc": "مواد خام ممتازة واختبارات دقيقة لضمان قوة ومتانة منتجاتنا.",
    "why.speed_delivery": "سرعة التوريد",
    "why.speed_delivery.desc": "أسطول نقل مجهز لتوصيل المنتجات إلى موقع مشروعك في الموعد المحدد.",

    // Clients
    "clients.title": "جهات تشرفنا بخدمتها",
    "clients.subtitle": "نفتخر بالعمل مع نخبة من المؤسسات والشركات",

    // Contact
    "contact.title": "تواصل معنا",
    "contact.subtitle": "نحن جاهزون لخدمتكم وتلبية احتياجاتكم في جميع أعمال الخرسانة والبنية التحتية.",
    "contact.name": "الاسم",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "رقم الهاتف",
    "contact.message": "الرسالة",
    "contact.send": "إرسال",
    "contact.cta.title": "نحو رؤية مستقبلية لمشاريع أكثر قوة وجودة",
    "contact.cta.subtitle": "نقدم لك حلول خرسانية متكاملة تلبي احتياجات مشاريعك بأعلى معايير الجودة والسرعة.",
    
    // Contact Info Real Data
    "contact.address.label": "المقر الرئيسي",
    "contact.address.value": "الرياض، المملكة العربية السعودية",
    "contact.phone1.value": "050-7655173",
    "contact.phone2.value": "055-1885711",
    "contact.email.value": "Tarek2977@gmail.com",
    "contact.website.value": "www.masarat2030.com",

    // About
    "about.title": "من نحن",
    "about.subtitle": "شركة مسارات الإبداع الرائدة في مجال الخرسانة",
    "about.story": "من نحن",
    "about.story.text": "انطلقت شركة مسارات الإبداع الرائدة في مجال الخرسانة، وتخصصت في أعمال المنتجات الخرسانية مسبقة الصنع، ومقرها مدينة الرياض. تقدم الشركة حلولًا متكاملة في المنتجات الأسمنتية التي تخدم مشاريع البنية التحتية والمباني السكنية والمجمعات التجارية والمدارس والمباني الحكومية. كما توفر الشركة مستلزمات الحدائق مثل الكراسي الخرسانية التجميلية، المصدات، أحواض الزهور، وسلات النفايات، وذلك بهدف تقديم حزمة متكاملة من الخدمات التي توفر على العميل الوقت والجهد والتكلفة.",
    "about.vision": "رؤيتنا",
    "about.vision.text": "تسعى شركة مسارات الإبداع الرائدة إلى الريادة في مجالها، وأن تصبح نموذجًا يحتذى به بين الشركات الوطنية في المملكة، وذلك من خلال الاعتماد على أحدث المعدات وأفضل المواد الخام لتحقيق أعلى مستويات الجودة.",

    // Footer
    "footer.description": "شركة متخصصة في أعمال المنتجات الخرسانية مسبقة الصنع والحلول المتكاملة للبنية التحتية في المملكة العربية السعودية.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contactInfo": "معلومات التواصل",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.followUs": "تابعنا على",

    // Common
    "common.loading": "جاري التحميل...",
    "common.readMore": "اقرأ المزيد",
    "common.backHome": "العودة للرئيسية",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.products": "Products",
    "nav.projects": "Projects",
    "nav.contact": "Contact Us",
    "nav.admin": "Dashboard",

    // Hero
    "hero.title": "Masarat Al Ibdaa Al Raida",
    "hero.subtitle": "Towards a futuristic vision for stronger, high-quality projects",
    "hero.description": "Providing integrated concrete solutions that meet your project needs with the highest standards of quality and speed.",
    "hero.cta.quote": "Request a Quote Now",
    "hero.cta.contact": "Contact Us",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Integrated solutions for all concrete and infrastructure works",
    "services.parking": "Parking Planning & Installation",
    "services.parking.desc": "Executing parking lot planning and installation with precision and organization to ensure smooth traffic flow and safety.",
    "services.interlock": "Curbstone & Interlock Works",
    "services.interlock.desc": "Complete installation of sidewalks and interlock in various designs and colors, along with periodic maintenance.",
    "services.asphalt": "Asphalt & Road Maintenance",
    "services.asphalt.desc": "High-quality asphalt execution and maintenance for roads and parking lots, designed to withstand heavy loads.",
    "services.infrastructure": "Concrete Infrastructure Execution",
    "services.infrastructure.desc": "Comprehensive infrastructure projects including manholes, electrical extensions, and sewage networks.",
    "services.gardens": "Parks & Gardens Landscaping",
    "services.gardens.desc": "Supply and installation of decorative concrete benches, barriers, and flower pots to create an integrated aesthetic environment.",

    // Products
    "products.title": "Our Products",
    "products.subtitle": "A wide range of precast concrete products",
    "products.order": "Order Product",
    "products.viewAll": "View All Products",
    
    // Product Items
    "product.manholes_sewage": "Sewage Manholes",
    "product.manholes_electric": "Electrical & Telecom Manholes",
    "product.concrete_bases": "Reinforced Concrete Bases",
    "product.cast_iron_covers": "Cast Iron Manhole Covers",
    "product.drainage_covers": "Drainage Covers (Medium & Heavy Duty)",
    "product.garden_benches": "Concrete Garden Benches",
    "product.flower_pots": "Flower Pots",
    "product.parking_barriers": "Parking Barriers",
    "product.curbstones": "Curbstones",
    "product.interlock": "Interlock Tiles",
    "product.road_barriers": "Concrete Road Barriers",

    // Projects
    "projects.title": "Our Works Portfolio",
    "projects.subtitle": "We have extensive experience in executing various types of concrete projects. We have participated in numerous infrastructure and public utility projects, adhering to the highest quality and precision standards.",
    "projects.viewAll": "View All Projects",

    // Why Choose Us
    "why.title": "Why Choose Masarat?",
    "why.subtitle": "We stand out with extensive experience and a full commitment to the highest quality standards.",
    "why.credibility": "Credibility",
    "why.credibility.desc": "We keep our promises to clients, ensuring absolute transparency in our work.",
    "why.speed_production": "Speed of Production",
    "why.speed_production.desc": "We use modern equipment that guarantees massive production quantities in record time.",
    "why.quality": "High Quality",
    "why.quality.desc": "Excellent raw materials and rigorous testing to ensure the strength and durability of our products.",
    "why.speed_delivery": "Fast Delivery",
    "why.speed_delivery.desc": "An equipped transport fleet to deliver products to your project site on time.",

    // Clients
    "clients.title": "Honored to Serve",
    "clients.subtitle": "We are proud to work with elite institutions and companies.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We are ready to serve you and meet your needs in all concrete and infrastructure works.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.phone": "Phone Number",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.cta.title": "Towards a futuristic vision for stronger projects",
    "contact.cta.subtitle": "Providing integrated concrete solutions that meet your project needs with the highest standards of quality and speed.",
    
    // Contact Info Real Data
    "contact.address.label": "Headquarters",
    "contact.address.value": "Riyadh, Saudi Arabia",
    "contact.phone1.value": "050-7655173",
    "contact.phone2.value": "055-1885711",
    "contact.email.value": "Tarek2977@gmail.com",
    "contact.website.value": "www.masarat2030.com",

    // About
    "about.title": "About Us",
    "about.subtitle": "Masarat Al Ibdaa Al Raida - Leaders in Concrete Solutions",
    "about.story": "Who We Are",
    "about.story.text": "Masarat Al Ibdaa Al Raida is a leading concrete solutions company specializing in precast concrete products, based in Riyadh. The company offers integrated cement product solutions serving infrastructure projects, residential buildings, commercial complexes, schools, and government buildings. We also provide garden landscaping products such as decorative concrete benches, barriers, flower pots, and waste bins, aiming to offer a comprehensive service package that saves the client time, effort, and cost.",
    "about.vision": "Our Vision",
    "about.vision.text": "Masarat Al Ibdaa Al Raida strives for leadership in its field, aiming to become a role model among national companies in the Kingdom by relying on the latest equipment and the best raw materials to achieve the highest levels of quality.",

    // Footer
    "footer.description": "A specialized company in precast concrete products and integrated infrastructure solutions in Saudi Arabia.",
    "footer.quickLinks": "Quick Links",
    "footer.contactInfo": "Contact Info",
    "footer.rights": "All rights reserved",
    "footer.followUs": "Follow Us",

    // Common
    "common.loading": "Loading...",
    "common.readMore": "Read More",
    "common.backHome": "Back to Home",
  },
} as const;

export type TranslationKey = keyof typeof translations.ar;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || key;
}
