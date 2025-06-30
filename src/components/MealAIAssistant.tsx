
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ChefHat, Send, Bot, Lightbulb, Target } from "lucide-react";
import { Meal, NutritionGoals } from "@/types/meal";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MealAIAssistantProps {
  meals: Meal[];
  nutritionGoals: NutritionGoals | null;
  onAddMealSuggestion: (meal: Omit<Meal, 'id'>) => void;
}

const MealAIAssistant = ({ meals, nutritionGoals, onAddMealSuggestion }: MealAIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "مرحباً! أنا مساعدك الذكي للتغذية. يمكنني مساعدتك في تخطيط وجباتك وتقديم اقتراحات غذائية مخصصة لأهدافك. كيف يمكنني مساعدتك اليوم؟",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateNutritionAdvice = (userMessage: string) => {
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

    // اقتراحات ذكية بناءً على الرسالة
    if (userMessage.includes("بروتين") || userMessage.includes("عضلات")) {
      return `بناءً على وجباتك اليوم، تناولت ${todayStats.protein.toFixed(1)} جرام بروتين. إليك بعض الاقتراحات:

🥩 مصادر بروتين ممتازة:
- صدر دجاج مشوي (25ج بروتين/100ج)
- سمك السلمون (22ج بروتين/100ج)
- البيض (6ج بروتين/بيضة)
- الجبن القريش (11ج بروتين/100ج)

💡 نصيحة: اهدف لتناول 1.6-2.2 جرام بروتين لكل كيلو من وزن الجسم يومياً لبناء العضلات.`;
    }

    if (userMessage.includes("وزن") || userMessage.includes("تخسيس") || userMessage.includes("حمية")) {
      return `لديك ${todayStats.calories} سعرة حرارية اليوم. إليك نصائح لإنقاص الوزن:

🔥 استراتيجيات حرق الدهون:
- قلل 300-500 سعرة من احتياجك اليومي
- اشرب الماء قبل الوجبات
- ركز على البروتين والألياف
- تجنب السكريات المضافة

🥗 وجبات مقترحة منخفضة السعرات:
- سلطة مع صدر دجاج مشوي
- شوربة الخضار
- زبادي يوناني مع التوت`;
    }

    if (userMessage.includes("طاقة") || userMessage.includes("تعب") || userMessage.includes("نشاط")) {
      return `الكربوهيدرات اليوم: ${todayStats.carbs.toFixed(1)}ج. لزيادة الطاقة:

⚡ مصادر طاقة صحية:
- الشوفان مع الموز
- التمر والمكسرات
- الفواكه الطازجة
- البطاطا الحلوة

⏰ توقيت الوجبات:
- وجبة خفيفة قبل التمرين بساعة
- كربوهيدرات سريعة بعد التمرين
- وجبات منتظمة كل 3-4 ساعات`;
    }

    // رد عام
    return `شكراً لسؤالك! بناءً على وجباتك اليوم:

📊 إحصائياتك:
- ${todayStats.calories} سعرة حرارية
- ${todayStats.protein.toFixed(1)}ج بروتين
- ${todayStats.carbs.toFixed(1)}ج كربوهيدرات
- ${todayStats.fat.toFixed(1)}ج دهون

💡 نصائح عامة:
- اشرب 8-10 أكواب ماء يومياً
- تناول 5 حصص من الخضار والفواكه
- مارس النشاط البدني 30 دقيقة يومياً
- احصل على نوم كافي (7-9 ساعات)

هل تريد اقتراحات وجبات محددة؟`;
  };

  const suggestMeals = () => {
    const mealSuggestions = [
      {
        name: "سلطة الدجاج المشوي",
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 18,
        category: "غداء" as const,
        servingSize: "حصة واحدة",
        notes: "اقتراح ذكي: وجبة متوازنة غنية بالبروتين",
        createdAt: new Date(),
        mealDate: new Date(),
      },
      {
        name: "شوفان بالموز والعسل",
        calories: 280,
        protein: 8,
        carbs: 45,
        fat: 6,
        category: "إفطار" as const,
        servingSize: "كوب واحد",
        notes: "اقتراح ذكي: إفطار صحي ومشبع",
        createdAt: new Date(),
        mealDate: new Date(),
      },
      {
        name: "سمك السلمون المشوي",
        calories: 400,
        protein: 35,
        carbs: 5,
        fat: 25,
        category: "عشاء" as const,
        servingSize: "150 جرام",
        notes: "اقتراح ذكي: غني بالأوميجا 3",
        createdAt: new Date(),
        mealDate: new Date(),
      }
    ];

    return mealSuggestions;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // إضافة رسالة المستخدم
    setMessages(prev => [...prev, {
      text: userMessage,
      isBot: false,
      timestamp: new Date()
    }]);

    // محاكاة تأخير المعالجة
    await new Promise(resolve => setTimeout(resolve, 1500));

    // إنشاء رد ذكي
    const botResponse = generateNutritionAdvice(userMessage);

    setMessages(prev => [...prev, {
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    }]);

    setIsLoading(false);
  };

  const handleQuickSuggestions = () => {
    const suggestions = suggestMeals();
    const suggestionText = `🍽️ إليك اقتراحات وجبات مخصصة لك:

${suggestions.map((meal, index) => 
  `${index + 1}. ${meal.name}
   🔥 ${meal.calories} سعرة | 🥩 ${meal.protein}ج بروتين
   💡 ${meal.notes}`
).join('\n\n')}

يمكنك إضافة أي من هذه الوجبات بالضغط على "إضافة وجبة مقترحة" أدناه.`;

    setMessages(prev => [...prev, {
      text: suggestionText,
      isBot: true,
      timestamp: new Date()
    }]);
  };

  const addSuggestedMeal = () => {
    const suggestions = suggestMeals();
    const randomMeal = suggestions[Math.floor(Math.random() * suggestions.length)];
    onAddMealSuggestion(randomMeal);
    
    setMessages(prev => [...prev, {
      text: `✅ تم إضافة "${randomMeal.name}" إلى قائمة وجباتك!`,
      isBot: true,
      timestamp: new Date()
    }]);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-purple-400" />
          مساعد التغذية الذكي
        </CardTitle>
        <CardDescription className="text-purple-200">
          اسأل عن أي شيء يتعلق بالتغذية والوجبات الصحية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* أزرار الاقتراحات السريعة */}
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={handleQuickSuggestions}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            اقتراحات وجبات
          </Button>
          <Button
            size="sm"
            onClick={addSuggestedMeal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Target className="w-4 h-4 mr-1" />
            إضافة وجبة مقترحة
          </Button>
        </div>

        {/* منطقة المحادثة */}
        <ScrollArea className="h-[400px] w-full border border-purple-400/20 rounded-lg p-4 bg-white/5">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.isBot
                      ? 'bg-purple-600/20 text-white border border-purple-400/30'
                      : 'bg-green-600/20 text-white border border-green-400/30'
                  }`}
                >
                  {message.isBot && (
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-300">مساعد التغذية</span>
                    </div>
                  )}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-400/30">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent" />
                    <span className="text-white">جاري التفكير...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* حقل الإدخال */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اسأل عن التغذية، الوجبات، أو أي نصائح صحية..."
            className="bg-white/10 border-purple-400/30 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealAIAssistant;
