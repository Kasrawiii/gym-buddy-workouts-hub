
import { Trash2, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Exercise } from "@/types/exercise";

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: () => void;
}

const getCategoryColor = (category: string) => {
  const colors = {
    "صدر": "from-red-500 to-pink-500",
    "ظهر": "from-blue-500 to-cyan-500", 
    "كتف": "from-yellow-500 to-orange-500",
    "ذراع": "from-green-500 to-emerald-500",
    "رجل": "from-purple-500 to-violet-500",
    "بطن": "from-indigo-500 to-blue-500",
    "كارديو": "from-rose-500 to-pink-500",
  };
  return colors[category as keyof typeof colors] || "from-gray-500 to-slate-500";
};

const ExerciseCard = ({ exercise, onDelete }: ExerciseCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-200 hover-scale">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(exercise.category)}`}>
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
              <span className={`text-sm px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(exercise.category)} text-white`}>
                {exercise.category}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="text-center bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold text-orange-500">{exercise.sets}</div>
            <div className="text-xs text-blue-200">مجموعات</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold text-orange-500">{exercise.reps}</div>
            <div className="text-xs text-blue-200">تكرار</div>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-2">
            <div className="text-xl font-bold text-orange-500">{exercise.weight}</div>
            <div className="text-xs text-blue-200">كيلو</div>
          </div>
        </div>

        {exercise.notes && (
          <div className="mt-3 p-2 bg-white/5 rounded-lg">
            <p className="text-sm text-blue-200">{exercise.notes}</p>
          </div>
        )}

        <div className="mt-3 text-xs text-blue-300">
          تم الإضافة: {exercise.createdAt.toLocaleTimeString('ar-SA')}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
