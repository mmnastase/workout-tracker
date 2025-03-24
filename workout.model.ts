import { format } from "date-fns";

export type Exercise = {
    id: string;
    exercise: string;
    reps: string;
    weight: string;
};

export type WorkoutPlan = {
    id: string;
    date: string;
    name: string;
    exercises: Exercise[];
};

export const EXERCISE_VIDEOS: Record<
  string,
  { title: string; videoId: string; description: string }
> = {
  squat: {
    title: "How to Squat Properly",
    videoId: "U3HlEF_E9fo",
    description:
      "The squat is a compound exercise that targets the quadriceps, hamstrings, and glutes.",
  },
  "bench-press": {
    title: "Proper Bench Press Technique",
    videoId: "rxD321l2svE",
    description:
      "The bench press is a compound exercise that targets the chest, shoulders, and triceps.",
  },
  deadlift: {
    title: "How to Deadlift Properly",
    videoId: "hCDzSR6bW10",
    description:
      "The deadlift is a compound exercise that targets the back, glutes, and hamstrings.",
  },
  "overhead-press": {
    title: "Overhead Press Tutorial",
    videoId: "QAQ64hK4Xxs",
    description:
      "The overhead press is a compound exercise that targets the shoulders and triceps.",
  },
  "barbell-row": {
    title: "Barbell Row Technique",
    videoId: "T3N-TO4reLQ",
    description:
      "The barbell row is a compound exercise that targets the back and biceps.",
  },
  "pull-up": {
    title: "Pull-Up Tutorial",
    videoId: "eGo4IYlbE5g",
    description:
      "The pull-up is a compound exercise that targets the back, biceps, and shoulders.",
  },
};

// Sample workout plans
export const initialWorkoutPlans: WorkoutPlan[] = [
  {
    id: crypto.randomUUID(),
    date: format(new Date(), "yyyy-MM-dd"),
    name: "Full Body Workout",
    exercises: [
      { id: crypto.randomUUID(), exercise: "squat", reps: "5", weight: "225" },
      {
        id: crypto.randomUUID(),
        exercise: "bench-press",
        reps: "8",
        weight: "185",
      },
      {
        id: crypto.randomUUID(),
        exercise: "deadlift",
        reps: "3",
        weight: "315",
      },
      { id: crypto.randomUUID(), exercise: "pull-up", reps: "10", weight: "0" },
    ],
  },
  {
    id: crypto.randomUUID(),
    date: format(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    name: "Upper Body Focus",
    exercises: [
      {
        id: crypto.randomUUID(),
        exercise: "bench-press",
        reps: "5",
        weight: "195",
      },
      {
        id: crypto.randomUUID(),
        exercise: "overhead-press",
        reps: "8",
        weight: "135",
      },
      {
        id: crypto.randomUUID(),
        exercise: "barbell-row",
        reps: "8",
        weight: "155",
      },
      { id: crypto.randomUUID(), exercise: "pull-up", reps: "12", weight: "0" },
    ],
  },
  {
    id: crypto.randomUUID(),
    date: format(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    name: "Lower Body Focus",
    exercises: [
      { id: crypto.randomUUID(), exercise: "squat", reps: "5", weight: "245" },
      {
        id: crypto.randomUUID(),
        exercise: "deadlift",
        reps: "5",
        weight: "335",
      },
    ],
  },
];