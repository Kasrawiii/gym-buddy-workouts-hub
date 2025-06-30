
import { useState, useEffect } from "react";
import { Dumbbell, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(() => {
      onStart();
    }, 300);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center px-4 max-w-4xl mx-auto">
        {/* الأيقونات المتحركة */}
        <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in">
          <Dumbbell className="w-16 h-16 text-orange-500 animate-pulse" />
          <Bot className="w-20 h-20 text-purple-400 animate-bounce" />
          <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
        </div>

        {/* العنوان الرئيسي */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          مدرب الجيم الذكي
        </h1>

        {/* الجملة التحفيزية */}
        <div className="mb-12 animate-fade-in">
          <p className="text-2xl md:text-3xl text-blue-200 mb-4 font-semibold">
            🔥 رحلتك نحو القوة تبدأ اليوم 🔥
          </p>
          <p className="text-xl text-blue-300 max-w-2xl mx-auto leading-relaxed">
            مع المساعد الذكي المجاني، ستتمكن من تتبع تمارينك، تنظيم وجباتك، 
            والوصول لأهدافك بطريقة علمية ومدروسة
          </p>
        </div>

        {/* إحصائيات تحفيزية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">💪</div>
            <div className="text-white font-semibold">تتبع التمارين</div>
            <div className="text-blue-200 text-sm">بذكاء وسهولة</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">🥗</div>
            <div className="text-white font-semibold">تنظيم الوجبات</div>
            <div className="text-blue-200 text-sm">حسب أهدافك</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">🤖</div>
            <div className="text-white font-semibold">مساعد ذكي</div>
            <div className="text-blue-200 text-sm">مجاني 100%</div>
          </div>
        </div>

        {/* زر البداية */}
        <div className="animate-fade-in">
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-2xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            هيّا نبدأ
            <Sparkles className="w-6 h-6 ml-3" />
          </Button>
          <p className="text-blue-300 mt-4 text-sm">
            ابدأ رحلتك نحو أفضل نسخة من نفسك
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
