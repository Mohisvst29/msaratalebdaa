"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  Wrench, 
  Settings, 
  LogOut, 
  Building2,
  ChevronRight,
  Menu,
  X,
  User,
  Users,
  ImageIcon,
  PhoneCall
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [font, setFont] = useState("Tajawal");
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("isAdmin");
    if (!auth && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAdmin(true);
    }
    
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.logo) {
          if (data.data.logo.fontFamily) setFont(data.data.logo.fontFamily);
        }
      });

    // Close mobile menu on path change
    setIsMobileMenuOpen(false);
  }, [pathname, router]);

  if (pathname === "/admin/login") return <>{children}</>;
  if (isAdmin === null) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const navItems = [
    { name: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    { name: "المنتجات", href: "/admin/products", icon: Package },
    { name: "الخدمات", href: "/admin/services", icon: Wrench },
    { name: "المشاريع", href: "/admin/projects", icon: Building2 },
    { name: "شركاء النجاح", href: "/admin/partners", icon: Users },
    { name: "محتوى الموقع", href: "/admin/content", icon: ImageIcon },
    { name: "بيانات التواصل", href: "/admin/contact", icon: PhoneCall },
    { name: "إعدادات عامة", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white shadow-xl">
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-cyan-200">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {(isSidebarOpen || isMobileMenuOpen) && (
            <span className="font-black tracking-tighter text-xl text-slate-900">مسارات</span>
          )}
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                isActive 
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200" 
                  : "hover:bg-cyan-50 text-slate-500 hover:text-cyan-600"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {(isSidebarOpen || isMobileMenuOpen) && (
                <span className="font-bold text-sm whitespace-nowrap">{item.name}</span>
              )}
              {isActive && (isSidebarOpen || isMobileMenuOpen) && <ChevronRight className="mr-auto w-4 h-4 rotate-180" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {(isSidebarOpen || isMobileMenuOpen) && (
            <span className="font-bold text-sm">تسجيل الخروج</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex overflow-x-hidden" dir="rtl" style={{ fontFamily: `${font}, sans-serif`, lineHeight: "1.8" }}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-[70] lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex flex-col fixed lg:relative h-screen border-l border-gray-200 z-50 bg-white shadow-xl"
      >
        <SidebarContent />
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 text-slate-400 rounded-full flex items-center justify-center shadow-md hover:text-cyan-500 z-10"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-gray-50 p-4 md:p-10 w-full relative">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-slate-900">
                {navItems.find(i => i.href === pathname)?.name || "لوحة التحكم"}
              </h2>
              <p className="hidden sm:block text-slate-400 text-xs md:text-sm font-medium mt-1">إدارة المحتوى والهوية الرقمية</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 self-end sm:self-auto">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="font-black text-sm text-slate-900">المدير العام</span>
              <span className="text-[10px] md:text-xs text-cyan-500 font-bold">صلاحيات كاملة</span>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-200 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
