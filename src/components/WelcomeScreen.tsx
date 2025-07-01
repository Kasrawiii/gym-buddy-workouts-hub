
import { useState, useEffect } from "react";
import { Dumbbell, Bot, Sparkles, Shield, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showSecretForm, setShowSecretForm] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const SECRET_CODE = "2004";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setAttempts(3);
            setError("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer]);

  const handleInitialStart = () => {
    setShowSecretForm(true);
  };

  const handleSecretSubmit = () => {
    if (secretCode === SECRET_CODE) {
      setIsVisible(false);
      setTimeout(() => {
        onStart();
      }, 500);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      setIsShaking(true);
      
      if (newAttempts === 0) {
        setIsBlocked(true);
        setBlockTimer(60);
        setError(t('attemptsExhausted'));
      } else {
        setError(`${t('wrongCode')} ${newAttempts} ${t('attempts')}${newAttempts > 1 ? '' : ''}`);
      }
      
      setSecretCode("");
      
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isBlocked && secretCode.length === 4) {
      handleSecretSubmit();
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  if (!showSecretForm) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <div className={`text-center px-4 max-w-4xl mx-auto ${language === 'ar' ? 'direction-rtl' : 'direction-ltr'}`}>
          {/* الأيقونات المتحركة */}
          <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in">
            <Dumbbell className="w-16 h-16 text-orange-500 animate-pulse" />
            <Bot className="w-20 h-20 text-purple-400 animate-bounce" />
            <Sparkles className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            {t('gymTrainer')}
          </h1>

          {/* الجملة التحفيزية */}
          <div className="mb-12 animate-fade-in">
            <p className="text-2xl md:text-3xl text-blue-200 mb-4 font-semibold">
              {t('journeyStarts')}
            </p>
            <p className="text-xl text-blue-300 max-w-2xl mx-auto leading-relaxed">
              {t('smartAssistant')}
            </p>
          </div>

          {/* إحصائيات تحفيزية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">💪</div>
              <div className="text-white font-semibold">{t('trackExercises')}</div>
              <div className="text-blue-200 text-sm">{t('smartEasy')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-orange-400 mb-2">🥗</div>
              <div className="text-white font-semibold">{t('mealPlanning')}</div>
              <div className="text-blue-200 text-sm">{t('basedOnGoals')}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">🤖</div>
              <div className="text-white font-semibold">{t('smartAssistantFree')}</div>
              <div className="text-blue-200 text-sm">{t('free100')}</div>
            </div>
          </div>

          {/* زر البداية */}
          <div className="animate-fade-in">
            <Button
              onClick={handleInitialStart}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-2xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              {t('letsStart')}
              <Sparkles className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-blue-300 mt-4 text-sm">
              {t('startJourney')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className={`text-center px-4 max-w-md mx-auto ${language === 'ar' ? 'direction-rtl' : 'direction-ltr'}`}>
        <div className={`bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${isShaking ? 'animate-pulse scale-105' : 'scale-100'}`}>
          {/* أيقونة الحماية */}
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500/20 p-4 rounded-full">
              <Shield className="w-12 h-12 text-orange-400" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            {t('secretCode')}
          </h2>
          <p className="text-blue-200 mb-8">
            {t('enterSecret')}
          </p>

          {/* حقل إدخال الرمز */}
          <div className="mb-6">
            <Input
              type="password"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value.slice(0, 4))}
              onKeyPress={handleKeyPress}
              placeholder={t('enterCode')}
              className="text-center text-2xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-orange-400 focus:ring-orange-400/50 transition-all duration-300"
              maxLength={4}
              disabled={isBlocked}
            />
          </div>

          {/* رسالة الخطأ أو الحظر */}
          {error && (
            <div className={`mb-6 p-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              isBlocked ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              {isBlocked ? <Clock className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="text-sm">
                {isBlocked ? `${t('blockedFor')}: ${formatTime(blockTimer)}` : error}
              </span>
            </div>
          )}

          {/* معلومات المحاولات */}
          {!isBlocked && (
            <div className="mb-6">
              <div className="flex justify-center gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < attempts ? 'bg-green-400' : 'bg-red-400/50'
                    }`}
                  />
                ))}
              </div>
              <p className="text-blue-300 text-sm mt-2">
                {t('attemptsLeft')}: {attempts}
              </p>
            </div>
          )}

          {/* زر التأكيد */}
          <Button
            onClick={handleSecretSubmit}
            disabled={isBlocked || secretCode.length !== 4}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white text-lg py-3 rounded-xl font-bold transform hover:scale-105 transition-all duration-300 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isBlocked ? (
              <>
                <Clock className="w-5 h-5 mr-2" />
                {t('blocked')} ({formatTime(blockTimer)})
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                {t('confirmEntry')}
              </>
            )}
          </Button>

          {/* زر العودة */}
          <Button
            onClick={() => setShowSecretForm(false)}
            variant="ghost"
            className="w-full mt-4 text-blue-200 hover:text-white hover:bg-white/10 transition-all duration-300"
            disabled={isBlocked}
          >
            {t('goBack')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
