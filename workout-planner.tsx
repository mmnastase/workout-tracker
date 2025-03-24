import { Card, CardTitle, CardHeader, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Edit, Info, Plus, Trash2 } from "lucide-react";
import { WorkoutPlan } from "./workout.model";
import { useState } from "react";

export function WorkoutPlanner({
  selectedPlan,
  handleActiveTab,
  handleSelectedPlan,
  handleDeletePlan,
}: {
  selectedPlan: WorkoutPlan;
  handleActiveTab: (tab: string) => void;
  handleSelectedPlan: (plan: any) => void;
  handleDeletePlan: (id: string) => void;
}) {
  const [dateEditMode, setDateEditMode] = useState(false);

  function updatePlanName(name: string) {}
  function toggleDateEditMode() {}
  function updatePlanDate(date: string) {}
  function addExercise() {}
  function updateExercise(id: string, key: string, value: string) {}
  function removeExercise(id: string) {}
  function openExerciseVideo(exercise: string) {}

  return (
    <Card className="bg-zinc-800 border-zinc-700 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-zinc-100">Edit Workout Plan</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              handleActiveTab("calendar");
              handleSelectedPlan(null);
            }}
            className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 rounded-none"
          >
            Back to Calendar
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeletePlan(selectedPlan.id)}
            className="flex items-center gap-1 bg-red-900 hover:bg-red-800 text-zinc-100 rounded-none"
          >
            <Trash2 className="h-4 w-4" /> Delete Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="plan-name" className="text-zinc-200">
            Plan Name
          </Label>
          <Input
            id="plan-name"
            placeholder="My Workout Plan"
            value={selectedPlan.name}
            onChange={(e) => updatePlanName(e.target.value)}
            required
            className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none focus:border-zinc-500 focus:ring-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="workout-date" className="text-zinc-200">
              Workout Date
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleDateEditMode}
              className="h-8 px-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-none"
            >
              <Edit className="h-4 w-4 mr-1" />
              {dateEditMode ? "Done" : "Edit"}
            </Button>
          </div>
          <Input
            id="workout-date"
            type="date"
            value={selectedPlan.date}
            onChange={(e) => updatePlanDate(e.target.value)}
            disabled={!dateEditMode}
            required
            className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none focus:border-zinc-500 focus:ring-zinc-500 disabled:bg-zinc-800 disabled:text-zinc-400"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-zinc-200">Exercises</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addExercise}
              className="flex items-center gap-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border-zinc-600 rounded-none"
            >
              <Plus className="h-4 w-4" /> Add Exercise
            </Button>
          </div>

          {selectedPlan.exercises.map((ex) => (
            <div key={ex.id} className="p-4 border border-zinc-700 bg-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,auto] gap-4 items-end">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`exercise-${ex.id}`}
                      className="text-zinc-200"
                    >
                      Exercise
                    </Label>
                    {ex.exercise && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700"
                        onClick={() => openExerciseVideo(ex.exercise)}
                      >
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Exercise Info</span>
                      </Button>
                    )}
                  </div>
                  <Select
                    value={ex.exercise}
                    onValueChange={(value) =>
                      updateExercise(ex.id, "exercise", value)
                    }
                    required
                  >
                    <SelectTrigger
                      id={`exercise-${ex.id}`}
                      className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none focus:ring-zinc-500"
                    >
                      <SelectValue placeholder="Select an exercise" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none">
                      <SelectItem value="squat" className="focus:bg-zinc-700">
                        Squat
                      </SelectItem>
                      <SelectItem
                        value="bench-press"
                        className="focus:bg-zinc-700"
                      >
                        Bench Press
                      </SelectItem>
                      <SelectItem
                        value="deadlift"
                        className="focus:bg-zinc-700"
                      >
                        Deadlift
                      </SelectItem>
                      <SelectItem
                        value="overhead-press"
                        className="focus:bg-zinc-700"
                      >
                        Overhead Press
                      </SelectItem>
                      <SelectItem
                        value="barbell-row"
                        className="focus:bg-zinc-700"
                      >
                        Barbell Row
                      </SelectItem>
                      <SelectItem value="pull-up" className="focus:bg-zinc-700">
                        Pull Up
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`reps-${ex.id}`} className="text-zinc-200">
                    Reps
                  </Label>
                  <Input
                    id={`reps-${ex.id}`}
                    type="number"
                    min="1"
                    placeholder="Reps"
                    value={ex.reps}
                    onChange={(e) =>
                      updateExercise(ex.id, "reps", e.target.value)
                    }
                    required
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none focus:border-zinc-500 focus:ring-zinc-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`weight-${ex.id}`} className="text-zinc-200">
                    Weight (lbs)
                  </Label>
                  <Input
                    id={`weight-${ex.id}`}
                    type="number"
                    min="0"
                    step="2.5"
                    placeholder="Weight"
                    value={ex.weight}
                    onChange={(e) =>
                      updateExercise(ex.id, "weight", e.target.value)
                    }
                    required
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none focus:border-zinc-500 focus:ring-zinc-500"
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="self-end text-red-400 hover:text-red-300 hover:bg-zinc-700 rounded-none"
                  onClick={() => removeExercise(ex.id)}
                  disabled={selectedPlan.exercises.length <= 1}
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove exercise</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
