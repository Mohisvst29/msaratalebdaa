"use client";

import { useState } from "react";
import { Download, Upload, AlertTriangle, CheckCircle2, Loader2, Database } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function BackupPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/backup");
      const data = await res.json();
      
      if (data.success) {
        // Create a downloadable JSON file
        const blob = new Blob([JSON.stringify(data.backup, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `masarat-backup-${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "تم بنجاح",
          description: "تم تحميل النسخة الاحتياطية بنجاح",
          variant: "default",
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء تحميل النسخة الاحتياطية",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        title: "تنبيه",
        description: "يرجى اختيار ملف النسخة الاحتياطية أولاً",
        variant: "destructive",
      });
      return;
    }

    // Read the file
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setIsImporting(true);
        const fileContent = e.target?.result as string;
        const backupData = JSON.parse(fileContent);

        // Confirm before restoring
        if (!confirm("تحذير: هذه العملية ستقوم بمسح جميع البيانات الحالية واستبدالها ببيانات النسخة الاحتياطية. هل أنت متأكد أنك تريد الاستمرار؟")) {
          setIsImporting(false);
          return;
        }

        const res = await fetch("/api/backup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ backup: backupData }),
        });

        const data = await res.json();

        if (data.success) {
          toast({
            title: "تم بنجاح",
            description: "تم استعادة النسخة الاحتياطية بنجاح",
            variant: "default",
          });
          setSelectedFile(null);
          // Reset file input
          const fileInput = document.getElementById('backup-upload') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } else {
          throw new Error(data.error);
        }
      } catch (error: any) {
        toast({
          title: "خطأ",
          description: error.message || "الملف غير صالح أو حدث خطأ أثناء الاستعادة",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            النسخ الاحتياطي
          </h1>
          <p className="text-slate-500 font-medium">
            إدارة النسخ الاحتياطية لبيانات الموقع (المنتجات، الخدمات، المشاريع، والإعدادات)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-6"
        >
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2">
            <Download className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">تصدير نسخة احتياطية</h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
              قم بتحميل جميع بيانات الموقع في ملف واحد بصيغة JSON للاحتفاظ به للرجوع إليه في أي وقت.
            </p>
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isExporting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isExporting ? "جاري التحميل..." : "تحميل نسخة احتياطية"}
          </button>
        </motion.div>

        {/* Import Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-6"
        >
          <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-2">
            <Upload className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">استعادة من ملف</h2>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
              قم برفع ملف النسخة الاحتياطية السابقة. <span className="text-red-500 font-bold">تنبيه: سيتم استبدال جميع البيانات الحالية بالبيانات الموجودة في الملف.</span>
            </p>
          </div>
          
          <div className="w-full flex flex-col items-center gap-4">
            <input
              type="file"
              id="backup-upload"
              accept=".json"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="backup-upload"
              className="w-full sm:w-auto px-8 py-4 border-2 border-dashed border-slate-200 hover:border-cyan-500 hover:bg-cyan-50 text-slate-600 rounded-2xl font-medium transition-colors flex items-center justify-center gap-3 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              {selectedFile ? selectedFile.name : "اختر ملف النسخة الاحتياطية"}
            </label>
            
            {selectedFile && (
              <button
                onClick={handleImport}
                disabled={isImporting}
                className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isImporting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
                {isImporting ? "جاري الاستعادة..." : "تأكيد الاستعادة"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
