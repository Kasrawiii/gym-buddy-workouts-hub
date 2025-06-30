
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Calendar } from "lucide-react";
import { Meal, NutritionGoals } from "@/types/meal";
import { format, subDays, startOfDay } from "date-fns";
import { ar } from "date-fns/locale";

interface NutritionTrackerProps {
  meals: Meal[];
  nutritionGoals: NutritionGoals | null;
}

const NutritionTracker = ({ meals, nutritionGoals }: NutritionTrackerProps) => {
  // حساب إحصائيات اليوم
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

  // بيانات الأسبوع الماضي
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dayMeals = meals.filter(meal => {
      const mealDate = startOfDay(new Date(meal.mealDate));
      return mealDate.getTime() === date.getTime();
    });

    const dayStats = dayMeals.reduce((stats, meal) => ({
      calories: stats.calories + meal.calories,
      protein: stats.protein + meal.protein,
    }), { calories: 0, protein: 0 });

    return {
      date: format(date, 'dd/MM', { locale: ar }),
      calories: dayStats.calories,
      protein: dayStats.protein,
    };
  });

  // بيانات التوزيع بحسب نوع الوجبة
  const mealDistribution = todayMeals.reduce((acc, meal) => {
    const existing = acc.find(item => item.category === meal.category);
    if (existing) {
      existing.calories += meal.calories;
    } else {
      acc.push({ category: meal.category, calories: meal.calories });
    }
    return acc;
  }, [] as { category: string; calories: number }[]);

  return (
    <div className="space-y-6">
      {/* أهداف اليوم */}
      {nutritionGoals && (
        <Card className="bg-white/10 backdrop-blur-sm border-teal-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-teal-400" />
              تقدمك اليوم
            </CardTitle>
            <CardDescription className="text-teal-200">
              مقارنة بأهدافك الغذائية
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* السعرات الحرارية */}
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>السعرات الحرارية</span>
                  <span>{todayStats.calories} / {nutritionGoals.dailyCalories}</span>
                </div>
                <Progress 
                  value={(todayStats.calories / nutritionGoals.dailyCalories) * 100} 
                  className="h-3 bg-white/10"
                />
                <p className="text-sm text-teal-300">
                  {nutritionGoals.dailyCalories - todayStats.calories > 0 
                    ? `باقي ${nutritionGoals.dailyCalories - todayStats.calories} سعرة`
                    : `تجاوزت بـ ${todayStats.calories - nutritionGoals.dailyCalories} سعرة`
                  }
                </p>
              </div>

              {/* البروتين */}
              <div className="space-y-2">
                <div className="flex justify-between text-white">
                  <span>البروتين (جرام)</span>
                  <span>{todayStats.protein.toFixed(1)} / {nutritionGoals.dailyProtein}</span>
                </div>
                <Progress 
                  value={(todayStats.protein / nutritionGoals.dailyProtein) * 100} 
                  className="h-3 bg-white/10"
                />
                <p className="text-sm text-blue-300">
                  {nutritionGoals.dailyProtein - todayStats.protein > 0 
                    ? `باقي ${(nutritionGoals.dailyProtein - todayStats.protein).toFixed(1)} جرام`
                    : `تجاوزت بـ ${(todayStats.protein - nutritionGoals.dailyProtein).toFixed(1)} جرام`
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* الرسوم البيانية */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* رسم بياني للأسبوع */}
        <Card className="bg-white/10 backdrop-blur-sm border-emerald-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              تقدم الأسبوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="calories" stroke="#f59e0b" strokeWidth={3} />
                <Line type="monotone" dataKey="protein" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* توزيع الوجبات */}
        <Card className="bg-white/10 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              توزيع وجبات اليوم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mealDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="calories" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ملخص التغذية */}
      <Card className="bg-white/10 backdrop-blur-sm border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white">ملخص التغذية اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{todayStats.calories}</div>
              <div className="text-orange-200">سعرة حرارية</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{todayStats.protein.toFixed(1)}</div>
              <div className="text-blue-200">جرام بروتين</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{todayStats.carbs.toFixed(1)}</div>
              <div className="text-yellow-200">جرام كارب</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{todayStats.fat.toFixed(1)}</div>
              <div className="text-red-200">جرام دهون</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTracker;
