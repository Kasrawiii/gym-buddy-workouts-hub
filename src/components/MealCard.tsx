
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trash2, Flame, Award } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Meal } from "@/types/meal";

interface MealCardProps {
  meal: Meal;
  onDelete: (id: string) => void;
}

const MealCard = ({ meal, onDelete }: MealCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      "إفطار": "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
      "غداء": "bg-orange-500/20 text-orange-300 border-orange-400/30",
      "عشاء": "bg-blue-500/20 text-blue-300 border-blue-400/30",
      "وجبة خفيفة": "bg-green-500/20 text-green-300 border-green-400/30",
      "مكملات": "bg-purple-500/20 text-purple-300 border-purple-400/30",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-300";
  };

  return (
    <Card className="bg-white/5 border-green-400/20 hover:bg-white/10 transition-colors">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white text-lg">{meal.name}</h3>
              <Badge className={getCategoryColor(meal.category)}>
                {meal.category}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-green-200 mb-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(meal.mealDate), "dd MMM yyyy", { locale: ar })}
            </div>

            {meal.servingSize && (
              <p className="text-sm text-green-300 mb-2">
                حجم الحصة: {meal.servingSize}
              </p>
            )}
            
            {meal.notes && (
              <p className="text-sm text-blue-200 mb-3">
                📝 {meal.notes}
              </p>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(meal.id)}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* المعلومات الغذائية */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 p-3 bg-white/5 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-green-200">سعرات</span>
            </div>
            <div className="text-lg font-bold text-orange-400">{meal.calories}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-green-200">بروتين</span>
            </div>
            <div className="text-lg font-bold text-blue-400">{meal.protein.toFixed(1)}ج</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-sm text-green-200">كارب</span>
            </div>
            <div className="text-lg font-bold text-yellow-400">{meal.carbs.toFixed(1)}ج</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-sm text-green-200">دهون</span>
            </div>
            <div className="text-lg font-bold text-red-400">{meal.fat.toFixed(1)}ج</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
