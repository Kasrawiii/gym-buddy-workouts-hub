
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Dumbbell } from "lucide-react";
import { Exercise } from "@/types/exercise";
import { format, isSameDay } from "date-fns";
import { ar } from "date-fns/locale";

interface WorkoutCalendarProps {
  exercises: Exercise[];
}

const WorkoutCalendar = ({ exercises }: WorkoutCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // الحصول على التمارين للتاريخ المحدد
  const getExercisesForDate = (date: Date) => {
    return exercises.filter(exercise => 
      isSameDay(new Date(exercise.workoutDate), date)
    );
  };

  // الحصول على التواريخ التي تحتوي على تمارين
  const getWorkoutDates = () => {
    return exercises.map(exercise => new Date(exercise.workoutDate));
  };

  const selectedDateExercises = selectedDate ? getExercisesForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <CalendarIcon className="w-8 h-8 text-orange-500" />
          تقويم التمارين
        </h2>
        <p className="text-blue-200">
          تتبع تماريnak اليومية واختر التواريخ المناسبة
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* التقويم */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">اختر التاريخ</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ar}
              className="bg-white/5 rounded-lg p-4 text-white"
              modifiers={{
                workout: getWorkoutDates(),
              }}
              modifiersStyles={{
                workout: {
                  backgroundColor: 'rgba(249, 115, 22, 0.3)',
                  border: '2px solid rgb(249, 115, 22)',
                  borderRadius: '6px',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* تمارين التاريخ المحدد */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-orange-500" />
              {selectedDate ? format(selectedDate, 'EEEE، d MMMM yyyy', { locale: ar }) : 'اختر تاريخ'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateExercises.length > 0 ? (
              <div className="space-y-3">
                {selectedDateExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="bg-white/10 rounded-lg p-4 border border-white/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-semibold">{exercise.name}</h4>
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                        {exercise.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <span className="text-blue-200">{exercise.sets} مجموعات</span>
                      <span className="text-blue-200">{exercise.reps} تكرار</span>
                      <span className="text-blue-200">{exercise.weight} كيلو</span>
                    </div>
                    {exercise.notes && (
                      <p className="text-blue-300 text-sm mt-2">{exercise.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-blue-400 mx-auto mb-4 opacity-50" />
                <p className="text-blue-200">لا توجد تمارين في هذا التاريخ</p>
                <p className="text-blue-300 text-sm mt-2">
                  يمكنك إضافة تمارين جديدة من تبويب "إدارة التمارين"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات التقويم */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {new Set(exercises.map(ex => format(new Date(ex.workoutDate), 'yyyy-MM-dd'))).size}
              </div>
              <div className="text-blue-200 text-sm">أيام التمرين</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">{exercises.length}</div>
              <div className="text-blue-200 text-sm">إجمالي التمارين</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {exercises.reduce((total, ex) => total + ex.sets, 0)}
              </div>
              <div className="text-blue-200 text-sm">إجمالي المجموعات</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500">
                {exercises.reduce((total, ex) => total + (ex.sets * ex.reps), 0)}
              </div>
              <div className="text-blue-200 text-sm">إجمالي التكرارات</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutCalendar;
