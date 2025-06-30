
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: MealCategory;
  servingSize: string;
  notes?: string;
  createdAt: Date;
  mealDate: Date;
}

export type MealCategory = 
  | "إفطار"
  | "غداء" 
  | "عشاء"
  | "وجبة خفيفة"
  | "مكملات";

export interface NutritionGoals {
  targetWeight: number;
  currentWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'lose' | 'maintain' | 'gain';
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
}
