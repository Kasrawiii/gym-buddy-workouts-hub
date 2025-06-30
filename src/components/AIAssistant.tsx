
import { useState } from "react";
import { Bot, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! أنا مساعدك الذكي في الجيم. يمكنني مساعدتك في:\n• اقتراح تمارين جديدة\n• تقديم نصائح للتقنية الصحيحة\n• وضع برامج تدريبية\n• الإجابة على أسئلة اللياقة البدنية\n\nكيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // مكتبة نصائح ثابتة للاستجابة السريعة
    const fitnessResponses = {
      exercises: [
        "تمارين ممتازة للمبتدئين:\n• ضغط الصدر بالدمبل\n• سحب البار للظهر\n• القرفصاء\n• الضغط العسكري\n• العقلة المساعدة",
        "تمارين الصدر الفعالة:\n• ضغط البنش المسطح\n• ضغط الدمبل المائل\n• تفتيح الصدر\n• ضغط الآلة\n• الضغط بالكابل",
        "تمارين الظهر القوية:\n• سحب البار\n• سحب الكابل الواسع\n• تجديف الدمبل\n• العقلة\n• سحب الكابل الضيق"
      ],
      tips: [
        "نصائح مهمة للتمرين:\n• احرص على الإحماء 10 دقائق\n• اشرب الماء بانتظام\n• ركز على التقنية الصحيحة\n• خذ راحة 48 ساعة بين تمرين نفس العضلة\n• تنفس بشكل صحيح",
        "للحصول على أفضل النتائج:\n• نوع في التمارين كل 4-6 أسابيع\n• زد الأوزان تدريجياً\n• احصل على نوم كافي\n• تناول البروتين بعد التمرين\n• سجل تقدمك",
        "تجنب الأخطاء الشائعة:\n• لا تتمرن نفس العضلة يومياً\n• لا تهمل عضلات الرجل\n• لا تزد الوزن بسرعة\n• لا تتجاهل الإحماء\n• لا تقارن نفسك بالآخرين"
      ],
      nutrition: [
        "التغذية للرياضيين:\n• البروتين: 1.6-2.2 جم لكل كيلو\n• الكربوهيدرات: 5-7 جم لكل كيلو\n• الماء: 3-4 لتر يومياً\n• وجبة خفيفة قبل التمرين بساعة\n• بروتين بعد التمرين خلال 30 دقيقة",
        "أطعمة مفيدة للعضلات:\n• الدجاج والسمك\n• البيض والحليب\n• الشوفان والأرز البني\n• المكسرات والبذور\n• الخضار الورقية الخضراء"
      ]
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('تمرين') || message.includes('تمارين')) {
      return fitnessResponses.exercises[Math.floor(Math.random() * fitnessResponses.exercises.length)];
    } else if (message.includes('نصيحة') || message.includes('نصائح') || message.includes('كيف')) {
      return fitnessResponses.tips[Math.floor(Math.random() * fitnessResponses.tips.length)];
    } else if (message.includes('أكل') || message.includes('غذاء') || message.includes('طعام')) {
      return fitnessResponses.nutrition[Math.floor(Math.random() * fitnessResponses.nutrition.length)];
    } else {
      return "أفهم استفسارك! يمكنني مساعدتك في:\n\n🏋️ **التمارين**: اكتب 'اقترح تمارين' أو 'تمارين الصدر'\n💡 **النصائح**: اكتب 'نصائح التمرين' أو 'كيف أحسن أدائي'\n🍎 **التغذية**: اكتب 'نصائح الأكل' أو 'غذاء الرياضيين'\n\nما الذي تريد معرفته تحديداً؟";
    }
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
      const aiResponse = await getAIResponse(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
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

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="w-6 h-6 text-purple-400" />
          مساعد الجيم الذكي
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col h-[500px]">
        <ScrollArea className="flex-1 mb-4 pr-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-white/20 text-white border border-white/30'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString('ar-SA')}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/20 text-white border border-white/30 p-3 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin" />
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
            placeholder="اسأل المساعد الذكي..."
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
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
