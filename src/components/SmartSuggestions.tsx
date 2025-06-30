
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, TrendingUp, Target } from "lucide-react";
import { Exercise } from "@/types/exercise";

interface SmartSuggestionsProps {
  exercises: Exercise[];
  onAddSuggestion: (exercise: Omit<Exercise, 'id'>) => void;
}

const SmartSuggestions = ({ exercises, onAddSuggestion }: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Omit<Exercise, 'id'>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSmartSuggestions = async () => {
    setIsLoading(true);
    
    // محاكاة تحليل ذكي للتمارين
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const categories = exercises.map(ex => ex.category);
    const uniqueCategories = [...new Set(categories)];
    
    // اقتراحات ذكية بناءً على التمارين الحالية
    const smartSuggestions = [
      {
        category: "صدر",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "ضغط صدر بالدمبل",
        sets: 4,
        reps: 12,
        weight: 25,
        notes: "اقتراح ذكي: يكمل تمارين الصدر الموجودة"
      },
      {
        category: "ظهر",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "سحب عالي بالكيبل",
        sets: 3,
        reps: 15,
        weight: 40,
        notes: "اقتراح ذكي: لتقوية عضلات الظهر العلوية"
      },
      {
        category: "رجل",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "سكوات بالبار",
        sets: 4,
        reps: 10,
        weight: 60,
        notes: "اقتراح ذكي: تمرين أساسي للرجل"
      },
      {
        category: "كتف",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "رفع جانبي بالدمبل",
        sets: 3,
        reps: 12,
        weight: 12,
        notes: "اقتراح ذكي: لتكوير الكتف"
      },
      {
        category: "ذراع",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "بايسبس بالبار",
        sets: 3,
        reps: 10,
        weight: 20,
        notes: "اقتراح ذكي: لتضخيم البايسبس"
      },
      {
        category: "بطن",
        createdAt: new Date(),
        workoutDate: new Date(),
        name: "بلانك",
        sets: 3,
        reps: 30,
        weight: 0,
        notes: "اقتراح ذكي: لتقوية عضلات البطن"
      }
    ];

    // فلترة الاقتراحات بناءً على ما هو مفقود
    const missingSuggestions = smartSuggestions.filter(suggestion => 
      !uniqueCategories.includes(suggestion.category) || 
      exercises.filter(ex => ex.category === suggestion.category).length < 2
    ).slice(0, 3);

    setSuggestions(missingSuggestions);
    setIsLoading(false);
  };

  useEffect(() => {
    generateSmartSuggestions();
  }, [exercises]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-green-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-green-400" />
          اقتراحات ذكية
        </CardTitle>
        <CardDescription className="text-blue-200">
          اقتراحات مخصصة بناءً على تمارينك الحالية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateSmartSuggestions}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              جاري التحليل...
            </div>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              إنشاء اقتراحات جديدة
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              اقتراحات مخصصة لك
            </h3>
            
            {suggestions.map((suggestion, index) => (
              <Card key={index} className="bg-white/5 border-green-400/20">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{suggestion.name}</h4>
                      <p className="text-sm text-blue-200">{suggestion.category}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onAddSuggestion(suggestion)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Target className="w-4 h-4" />
                      إضافة
                    </Button>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-blue-200 mb-2">
                    <span>{suggestion.sets} مجموعات</span>
                    <span>{suggestion.reps} تكرار</span>
                    {suggestion.weight > 0 && <span>{suggestion.weight} كيلو</span>}
                  </div>
                  
                  <p className="text-xs text-green-300">{suggestion.notes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
