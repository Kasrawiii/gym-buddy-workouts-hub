
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Target, Save } from "lucide-react";
import { NutritionGoals } from "@/types/meal";

interface NutritionGoalsFormProps {
  currentGoals: NutritionGoals | null;
  onUpdateGoals: (goals: NutritionGoals) => void;
}

const NutritionGoalsForm = ({ currentGoals, onUpdateGoals }: NutritionGoalsFormProps) => {
  const [formData, setFormData] = useState({
    currentWeight: currentGoals?.currentWeight || 70,
    targetWeight: currentGoals?.targetWeight || 65,
    height: currentGoals?.height || 170,
    age: currentGoals?.age || 25,
    gender: currentGoals?.gender || 'male' as 'male' | 'female',
    activity: currentGoals?.activity || 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
    goal: currentGoals?.goal || 'maintain' as 'lose' | 'maintain' | 'gain'
  });

  const [calculatedGoals, setCalculatedGoals] = useState({
    dailyCalories: currentGoals?.dailyCalories || 2000,
    dailyProtein: currentGoals?.dailyProtein || 140,
    dailyCarbs: currentGoals?.dailyCarbs || 250,
    dailyFat: currentGoals?.dailyFat || 65
  });

  // حساب الاحتياجات الغذائية
  const calculateNutrition = () => {
    // حساب BMR باستخدام معادلة Mifflin-St Jeor
    let bmr;
    if (formData.gender === 'male') {
      bmr = 88.362 + (13.397 * formData.currentWeight) + (4.799 * formData.height) - (5.677 * formData.age);
    } else {
      bmr = 447.593 + (9.247 * formData.currentWeight) + (3.098 * formData.height) - (4.330 * formData.age);
    }

    // معامل النشاط
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let totalCalories = bmr * activityMultipliers[formData.activity];

    // تعديل السعرات حسب الهدف
    if (formData.goal === 'lose') {
      totalCalories -= 500; // عجز 500 سعرة لخسارة 0.5 كيلو أسبوعياً
    } else if (formData.goal === 'gain') {
      totalCalories += 500; // فائض 500 سعرة لزيادة 0.5 كيلو أسبوعياً
    }

    // حساب الماكروز
    const protein = formData.currentWeight * 2.2; // 2.2 جرام لكل كيلو
    const fat = (totalCalories * 0.25) / 9; // 25% من السعرات = دهون
    const carbs = (totalCalories - (protein * 4) - (fat * 9)) / 4; // الباقي كارب

    setCalculatedGoals({
      dailyCalories: Math.round(totalCalories),
      dailyProtein: Math.round(protein),
      dailyCarbs: Math.round(carbs),
      dailyFat: Math.round(fat)
    });
  };

  useEffect(() => {
    calculateNutrition();
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const goals: NutritionGoals = {
      ...formData,
      ...calculatedGoals
    };
    onUpdateGoals(goals);
  };

  return (
    <div className="space-y-6">
      {/* نموذج البيانات الشخصية */}
      <Card className="bg-white/10 backdrop-blur-sm border-teal-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-teal-400" />
            حاسبة الاحتياجات الغذائية
          </CardTitle>
          <CardDescription className="text-teal-200">
            أدخل بياناتك لحساب احتياجاتك الغذائية اليومية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentWeight" className="text-white">الوزن الحالي (كيلو)</Label>
                <Input
                  id="currentWeight"
                  type="number"
                  value={formData.currentWeight}
                  onChange={(e) => handleInputChange('currentWeight', Number(e.target.value))}
                  className="bg-white/10 border-teal-400/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="targetWeight" className="text-white">الوزن المطلوب (كيلو)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) => handleInputChange('targetWeight', Number(e.target.value))}
                  className="bg-white/10 border-teal-400/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="height" className="text-white">الطول (سم)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', Number(e.target.value))}
                  className="bg-white/10 border-teal-400/30 text-white"
                />
              </div>

              <div>
                <Label htmlFor="age" className="text-white">العمر</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', Number(e.target.value))}
                  className="bg-white/10 border-teal-400/30 text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white">الجنس</Label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full p-2 rounded-md bg-white/10 border border-teal-400/30 text-white"
                >
                  <option value="male" className="bg-gray-800">ذكر</option>
                  <option value="female" className="bg-gray-800">أنثى</option>
                </select>
              </div>

              <div>
                <Label className="text-white">مستوى النشاط</Label>
                <select
                  value={formData.activity}
                  onChange={(e) => handleInputChange('activity', e.target.value)}
                  className="w-full p-2 rounded-md bg-white/10 border border-teal-400/30 text-white"
                >
                  <option value="sedentary" className="bg-gray-800">قليل الحركة</option>
                  <option value="light" className="bg-gray-800">نشاط خفيف</option>
                  <option value="moderate" className="bg-gray-800">نشاط معتدل</option>
                  <option value="active" className="bg-gray-800">نشاط عالي</option>
                  <option value="very_active" className="bg-gray-800">نشاط عالي جداً</option>
                </select>
              </div>

              <div>
                <Label className="text-white">الهدف</Label>
                <select
                  value={formData.goal}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  className="w-full p-2 rounded-md bg-white/10 border border-teal-400/30 text-white"
                >
                  <option value="lose" className="bg-gray-800">إنقاص الوزن</option>
                  <option value="maintain" className="bg-gray-800">الحفاظ على الوزن</option>
                  <option value="gain" className="bg-gray-800">زيادة الوزن</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الأهداف المحسوبة */}
      <Card className="bg-white/10 backdrop-blur-sm border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-green-400" />
            أهدافك الغذائية اليومية
          </CardTitle>
          <CardDescription className="text-green-200">
            محسوبة بناءً على بياناتك الشخصية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {calculatedGoals.dailyCalories}
              </div>
              <div className="text-orange-200">سعرة حرارية</div>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {calculatedGoals.dailyProtein}
              </div>
              <div className="text-blue-200">جرام بروتين</div>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {calculatedGoals.dailyCarbs}
              </div>
              <div className="text-yellow-200">جرام كارب</div>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {calculatedGoals.dailyFat}
              </div>
              <div className="text-red-200">جرام دهون</div>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            حفظ الأهداف
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionGoalsForm;
