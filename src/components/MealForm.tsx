
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Meal, MealCategory } from "@/types/meal";

interface MealFormProps {
  onAddMeal: (meal: Omit<Meal, 'id'>) => void;
}

const MealForm = ({ onAddMeal }: MealFormProps) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [category, setCategory] = useState<MealCategory>("إفطار");
  const [servingSize, setServingSize] = useState("");
  const [notes, setNotes] = useState("");
  const [mealDate, setMealDate] = useState<Date>(new Date());

  const categories: MealCategory[] = ["إفطار", "غداء", "عشاء", "وجبة خفيفة", "مكملات"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !calories) return;

    onAddMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      category,
      servingSize,
      notes,
      createdAt: new Date(),
      mealDate,
    });

    // Reset form
    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setServingSize("");
    setNotes("");
    setMealDate(new Date());
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-green-500/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-green-400" />
          إضافة وجبة جديدة
        </CardTitle>
        <CardDescription className="text-green-200">
          أضف تفاصيل وجبتك لمتابعة تغذيتك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">اسم الوجبة</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثل: دجاج مشوي"
                className="bg-white/10 border-green-400/30 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="calories" className="text-white">السعرات الحرارية</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="300"
                className="bg-white/10 border-green-400/30 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="protein" className="text-white">البروتين (جرام)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="25"
                className="bg-white/10 border-green-400/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="carbs" className="text-white">الكربوهيدرات (جرام)</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="20"
                className="bg-white/10 border-green-400/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="fat" className="text-white">الدهون (جرام)</Label>
              <Input
                id="fat"
                type="number"
                step="0.1"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="10"
                className="bg-white/10 border-green-400/30 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-white">نوع الوجبة</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as MealCategory)}
                className="w-full p-2 rounded-md bg-white/10 border border-green-400/30 text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="servingSize" className="text-white">حجم الحصة</Label>
              <Input
                id="servingSize"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                placeholder="100 جرام"
                className="bg-white/10 border-green-400/30 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">تاريخ الوجبة</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white/10 border-green-400/30 text-white hover:bg-white/20",
                    !mealDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {mealDate ? format(mealDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={mealDate}
                  onSelect={(date) => setMealDate(date || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="notes" className="text-white">ملاحظات</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ملاحظات إضافية..."
              className="bg-white/10 border-green-400/30 text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            إضافة الوجبة
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MealForm;
