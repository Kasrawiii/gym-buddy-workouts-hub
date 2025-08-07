
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
    selectLanguage: 'اختر اللغة',
    
    // Main App
    saveWorkouts: 'احفظ تمارينك وتابع تقدمك مع المساعد الذكي المجاني',
    smartMealPlan: 'مخطط الوجبات الذكي',
    exerciseManagement: 'إدارة التمارين',
    calendar: 'التقويم',
    aiAssistant: 'المساعد الذكي',
    smartSuggestions: 'اقتراحات ذكية',
    todayStats: 'إحصائياتك اليوم',
    exercise: 'تمرين',
    totalReps: 'تكرار إجمالي',
    
    // Meal Planning
    smartMealPlanner: 'مخطط الوجبات الذكي',
    planMealsPlan: 'خطط وجباتك وتابع تغذيتك مع المساعد الذكي المجاني',
    backToMain: 'العودة للقائمة الرئيسية',
    mealManagement: 'إدارة الوجبات',
    nutritionTracking: 'متابعة التغذية',
    nutritionGoals: 'أهداف التغذية',
    todayNutrition: 'إحصائيات اليوم',
    calories: 'سعرة حرارية',
    protein: 'جرام بروتين',
    carbs: 'جرام كارب',
    fat: 'جرام دهون',
    
    // Exercise Card
    sets: 'مجموعات',
    reps: 'تكرار',
    weight: 'كيلو',
    addedAt: 'تم الإضافة:',
    
    // Meal Card
    servingSize: 'حجم الحصة:',
    calories_short: 'سعرات',
    protein_short: 'بروتين',
    carbs_short: 'كارب',
    fat_short: 'دهون',
    
    // Categories
    chest: 'صدر',
    back: 'ظهر',
    shoulders: 'كتف',
    arms: 'ذراع',
    legs: 'رجل',
    abs: 'بطن',
    cardio: 'كارديو',
    
    // Meal Categories
    breakfast: 'إفطار',
    lunch: 'غداء',
    dinner: 'عشاء',
    snack: 'وجبة خفيفة',
    supplements: 'مكملات'
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
    selectLanguage: 'Seleccionar Idioma',
    
    // Main App
    saveWorkouts: 'Guarda tus entrenamientos y sigue tu progreso con el asistente inteligente gratuito',
    smartMealPlan: 'Planificador Inteligente de Comidas',
    exerciseManagement: 'Gestión de Ejercicios',
    calendar: 'Calendario',
    aiAssistant: 'Asistente IA',
    smartSuggestions: 'Sugerencias Inteligentes',
    todayStats: 'Tus estadísticas de hoy',
    exercise: 'ejercicio',
    totalReps: 'repeticiones totales',
    
    // Meal Planning
    smartMealPlanner: 'Planificador Inteligente de Comidas',
    planMealsPlan: 'Planifica tus comidas y sigue tu nutrición con el asistente inteligente gratuito',
    backToMain: 'Volver al Menú Principal',
    mealManagement: 'Gestión de Comidas',
    nutritionTracking: 'Seguimiento Nutricional',
    nutritionGoals: 'Objetivos Nutricionales',
    todayNutrition: 'Estadísticas de Hoy',
    calories: 'calorías',
    protein: 'gramos de proteína',
    carbs: 'gramos de carbohidratos',
    fat: 'gramos de grasa',
    
    // Exercise Card
    sets: 'series',
    reps: 'repeticiones',
    weight: 'kg',
    addedAt: 'Agregado a las:',
    
    // Meal Card
    servingSize: 'Tamaño de porción:',
    calories_short: 'calorías',
    protein_short: 'proteína',
    carbs_short: 'carbos',
    fat_short: 'grasa',
    
    // Categories
    chest: 'pecho',
    back: 'espalda',
    shoulders: 'hombros',
    arms: 'brazos',
    legs: 'piernas',
    abs: 'abdomen',
    cardio: 'cardio',
    
    // Meal Categories
    breakfast: 'desayuno',
    lunch: 'almuerzo',
    dinner: 'cena',
    snack: 'merienda',
    supplements: 'suplementos'
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
