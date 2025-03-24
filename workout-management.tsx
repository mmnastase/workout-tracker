"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WorkoutPlanner } from "./workout-planner";
import { WorkoutPlan } from "./workout.model";
import { WorkoutCalendarDay } from "./WorkoutCalendarDay";
import { useWorkouts, WorkoutProvider } from "./WorkoutProvider";
import { TutorialDialogProvider } from "./TutorialDialogProvider";
import { TutorialDialog } from "./TutorialDialog";

// Exercise video mapping

export default function WorkoutManagement() {
  // const [workoutPlans, setWorkoutPlans] =
  //   useState<WorkoutPlan[]>(initialWorkoutPlans);
  const workoutPlans = useWorkouts();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [dateEditMode, setDateEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("calendar");

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    date: Date | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    date: null,
  });

  // Refs
  const calendarRef = useRef<HTMLDivElement>(null);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Close context menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu.visible) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.documentElement.classList.remove("dark");
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu.visible]);

  // Get the currently selected plan
  const selectedPlan = selectedPlanId
    ? workoutPlans.workouts.find((plan) => plan.id === selectedPlanId)
    : null;

  // Calendar functions
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Get days for current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart);

  // Create calendar grid with empty cells for days before the start of the month
  const calendarDays = Array(startDay).fill(null).concat(monthDays);

  // Group plans by date for calendar view
  const plansByDate = workoutPlans.workouts.reduce((acc, plan) => {
    const date = plan.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(plan);
    return acc;
  }, {} as Record<string, WorkoutPlan[]>);

  // Handle right-click on calendar day
  const handleContextMenu = (e: React.MouseEvent, date: Date | null) => {
    if (!date) return;

    e.preventDefault();

    // Get position relative to the calendar container
    const rect = calendarRef.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setContextMenu({
      visible: true,
      x,
      y,
      date,
    });
  };

  // Create a new workout plan for the selected date
  const createWorkoutForDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const newPlan: WorkoutPlan = {
      id: crypto.randomUUID(),
      date: formattedDate,
      name: "New Workout",
      exercises: [
        { id: crypto.randomUUID(), exercise: "", reps: "", weight: "" },
      ],
    };

    // setWorkoutPlans([...workoutPlans, newPlan]);
    setSelectedPlanId(newPlan.id);
    setActiveTab("editor");
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  // View workouts for a specific date
  const viewWorkoutsForDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const plansForDate = plansByDate[formattedDate] || [];

    if (plansForDate.length === 1) {
      // If there's only one plan, select it and go to editor
      setSelectedPlanId(plansForDate[0].id);
      setActiveTab("editor");
    } else if (plansForDate.length > 1) {
      // If there are multiple plans, we could show a selection dialog
      // For now, just select the first one
      setSelectedPlanId(plansForDate[0].id);
      setActiveTab("editor");
    }

    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  // Functions to manage workout plans
  const addNewPlan = () => {
    const newPlan: WorkoutPlan = {
      id: crypto.randomUUID(),
      date: format(new Date(), "yyyy-MM-dd"),
      name: "New Workout Plan",
      exercises: [
        { id: crypto.randomUUID(), exercise: "", reps: "", weight: "" },
      ],
    };
    // setWorkoutPlans([...workoutPlans, newPlan]);
    setSelectedPlanId(newPlan.id);
    setActiveTab("editor");
  };
  const handleSave = () => {
    console.log("Saving all workout plans:", workoutPlans);
    // Here you would typically save to localStorage, a database, etc.
    alert("Workout plans saved successfully!");
  };

  return (
    <WorkoutProvider>
      <TutorialDialogProvider>
        <div className="min-h-screen bg-zinc-900 text-zinc-100">
          <div className="container mx-auto p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-zinc-100">
                  Workout Planner
                </h1>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-none"
                >
                  <Save className="h-4 w-4" /> Save All Plans
                </Button>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-zinc-800 rounded-none">
                  <TabsTrigger
                    value="calendar"
                    className="rounded-none data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
                  >
                    Calendar View
                  </TabsTrigger>
                  <TabsTrigger
                    value="editor"
                    className="rounded-none data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
                    disabled={!selectedPlan}
                  >
                    Plan Editor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="calendar" className="mt-4">
                  <Card className="bg-zinc-800 border-zinc-700 rounded-none">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={prevMonth}
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-none"
                        >
                          <ChevronLeft className="h-5 w-5" />
                          <span className="sr-only">Previous Month</span>
                        </Button>
                        <CardTitle className="text-zinc-100 text-xl">
                          {format(currentMonth, "MMMM yyyy")}
                        </CardTitle>
                        <Button
                          onClick={nextMonth}
                          variant="ghost"
                          size="icon"
                          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-none"
                        >
                          <ChevronRight className="h-5 w-5" />
                          <span className="sr-only">Next Month</span>
                        </Button>
                      </div>
                      <Button
                        onClick={addNewPlan}
                        className="flex items-center gap-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-none"
                      >
                        <Plus className="h-4 w-4" /> New Workout
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div
                        ref={calendarRef}
                        className="relative grid grid-cols-7 gap-px bg-zinc-700"
                      >
                        {/* Day headers */}
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="p-2 text-center font-medium text-zinc-300 bg-zinc-800"
                            >
                              {day}
                            </div>
                          )
                        )}

                        {/* Calendar days */}
                        {calendarDays.map((day, i) => {
                          return (
                            <WorkoutCalendarDay
                              plansByDate={plansByDate}
                              key={i}
                              day={day}
                              handleContextMenu={handleContextMenu}
                              viewWorkoutsForDate={viewWorkoutsForDate}
                              currentMonth={currentMonth}
                              handleActiveTab={setActiveTab}
                            />
                          );
                        })}

                        {/* Context Menu */}
                        {contextMenu.visible && contextMenu.date && (
                          <div
                            className="absolute bg-zinc-900 border border-zinc-700 shadow-lg z-10"
                            style={{
                              top: `${contextMenu.y}px`,
                              left: `${contextMenu.x}px`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="py-1 text-sm">
                              <div className="px-3 py-2 font-medium border-b border-zinc-800">
                                {format(contextMenu.date, "MMMM d, yyyy")}
                              </div>
                              <button
                                className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                                onClick={() =>
                                  createWorkoutForDate(contextMenu.date!)
                                }
                              >
                                Add New Workout
                              </button>
                              {plansByDate[
                                format(contextMenu.date, "yyyy-MM-dd")
                              ]?.length > 0 && (
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-zinc-800"
                                  onClick={() =>
                                    viewWorkoutsForDate(contextMenu.date!)
                                  }
                                >
                                  View Workouts
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="editor" className="mt-4">
                  <WorkoutPlanner
                    handleActiveTab={setActiveTab}
                    handleSelectedPlan={setSelectedPlanId}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Exercise Video Dialog */}
          <TutorialDialog />
        </div>
      </TutorialDialogProvider>
    </WorkoutProvider>
  );
}
