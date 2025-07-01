
import { useState } from "react";
import { Bot, Send, Loader2, Sparkles, TrendingUp, Target, Calculator, Award, Zap, Heart, Dumbbell, Apple, Camera, Clock, Trophy, Brain, BarChart3, Flame, Droplets, Utensils, Timer, Calendar, ChefHat, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Exercise } from "@/types/exercise";
import { Meal } from "@/types/meal";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'workout' | 'meal' | 'analysis' | 'challenge';
}

interface EnhancedAIAssistantProps {
  exercises?: Exercise[];
  meals?: Meal[];
  onAddExercise?: (exercise: Omit<Exercise, 'id'>) => void;
  onAddMeal?: (meal: Omit<Meal, 'id'>) => void;
}

const EnhancedAIAssistant = ({ exercises = [], meals = [], onAddExercise, onAddMeal }: EnhancedAIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🔥 مرحباً بك في مدربك الشخصي الذكي المتطور! 🔥\n\nأنا مساعدك الذكي المجاني الذي يقدم لك:\n\n🏋️ **تمارين متقدمة**:\n• خطط تمرين أسبوعية مخصصة\n• تحليل نقاط القوة والضعف\n• حاسبة الحد الأقصى (1RM)\n• مؤقت الراحة الذكي\n\n🍎 **تغذية ذكية**:\n• تحليل الطعام بالكاميرا (محاكاة)\n• حاسبة السعرات المطلوبة\n• وصفات صحية مخصصة\n• متتبع الماء الذكي\n\n📊 **تحليلات متقدمة**:\n• تقارير شهرية شاملة\n• مقارنة الأداء\n• إنجازات ومكافآت\n• تحديات يومية\n\n💡 **ميزات إضافية**:\n• مدرب شخصي ذكي\n• تعديل خطط تلقائي\n• تذكيرات ذكية\n• نصائح مخصصة\n\nاكتب 'قائمة الأوامر' لرؤية جميع الأوامر المتاحة!",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();

  const quickCommands = [
    { label: "تحليل أدائي", command: "حلل أدائي", icon: BarChart3 },
    { label: "خطة أسبوعية", command: "اعطني خطة تمرين أسبوعية", icon: Calendar },
    { label: "وصفة صحية", command: "اقترح وصفة صحية", icon: ChefHat },
    { label: "تحدي يومي", command: "اعطني تحدي اليوم", icon: Trophy },
    { label: "حاسبة السعرات", command: "احسب سعراتي المطلوبة", icon: Calculator },
    { label: "تحليل طعام", command: "حلل هذا الطعام", icon: Camera },
  ];

  const getAdvancedAIResponse = async (userMessage: string): Promise<{ text: string; type: string }> => {
    const message = userMessage.toLowerCase();
    
    // قائمة الأوامر
    if (message.includes('قائمة الأوامر') || message.includes('الأوامر') || message.includes('مساعدة')) {
      return {
        text: `📋 **قائمة الأوامر المتاحة:**\n\n🏋️ **التمارين:**\n• "خطة أسبوعية" - برنامج تمرين 7 أيام\n• "حلل أدائي" - تحليل شامل لتقدمك\n• "حاسبة 1RM" - حساب الحد الأقصى\n• "تمارين [عضلة]" - تمارين مخصصة\n\n🍎 **التغذية:**\n• "حاسبة السعرات" - احتياجاتك اليومية\n• "وصفة صحية" - وصفات مخصصة\n• "حلل طعام" - تحليل غذائي\n• "متتبع الماء" - تذكير شرب الماء\n\n📊 **التحليلات:**\n• "تقرير شهري" - ملخص أداءك\n• "مقارنة الأداء" - مقارنة مع الماضي\n• "إنجازاتي" - مكافآتك وشاراتك\n• "تحدي يومي" - تحدي جديد\n\n💡 **أوامر خاصة:**\n• "نصائح شخصية" - نصائح مخصصة\n• "تعديل خطتي" - تحسين برنامجك\n• "تذكيرات" - إعداد التذكيرات`,
        type: 'text'
      };
    }

    // تحليل الأداء
    if (message.includes('حلل أدائي') || message.includes('تحليل أداء')) {
      const totalExercises = exercises.length;
      const totalWorkouts = new Set(exercises.map(e => e.workoutDate.toDateString())).size;
      const categories = exercises.reduce((acc, ex) => {
        acc[ex.category] = (acc[ex.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const strongestCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0];
      const weakestCategory = Object.entries(categories).sort(([,a], [,b]) => a - b)[0];

      return {
        text: `📊 **تحليل أداءك الشامل:**\n\n🏆 **الإحصائيات العامة:**\n• إجمالي التمارين: ${totalExercises}\n• أيام التمرين: ${totalWorkouts}\n• متوسط التمارين/اليوم: ${totalWorkouts > 0 ? Math.round(totalExercises / totalWorkouts) : 0}\n\n💪 **نقاط القوة:**\n• أقوى عضلة: ${strongestCategory?.[0] || 'غير محدد'} (${strongestCategory?.[1] || 0} تمرين)\n• معدل الانتظام: ${totalWorkouts > 7 ? 'ممتاز' : totalWorkouts > 3 ? 'جيد' : 'يحتاج تحسين'}\n\n⚠️ **نقاط التحسين:**\n• عضلة تحتاج اهتمام: ${weakestCategory?.[0] || 'متوازن'}\n• اقتراح: ${totalWorkouts < 3 ? 'زيادة أيام التمرين' : 'تنويع التمارين أكثر'}\n\n🎯 **التوصيات:**\n• ركز على تمارين ${weakestCategory?.[0] || 'الرجل'} الأسبوع القادم\n• أضف تمرين كارديو 2-3 مرات أسبوعياً\n• احرص على الراحة 48 ساعة بين تمرين نفس العضلة`,
        type: 'analysis'
      };
    }

    // خطة أسبوعية
    if (message.includes('خطة أسبوعية') || message.includes('برنامج أسبوعي')) {
      return {
        text: `📅 **برنامج التمرين الأسبوعي المخصص:**\n\n🔥 **الأسبوع الأول - بناء القاعدة:**\n\n**الأحد - صدر وترايسبس:**\n• ضغط بنش مسطح: 4×8-10\n• ضغط بنش مائل: 3×10-12\n• تفتيح دمبل: 3×12-15\n• ضغط فرنسي: 3×10-12\n• ضغط دايموند: 3×8-10\n\n**الاثنين - ظهر وبايسبس:**\n• سحب بار: 4×6-8\n• سحب كابل واسع: 3×10-12\n• تجديف دمبل: 3×10-12\n• بايسبس بار: 3×10-12\n• مطرقة: 3×12-15\n\n**الثلاثاء - راحة أو كارديو خفيف**\n\n**الأربعاء - رجل:**\n• سكوات: 4×8-10\n• ديد ليفت: 3×6-8\n• لانجز: 3×12 لكل رجل\n• سمانة: 4×15-20\n\n**الخميس - كتف وبطن:**\n• ضغط عسكري: 4×8-10\n• رفع جانبي: 3×12-15\n• رفع خلفي: 3×12-15\n• كرانش: 3×20\n• بلانك: 3×30-60 ثانية\n\n**الجمعة - راحة**\n**السبت - تمرين شامل خفيف**`,
        type: 'workout'
      };
    }

    // حاسبة السعرات
    if (message.includes('حاسبة السعرات') || message.includes('احسب سعرات')) {
      return {
        text: `🧮 **حاسبة السعرات الذكية:**\n\n📊 **لحساب احتياجاتك بدقة:**\n\n**للرجال:**\n• الوزن الحالي × 24 = معدل الأيض الأساسي\n• + 300-500 سعرة للأنشطة اليومية\n• + 200-400 سعرة للتمرين\n\n**للنساء:**\n• الوزن الحالي × 22 = معدل الأيض الأساسي\n• + 250-400 سعرة للأنشطة اليومية\n• + 150-300 سعرة للتمرين\n\n🎯 **حسب الهدف:**\n• **تخسيس:** اطرح 300-500 سعرة من الاحتياج\n• **تضخيم:** أضف 300-500 سعرة للاحتياج\n• **ثبات:** التزم بالاحتياج المحسوب\n\n💡 **مثال لشخص 70 كيلو:**\n• معدل الأيض: 1680 سعرة\n• الأنشطة: +350 سعرة\n• التمرين: +300 سعرة\n• **الإجمالي: 2330 سعرة/يوم**\n\n📝 **توزيع الماكرو:**\n• البروتين: 25-30%\n• الكربوهيدرات: 45-50%\n• الدهون: 20-25%`,
        type: 'text'
      };
    }

    // وصفة صحية
    if (message.includes('وصفة صحية') || message.includes('وصفة') || message.includes('طبخ')) {
      const healthyRecipes = [
        {
          name: "سلطة البروتين الفائقة",
          ingredients: "دجاج مشوي، كينوا، أفوكادو، طماطم، خيار، جرجير",
          calories: 450,
          protein: 35,
          instructions: "اخلط جميع المكونات مع تتبيلة الليمون وزيت الزيتون"
        },
        {
          name: "شوفان البروتين بالفواكه",
          ingredients: "شوفان، حليب، بروتين باودر، موز، توت، عسل",
          calories: 380,
          protein: 25,
          instructions: "اطبخ الشوفان واخلط البروتين، ثم أضف الفواكه والعسل"
        },
        {
          name: "سموذي الطاقة الأخضر",
          ingredients: "سبانخ، موز، تفاح، زنجبيل، ماء جوز الهند",
          calories: 280,
          protein: 8,
          instructions: "اخلط جميع المكونات في الخلاط حتى يصبح ناعماً"
        }
      ];
      
      const randomRecipe = healthyRecipes[Math.floor(Math.random() * healthyRecipes.length)];
      
      return {
        text: `🍽️ **وصفة صحية مخصصة:**\n\n**${randomRecipe.name}**\n\n🥗 **المكونات:**\n${randomRecipe.ingredients}\n\n👨‍🍳 **طريقة التحضير:**\n${randomRecipe.instructions}\n\n📊 **القيم الغذائية:**\n• السعرات: ${randomRecipe.calories}\n• البروتين: ${randomRecipe.protein}ج\n• وقت التحضير: 10-15 دقيقة\n\n💡 **نصائح إضافية:**\n• تناولها بعد التمرين للاستشفاء الأمثل\n• يمكن حفظها في الثلاجة لمدة 3 أيام\n• أضف البذور والمكسرات لمزيد من الطاقة\n\n🔥 **فوائد خاصة:**\n• تساعد في بناء العضلات\n• تحسن الأداء الرياضي\n• تزيد الشعور بالشبع`,
        type: 'meal'
      };
    }

    // تحدي يومي
    if (message.includes('تحدي يومي') || message.includes('تحدي اليوم')) {
      const challenges = [
        "🔥 تحدي الـ100: 100 تكرار موزعة (25 ضغط + 25 قرفصاء + 25 عقلة + 25 بطن)",
        "⏱️ تحدي الـ7 دقائق: 7 تمارين لكامل الجسم، كل تمرين 45 ثانية مع راحة 15 ثانية",
        "💪 تحدي القوة: زيادة وزن آخر تمرين بـ2.5 كيلو اليوم",
        "🏃‍♂️ تحدي الكارديو: 20 دقيقة مشي سريع + 5 دقائق جري خفيف",
        "🧘‍♂️ تحدي التوازن: 5 دقائق تمارين توازن + 10 دقائق تمدد",
        "🌊 تحدي الماء: اشرب 3 لتر ماء اليوم مع تتبع كل كوب",
        "🥗 تحدي التغذية: 5 وجبات صغيرة صحية بدلاً من 3 وجبات كبيرة"
      ];
      
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      
      return {
        text: `🏆 **تحدي اليوم:**\n\n${randomChallenge}\n\n🎯 **لماذا هذا التحدي؟**\nلكسر الروتين وتحفيز الجسم بطريقة جديدة!\n\n⭐ **نصائح للنجاح:**\n• ابدأ بالإحماء 5 دقائق\n• ركز على التقنية الصحيحة\n• استمع لجسمك ولا تفرط\n• احرص على شرب الماء\n\n🏅 **مكافأة إتمام التحدي:**\n+50 نقطة في رصيد الإنجازات!\n\n💬 اكتب "أتممت التحدي" بعد الانتهاء للحصول على التهنئة!`,
        type: 'challenge'
      };
    }

    // تحليل الطعام
    if (message.includes('حلل طعام') || message.includes('تحليل طعام') || message.includes('كاميرا')) {
      const foodAnalysis = [
        {
          food: "تفاحة متوسطة",
          calories: 95,
          protein: 0.5,
          carbs: 25,
          fat: 0.3,
          benefits: "غنية بالألياف وفيتامين C"
        },
        {
          food: "صدر دجاج مشوي (100ج)",
          calories: 165,
          protein: 31,
          carbs: 0,
          fat: 3.6,
          benefits: "مصدر ممتاز للبروتين عالي الجودة"
        },
        {
          food: "كوب أرز بني",
          calories: 216,
          protein: 5,
          carbs: 45,
          fat: 1.8,
          benefits: "كربوهيدرات معقدة ومغنيسيوم"
        }
      ];
      
      const randomFood = foodAnalysis[Math.floor(Math.random() * foodAnalysis.length)];
      
      return {
        text: `📸 **تحليل الطعام الذكي:**\n\n🔍 **الطعام المُحلل:** ${randomFood.food}\n\n📊 **التحليل الغذائي:**\n• السعرات الحرارية: ${randomFood.calories}\n• البروتين: ${randomFood.protein}ج\n• الكربوهيدرات: ${randomFood.carbs}ج\n• الدهون: ${randomFood.fat}ج\n\n✨ **الفوائد:**\n${randomFood.benefits}\n\n🎯 **التوصيات:**\n• ${randomFood.protein > 20 ? 'ممتاز لبناء العضلات' : 'أضف مصدر بروتين'}\n• ${randomFood.carbs > 30 ? 'مناسب قبل التمرين' : 'مناسب بعد التمرين'}\n• ${randomFood.calories < 200 ? 'وجبة خفيفة مثالية' : 'وجبة رئيسية'}\n\n💡 **اقتراح الوقت المناسب:**\n${randomFood.carbs > 30 ? 'قبل التمرين بساعة' : 'بعد التمرين مباشرة'}`,
        type: 'meal'
      };
    }

    // تحليل متقدم للوجبات
    if (message.includes('تحليل وجبات') || message.includes('تقرير غذائي')) {
      const totalMeals = meals.length;
      const todayMeals = meals.filter(meal => {
        const today = new Date();
        const mealDate = new Date(meal.mealDate);
        return mealDate.toDateString() === today.toDateString();
      });

      const todayStats = todayMeals.reduce((stats, meal) => ({
        calories: stats.calories + meal.calories,
        protein: stats.protein + meal.protein,
        carbs: stats.carbs + meal.carbs,
        fat: stats.fat + meal.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

      return {
        text: `📊 **تقرير التغذية المتقدم:**\n\n📈 **إحصائيات اليوم:**\n• إجمالي السعرات: ${todayStats.calories}\n• البروتين: ${todayStats.protein.toFixed(1)}ج\n• الكربوهيدرات: ${todayStats.carbs.toFixed(1)}ج\n• الدهون: ${todayStats.fat.toFixed(1)}ج\n\n🎯 **تقييم الأداء:**\n• جودة البروتين: ${todayStats.protein > 100 ? 'ممتاز' : todayStats.protein > 50 ? 'جيد' : 'يحتاج تحسين'}\n• توازن الماكرو: ${Math.abs(todayStats.protein * 4 - todayStats.carbs * 4) < 200 ? 'متوازن' : 'غير متوازن'}\n• إجمالي الطاقة: ${todayStats.calories > 2000 ? 'مرتفع' : todayStats.calories > 1500 ? 'متوسط' : 'منخفض'}\n\n💡 **التوصيات:**\n• ${todayStats.protein < 80 ? 'أضف مصادر بروتين أكثر' : 'البروتين ممتاز'}\n• ${todayStats.calories < 1800 ? 'زيد السعرات للطاقة' : 'السعرات مناسبة'}\n• اشرب 8-10 أكواب ماء يومياً\n\n📅 **إجمالي الوجبات المسجلة:** ${totalMeals}`,
        type: 'analysis'
      };
    }

    // حاسبة 1RM
    if (message.includes('1rm') || message.includes('حد أقصى') || message.includes('حاسبة قوة')) {
      return {
        text: `💪 **حاسبة الحد الأقصى (1RM):**\n\n🧮 **الصيغة المستخدمة:**\n1RM = الوزن × (1 + التكرارات ÷ 30)\n\n📊 **مثال عملي:**\nإذا كنت ترفع 80 كيلو × 8 تكرارات:\n1RM = 80 × (1 + 8÷30) = 80 × 1.27 = 101.6 كيلو\n\n🎯 **نسب التدريب المختلفة:**\n• القوة القصوى (1-3 تكرارات): 90-100% من 1RM\n• بناء القوة (4-6 تكرارات): 85-90% من 1RM\n• بناء العضلات (8-12 تكرارات): 70-85% من 1RM\n• القوة التحملية (15+ تكرارات): 60-70% من 1RM\n\n⚠️ **احتياطات الأمان:**\n• استخدم الصيغة كدليل تقريبي فقط\n• لا تحاول 1RM الفعلي بدون مساعد\n• أحمِ دائماً قبل التمرين\n• ابدأ بأوزان أقل وزد تدريجياً\n\n💡 **نصيحة:** استخدم 90% من 1RM المحسوب للأمان!`,
        type: 'text'
      };
    }

    // نصائح شخصية
    if (message.includes('نصائح شخصية') || message.includes('نصائح مخصصة')) {
      const personalizedTips = [
        `🎯 **بناءً على تمارينك الحالية:**\n• ركز أكثر على تمارين الرجل\n• أضف تمارين كارديو 3 مرات أسبوعياً\n• زيد فترات الراحة بين المجموعات`,
        `💪 **نصائح للتقدم:**\n• طبق مبدأ التحميل التدريجي\n• غير برنامجك كل 6-8 أسابيع\n• سجل أوزانك وتكراراتك دائماً`,
        `🍎 **تحسين التغذية:**\n• تناول وجبة بروتين كل 3-4 ساعات\n• اشرب الماء قبل الشعور بالعطش\n• تناول الخضار مع كل وجبة`
      ];
      
      const randomTip = personalizedTips[Math.floor(Math.random() * personalizedTips.length)];
      
      return {
        text: `🌟 **نصائح مخصصة لك:**\n\n${randomTip}\n\n🏆 **تذكر:**\n• الثبات أهم من الكمال\n• النتائج تحتاج وقت وصبر\n• استمع لجسدك واحرص على الراحة\n\n💬 **هل تريد نصائح محددة؟**\nاسأل عن أي موضوع: التغذية، التمارين، الاستشفاء، أو الدافعية!`,
        type: 'text'
      };
    }

    // الاستجابة العامة
    return {
      text: `🤖 **مساعدك الذكي جاهز!**\n\nلم أفهم طلبك تماماً، لكن يمكنني مساعدتك في:\n\n🏋️ **التمارين:** خطط، تحليل، نصائح\n🍎 **التغذية:** حاسبة، وصفات، تحليل\n📊 **التحليلات:** تقارير، مقارنات، إحصائيات\n🏆 **التحديات:** يومية، أسبوعية، شخصية\n\n💡 **جرب هذه الأوامر:**\n• "قائمة الأوامر" - لرؤية جميع الأوامر\n• "حلل أدائي" - تحليل شامل\n• "تحدي يومي" - تحدي جديد\n• "وصفة صحية" - وصفة مخصصة\n\nما الذي تريد معرفته؟ 🚀`,
      type: 'text'
    };
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getAdvancedAIResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        type: response.type as any,
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // إضافة توست للتحديات
      if (response.type === 'challenge') {
        toast({
          title: "تحدي جديد! 🏆",
          description: "تم إضافة تحدي يومي جديد لك",
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في المساعد الذكي. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const executeQuickCommand = (command: string) => {
    setInput(command);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-6 h-6 text-purple-400" />
            مساعد الجيم الذكي المتطور
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/10">
              <TabsTrigger value="chat" className="text-white data-[state=active]:bg-purple-500">
                محادثة ذكية
              </TabsTrigger>
              <TabsTrigger value="commands" className="text-white data-[state=active]:bg-blue-500">
                أوامر سريعة
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <ScrollArea className="h-[500px] w-full pr-2">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-lg ${
                          message.isUser
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : `${
                                message.type === 'analysis' ? 'bg-blue-500/20 border-blue-400/30' :
                                message.type === 'workout' ? 'bg-green-500/20 border-green-400/30' :
                                message.type === 'meal' ? 'bg-orange-500/20 border-orange-400/30' :
                                message.type === 'challenge' ? 'bg-purple-500/20 border-purple-400/30' :
                                'bg-white/20 border-white/30'
                              } text-white border`
                        }`}
                      >
                        {!message.isUser && (
                          <div className="flex items-center gap-2 mb-2">
                            {message.type === 'analysis' && <BarChart3 className="w-4 h-4 text-blue-400" />}
                            {message.type === 'workout' && <Dumbbell className="w-4 h-4 text-green-400" />}
                            {message.type === 'meal' && <Apple className="w-4 h-4 text-orange-400" />}
                            {message.type === 'challenge' && <Trophy className="w-4 h-4 text-purple-400" />}
                            {!message.type && <Bot className="w-4 h-4 text-purple-400" />}
                            <Badge variant="outline" className="text-xs">
                              {message.type === 'analysis' ? 'تحليل' :
                               message.type === 'workout' ? 'تمرين' :
                               message.type === 'meal' ? 'تغذية' :
                               message.type === 'challenge' ? 'تحدي' :
                               'مساعد'}
                            </Badge>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <span className="text-xs opacity-70 block mt-2">
                          {message.timestamp.toLocaleTimeString('ar-SA')}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 text-white border border-white/30 p-3 rounded-lg flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري التفكير...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="اسأل المساعد الذكي أي شيء..."
                  className="bg-white/20 border-white/30 text-white placeholder:text-blue-300"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="commands" className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {quickCommands.map((cmd, index) => (
                  <Button
                    key={index}
                    onClick={() => executeQuickCommand(cmd.command)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 h-auto p-4 flex flex-col items-center gap-2"
                    disabled={isLoading}
                  >
                    <cmd.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{cmd.label}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  ميزات متقدمة مجانية
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-200">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    تحليل الأداء
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    خطط أسبوعية
                  </div>
                  <div className="flex items-center gap-2">
                    <Calculator className="w-3 h-3" />
                    حاسبات ذكية
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3 h-3" />
                    تحديات يومية
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-3 h-3" />
                    وصفات صحية
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-3 h-3" />
                    تحليل الطعام
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAIAssistant;
