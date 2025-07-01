
import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ar' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Welcome Screen
    gymTrainer: 'مدرب الجيم الذكي',
    journeyStarts: '🔥 رحلتك نحو القوة تبدأ اليوم 🔥',
    smartAssistant: 'مع المساعد الذكي المجاني، ستتمكن من تتبع تمارينك، تنظيم وجباتك، والوصول لأهدافك بطريقة علمية ومدروسة',
    trackExercises: 'تتبع التمارين',
    smartEasy: 'بذكاء وسهولة',
    mealPlanning: 'تنظيم الوجبات',
    basedOnGoals: 'حسب أهدافك',
    smartAssistantFree: 'مساعد ذكي',
    free100: 'مجاني 100%',
    letsStart: 'هيّا نبدأ',
    startJourney: 'ابدأ رحلتك نحو أفضل نسخة من نفسك',
    secretCode: 'الرمز السري',
    enterSecret: 'أدخل الرمز السري للوصول للتطبيق',
    enterCode: 'أدخل الرمز (4 أرقام)',
    wrongCode: 'رمز خاطئ! متبقي',
    attempts: 'محاولة',
    attemptsLeft: 'المحاولات المتبقية:',
    blockedFor: 'محظور لمدة:',
    confirmEntry: 'تأكيد الدخول',
    goBack: 'العودة للخلف',
    attemptsExhausted: 'تم استنزاف المحاولات. يتم حظرك لمدة دقيقة واحدة.',
    blocked: 'محظور',
    selectLanguage: 'اختر اللغة'
  },
  es: {
    // Welcome Screen
    gymTrainer: 'Entrenador Inteligente de Gimnasio',
    journeyStarts: '🔥 Tu viaje hacia la fuerza comienza hoy 🔥',
    smartAssistant: 'Con el asistente inteligente gratuito, podrás rastrear tus ejercicios, organizar tus comidas y alcanzar tus objetivos de manera científica y estudiada',
    trackExercises: 'Seguimiento de Ejercicios',
    smartEasy: 'inteligente y fácil',
    mealPlanning: 'Planificación de Comidas',
    basedOnGoals: 'según tus objetivos',
    smartAssistantFree: 'Asistente Inteligente',
    free100: '100% Gratis',
    letsStart: 'Empecemos',
    startJourney: 'Comienza tu viaje hacia la mejor versión de ti mismo',
    secretCode: 'Código Secreto',
    enterSecret: 'Ingresa el código secreto para acceder a la aplicación',
    enterCode: 'Ingresa el código (4 dígitos)',
    wrongCode: '¡Código incorrecto! Quedan',
    attempts: 'intento',
    attemptsLeft: 'Intentos restantes:',
    blockedFor: 'Bloqueado por:',
    confirmEntry: 'Confirmar Entrada',
    goBack: 'Volver Atrás',
    attemptsExhausted: 'Intentos agotados. Serás bloqueado por un minuto.',
    blocked: 'Bloqueado',
    selectLanguage: 'Seleccionar Idioma'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
