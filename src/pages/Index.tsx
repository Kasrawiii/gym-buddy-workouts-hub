
import { useState } from "react";
import { Dumbbell, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutForm from "@/components/WorkoutForm";
import ExerciseList from "@/components/ExerciseList";
import AIAssistant from "@/components/AIAssistant";
import SmartSuggestions from "@/components/SmartSuggestions";
import { Exercise } from "@/types/exercise";

const Index = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString(),
    };
    setExercises(prev => [...prev, newExercise]);
  };

  const deleteExercise = (id: string) => {
    setExercises(prev => prev.filter(exercise => exercise.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-orange-500" />
            <h1 className="text-5xl font-bold text-white">
              مدرب الجيم الذكي
            </h1>
            <Bot className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            احفظ تمارينك وتابع تقدمك مع المساعد الذكي المجاني
          </p>
        </div>

        <Tabs defaultValue="workout" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="workout" className="text-white data-[state=active]:bg-orange-500">
              إدارة التمارين
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-white data-[state=active]:bg-purple-500">
              المساعد الذكي
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="text-white data-[state=active]:bg-green-500">
              اقتراحات ذكية
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workout">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Exercise Form */}
              <div className="space-y-6">
                <WorkoutForm onAddExercise={addExercise} />
              </div>

              {/* Exercise List */}
              <div className="space-y-6">
                <ExerciseList 
                  exercises={exercises} 
                  onDeleteExercise={deleteExercise}
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 text-center animate-fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">إحصائياتك اليوم</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{exercises.length}</div>
                    <div className="text-blue-200">تمرين</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">
                      {exercises.reduce((total, ex) => total + (ex.sets * ex.reps), 0)}
                    </div>
                    <div className="text-blue-200">تكرار إجمالي</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="max-w-4xl mx-auto">
              <AIAssistant />
            </div>
          </TabsContent>

          <TabsContent value="suggestions">
            <div className="max-w-4xl mx-auto">
              <SmartSuggestions 
                exercises={exercises}
                onAddSuggestion={addExercise}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
