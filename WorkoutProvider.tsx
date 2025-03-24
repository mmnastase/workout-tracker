import {
  Context,
  createContext,
  Dispatch,
  useContext,
  useReducer,
} from "react";
import { WorkoutPlan } from "./workout.model";
import { initialWorkoutPlans } from "./workout.model";

const initialWorkoutState: WorkoutState = {
  workouts: initialWorkoutPlans,
  selectedWorkoutId: null,
};

const WorktoutContext = createContext(initialWorkoutState);
const WorkoutDispatchContext: Context<Dispatch<WorkoutAction>> = createContext(
  {} as Dispatch<WorkoutAction>
);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workout, dispatch] = useReducer(workoutReducer, initialWorkoutState);
  return (
    <WorktoutContext.Provider value={workout}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorktoutContext.Provider>
  );
}

export interface WorkoutState {
  workouts: WorkoutPlan[];
  selectedWorkoutId: string | null;
}

interface WorkoutAction {
  type: "ADD_WORKOUT" | "REMOVE_WORKOUT" | "SELECT_WORKOUT" | "DUMMY";
  payload: any;
}

const workoutReducer = (workoutState: WorkoutState, action: WorkoutAction) => {
  switch (action.type) {
    case "ADD_WORKOUT":
      return {
        ...workoutState,
        workouts: [...workoutState.workouts, action.payload],
      };
    case "REMOVE_WORKOUT":
      return {
        ...workoutState,
        workouts: workoutState.workouts.filter(
          (workout) => workout.id !== action.payload
        ),
      };
    case "SELECT_WORKOUT":
      return {
        ...workoutState,
        selectedWorkoutId: action.payload,
      };
    default:
      throw Error("Action not supported");
  }
};

export function useWorkouts() {
  return useContext(WorktoutContext);
}
export function useWorkoutDispatch() {
  return useContext(WorkoutDispatchContext);
}
