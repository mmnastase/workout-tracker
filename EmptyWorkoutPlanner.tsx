import { Button } from "./components/ui/button";

export function EmptyWorkoutPlanner({
  handleAddPlan,
}: {
  handleAddPlan: () => void;
}) {
  return (
    <div className="text-center py-8 text-zinc-300">
      <p>No workout plan selected.</p>
      <Button
        onClick={handleAddPlan}
        className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-none"
      >
        Create New Plan
      </Button>
    </div>
  );
}
