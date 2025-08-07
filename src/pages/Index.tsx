
import { useState } from "react";
import { Dumbbell, Bot, CalendarIcon, Utensils } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import WorkoutForm from "@/components/WorkoutForm";
import ExerciseList from "@/components/ExerciseList";
import EnhancedAIAssistant from "@/components/EnhancedAIAssistant";
import SmartSuggestions from "@/components/SmartSuggestions";
import WorkoutCalendar from "@/components/WorkoutCalendar";
import { Exercise } from "@/types/exercise";

const Index = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
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
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className={`text-center mb-8 animate-fade-in ${language === 'ar' ? 'direction-rtl' : 'direction-ltr'}`}>
          <div className="flex justify-center items-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-orange-500" />
            <h1 className="text-5xl font-bold text-white">
              {t('gymTrainer')}
            </h1>
            <Bot className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-6">
            {t('saveWorkouts')}
          </p>
          
          {/* زر الانتقال لصفحة الوجبات */}
          <Button 
            onClick={() => navigate('/meals')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-3 rounded-full"
          >
            <Utensils className="w-6 h-6 mr-2" />
            {t('smartMealPlan')}
          </Button>
        </div>

        <Tabs defaultValue="workout" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="workout" className="text-white data-[state=active]:bg-orange-500">
              {t('exerciseManagement')}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-blue-500">
              {t('calendar')}
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-white data-[state=active]:bg-purple-500">
              {t('aiAssistant')}
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="text-white data-[state=active]:bg-green-500">
              {t('smartSuggestions')}
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
                <h3 className="text-2xl font-bold text-white mb-4">{t('todayStats')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{exercises.length}</div>
                    <div className="text-blue-200">{t('exercise')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">
                      {exercises.reduce((total, ex) => total + (ex.sets * ex.reps), 0)}
                    </div>
                    <div className="text-blue-200">{t('totalReps')}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="max-w-7xl mx-auto">
              <WorkoutCalendar exercises={exercises} />
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="max-w-4xl mx-auto">
              <EnhancedAIAssistant 
                exercises={exercises}
                onAddExercise={addExercise}
              />
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
