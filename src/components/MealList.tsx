
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { Meal } from "@/types/meal";
import MealCard from "./MealCard";

interface MealListProps {
  meals: Meal[];
  onDeleteMeal: (id: string) => void;
}

const MealList = ({ meals, onDeleteMeal }: MealListProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-green-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Utensils className="w-6 h-6 text-green-400" />
          قائمة الوجبات
        </CardTitle>
        <CardDescription className="text-green-200">
          جميع وجباتك المسجلة ({meals.length} وجبة)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full">
          {meals.length === 0 ? (
            <div className="text-center py-8 text-green-200">
              <Utensils className="w-12 h-12 mx-auto mb-4 text-green-400/50" />
              <p>لم تضف أي وجبات بعد</p>
              <p className="text-sm">ابدأ بإضافة وجبتك الأولى</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onDelete={onDeleteMeal}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MealList;
