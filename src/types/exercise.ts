
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  category: string;
  notes?: string;
  createdAt: Date;
}

export type ExerciseCategory = 
  | "صدر"
  | "ظهر" 
  | "كتف"
  | "ذراع"
  | "رجل"
  | "بطن"
  | "كارديو";
