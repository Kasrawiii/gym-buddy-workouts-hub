
import { useState, useEffect } from "react";
import { Lightbulb, RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exercise } from "@/types/exercise";

interface SmartSuggestionsProps {
  exercises: Exercise[];
  onAddSuggestion: (exercise: Omit<Exercise, 'id'>) => void;
}

const SmartSuggestions = ({ exercises, onAddSuggestion }: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Array<Omit<Exercise, 'id'>>>([]);

  const exerciseDatabase = {
    "صدر": [
      { name: "ضغط بنش مسطح", sets: 4, reps: 10, weight: 60, notes: "ركز على النزول البطيء" },
      { name: "ضغط دمبل مائل", sets: 3, reps: 12, weight: 25, notes: "زاوية 45 درجة" },
      { name: "تفتيح صدر", sets: 3, reps: 15, weight: 15, notes: "حركة واسعة ومسيطر عليها" },
    ],
    "ظهر": [
      { name: "سحب بار واسع", sets: 4, reps: 8, weight: 50, notes: "اسحب للصدر العلوي" },
      { name: "تجديف دمبل", sets: 3, reps: 10, weight: 30, notes: "حافظ على استقامة الظهر" },
      { name: "سحب كابل ضيق", sets: 3, reps: 12, weight: 40, notes: "اضغط لوحي الكتف" },
    ],
    "كتف": [
      { name: "ضغط عسكري", sets: 4, reps: 8, weight: 40, notes: "من أمام الرأس" },
      { name: "رفع جانبي", sets: 3, reps: 15, weight: 12, notes: "حتى مستوى الكتف" },
      { name: "رفع أمامي", sets: 3, reps: 12, weight: 15, notes: "بالتناوب" },
    ],
    "ذراع": [
      { name: "بايسبس بار", sets: 3, reps: 10, weight: 30, notes: "حركة بطيئة ومسيطر عليها" },
      { name: "ترايسبس كابل", sets: 3, reps: 12, weight: 25, notes: "اثبت المرفقين" },
      { name: "هامر كيرل", sets: 3, reps: 10, weight: 20, notes: "بالدمبل" },
    ],
    "رجل": [
      { name: "سكوات", sets: 4, reps: 12, weight: 80, notes: "انزل حتى 90 درجة" },
      { name: "ديد ليفت", sets: 3, reps: 8, weight: 100, notes: "حافظ على استقامة الظهر" },
      { name: "لانج", sets: 3, reps: 10, weight: 40, notes: "بالتناوب" },
    ],
    "بطن": [
      { name: "كرانش", sets: 3, reps: 20, weight: 0, notes: "ركز على العضلة" },
      { name: "بلانك", sets: 3, reps: 1, weight: 0, notes: "احتفظ لمدة 60 ثانية" },
      { name: "رفع الأرجل", sets: 3, reps: 15, weight: 0, notes: "حركة بطيئة" },
    ],
  };

  const generateSmartSuggestions = () => {
    const recentCategories = exercises.slice(-5).map(ex => ex.category);
    const categoryCount = recentCategories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // اقترح تمارين من فئات لم يتم التمرن عليها مؤخراً
    const lessTrainedCategories = Object.keys(exerciseDatabase)
      .filter(cat => !categoryCount[cat] || categoryCount[cat] < 2)
      .slice(0, 3);

    const newSuggestions = lessTrainedCategories.map(category => {
      const categoryExercises = exerciseDatabase[category as keyof typeof exerciseDatabase];
      const randomExercise = categoryExercises[Math.floor(Math.random() * categoryExercises.length)];
      
      return {
        ...randomExercise,
        category: category as any,
        createdAt: new Date(),
      };
    });

    setSuggestions(newSuggestions);
  };

  useEffect(() => {
    generateSmartSuggestions();
  }, [exercises]);

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          اقتراحات ذكية
          <Button
            variant="ghost"
            size="sm"
            onClick={generateSmartSuggestions}
            className="ml-auto text-blue-300 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {suggestions.length === 0 ? (
          <p className="text-blue-200 text-center py-4">
            أضف المزيد من التمارين للحصول على اقتراحات ذكية
          </p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-3 border border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{suggestion.name}</h4>
                    <p className="text-blue-200 text-sm">{suggestion.category}</p>
                    <div className="flex gap-4 mt-2 text-xs text-blue-300">
                      <span>{suggestion.sets} مجموعات</span>
                      <span>{suggestion.reps} تكرار</span>
                      <span>{suggestion.weight} كيلو</span>
                    </div>
                    {suggestion.notes && (
                      <p className="text-xs text-blue-300 mt-1 italic">
                        {suggestion.notes}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onAddSuggestion(suggestion)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartSuggestions;
