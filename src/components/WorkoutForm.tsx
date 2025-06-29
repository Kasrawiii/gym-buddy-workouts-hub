
import { useState } from "react";
import { Plus, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exercise, ExerciseCategory } from "@/types/exercise";

interface WorkoutFormProps {
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void;
}

const categories: ExerciseCategory[] = ["صدر", "ظهر", "كتف", "ذراع", "رجل", "بطن", "كارديو"];

const WorkoutForm = ({ onAddExercise }: WorkoutFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    sets: 1,
    reps: 1,
    weight: 0,
    category: "" as ExerciseCategory,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    onAddExercise({
      ...formData,
      createdAt: new Date(),
    });

    // Reset form
    setFormData({
      name: "",
      sets: 1,
      reps: 1,
      weight: 0,
      category: "" as ExerciseCategory,
      notes: "",
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-xl">
          <Plus className="w-6 h-6 text-orange-500" />
          إضافة تمرين جديد
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-200">اسم التمرين</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="مثال: ضغط صدر"
              className="bg-white/20 border-white/30 text-white placeholder:text-blue-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-blue-200">فئة التمرين</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: ExerciseCategory) => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="اختر فئة التمرين" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="text-white hover:bg-white/10"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sets" className="text-blue-200">المجموعات</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                value={formData.sets}
                onChange={(e) => setFormData(prev => ({ ...prev, sets: parseInt(e.target.value) || 1 }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reps" className="text-blue-200">التكرارات</Label>
              <Input
                id="reps"
                type="number"
                min="1"
                value={formData.reps}
                onChange={(e) => setFormData(prev => ({ ...prev, reps: parseInt(e.target.value) || 1 }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-blue-200">الوزن (كيلو)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.5"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                className="bg-white/20 border-white/30 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-blue-200">ملاحظات (اختياري)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="أي ملاحظات إضافية..."
              className="bg-white/20 border-white/30 text-white placeholder:text-blue-300"
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 transition-all duration-200 hover-scale"
          >
            <Dumbbell className="w-5 h-5 mr-2" />
            إضافة التمرين
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkoutForm;
