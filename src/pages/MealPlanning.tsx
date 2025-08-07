
import { useState } from "react";
import { Utensils, Calculator, Bot, ChefHat, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import MealForm from "@/components/MealForm";
import MealList from "@/components/MealList";
import NutritionTracker from "@/components/NutritionTracker";
import EnhancedAIAssistant from "@/components/EnhancedAIAssistant";
import NutritionGoalsForm from "@/components/NutritionGoalsForm";
import { Meal, NutritionGoals } from "@/types/meal";

const MealPlanning = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString(),
    };
    setMeals(prev => [...prev, newMeal]);
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  const updateNutritionGoals = (goals: NutritionGoals) => {
    setNutritionGoals(goals);
  };

  const todayMeals = meals.filter(meal => {
    const today = new Date();
    const mealDate = new Date(meal.mealDate);
    return mealDate.toDateString() === today.toDateString();
  });

  const todayStats = todayMeals.reduce((stats, meal) => ({
    calories: stats.calories + meal.calories,
    protein: stats.protein + meal.protein,
    carbs: stats.carbs + meal.carbs,
    fat: stats.fat + meal.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      <div className="container mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className={`text-center mb-12 animate-fade-in ${language === 'ar' ? 'direction-rtl' : 'direction-ltr'}`}>
          {/* زر العودة */}
          <div className="flex justify-start mb-6">
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToMain')}
            </Button>
          </div>
          
          <div className="flex justify-center items-center gap-3 mb-4">
            <Utensils className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              {t('smartMealPlanner')}
            </h1>
            <ChefHat className="w-12 h-12 text-emerald-400" />
          </div>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            {t('planMealsPlan')}
          </p>
        </div>

        <Tabs defaultValue="meals" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="meals" className="text-white data-[state=active]:bg-green-500">
              {t('mealManagement')}
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-white data-[state=active]:bg-emerald-500">
              {t('nutritionTracking')}
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-white data-[state=active]:bg-teal-500">
              {t('nutritionGoals')}
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-white data-[state=active]:bg-purple-500">
              {t('aiAssistant')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meals">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Meal Form */}
              <div className="space-y-6">
                <MealForm onAddMeal={addMeal} />
              </div>

              {/* Meal List */}
              <div className="space-y-6">
                <MealList 
                  meals={meals} 
                  onDeleteMeal={deleteMeal}
                />
              </div>
            </div>

            {/* Today's Stats */}
            <div className="mt-16 text-center animate-fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-6">{t('todayNutrition')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{todayStats.calories}</div>
                    <div className="text-green-200">{t('calories')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{todayStats.protein.toFixed(1)}</div>
                    <div className="text-green-200">{t('protein')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{todayStats.carbs.toFixed(1)}</div>
                    <div className="text-green-200">{t('carbs')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400">{todayStats.fat.toFixed(1)}</div>
                    <div className="text-green-200">{t('fat')}</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrition">
            <div className="max-w-6xl mx-auto">
              <NutritionTracker 
                meals={meals} 
                nutritionGoals={nutritionGoals}
              />
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="max-w-4xl mx-auto">
              <NutritionGoalsForm 
                currentGoals={nutritionGoals}
                onUpdateGoals={updateNutritionGoals}
              />
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="max-w-4xl mx-auto">
              <EnhancedAIAssistant 
                meals={meals}
                onAddMeal={addMeal}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanning;
