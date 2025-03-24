import { format, isSameMonth, isToday } from "date-fns";
import { cn } from "./lib/utils";
import { use } from "react";
import { useWorkoutDispatch, useWorkouts } from "./WorkoutProvider";

export function WorkoutCalendarDay({
  day,
  handleContextMenu,
  viewWorkoutsForDate,
  currentMonth,
  plansByDate,
  handleActiveTab,
}: {
  currentMonth: Date;
  day: Date;
  plansByDate: Record<string, any[]>;
  viewWorkoutsForDate: (date: Date) => void;
  handleContextMenu: (e: React.MouseEvent, date: Date) => void;
  handleActiveTab: (tab: string) => void;
}) {
  const dispatch = useWorkoutDispatch();
  const { selectedWorkoutId } = useWorkouts();

  if (!day) {
    // Empty cell for days before the start of the month
    // insert a valid index later instead of Math.random()
    return (
      <div
        key={`empty-${Math.random()}`}
        className="bg-zinc-800 min-h-[100px]"
      />
    );
  }

  const formattedDate = format(day, "yyyy-MM-dd");
  const plansForDay = plansByDate[formattedDate] || [];
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isDayToday = isToday(day);

  function setSelectedPlanId(id: any) {
    console.log("setting workout id to: ", id);
    dispatch({ type: "SELECT_WORKOUT", payload: id });
    handleActiveTab("editor");
  }

  return (
    <div
      key={formattedDate}
      className={cn(
        "bg-zinc-800 min-h-[100px] p-1 relative",
        !isCurrentMonth && "opacity-50",
        isDayToday && "ring-1 ring-inset ring-zinc-500"
      )}
      onClick={() => {
        if (plansForDay.length > 0) {
          viewWorkoutsForDate(day);
        }
      }}
      onContextMenu={(e) => handleContextMenu(e, day)}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn(
            "text-sm p-1",
            isDayToday && "font-bold text-zinc-100",
            !isDayToday && "text-zinc-400"
          )}
        >
          {format(day, "d")}
        </span>
        {plansForDay.length > 0 && (
          <span className="text-xs bg-zinc-700 px-1.5 py-0.5 text-zinc-300">
            {plansForDay.length}
          </span>
        )}
      </div>

      <div className="mt-1 space-y-1">
        {plansForDay.map((plan) => (
          <div
            key={plan.id}
            className="text-xs p-1 bg-zinc-700 text-zinc-200 cursor-pointer hover:bg-zinc-600"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlanId(plan.id);
              // setActiveTab("editor");
            }}
          >
            {plan.name}
          </div>
        ))}
      </div>
    </div>
  );
}
