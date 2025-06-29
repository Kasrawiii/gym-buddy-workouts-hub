
import ExerciseCard from "./ExerciseCard";
import { Exercise } from "@/types/exercise";

interface ExerciseListProps {
  exercises: Exercise[];
  onDeleteExercise: (id: string) => void;
}

const ExerciseList = ({ exercises, onDeleteExercise }: ExerciseListProps) => {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">لا توجد تمارين حتى الآن</h3>
          <p className="text-blue-200">ابدأ بإضافة تمرينك الأول من النموذج على اليمين</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        تماريني اليوم ({exercises.length})
      </h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {exercises.map((exercise, index) => (
          <div 
            key={exercise.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ExerciseCard 
              exercise={exercise} 
              onDelete={() => onDeleteExercise(exercise.id)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
