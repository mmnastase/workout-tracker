import { createContext, Dispatch, useContext, useReducer } from "react";
import { EXERCISE_VIDEOS } from "./workout.model";

type TutorialDialogContextType = {
  // Define the properties of the context type here
  isOpen: boolean;
  exerciseVideos: Record<
    string,
    { title: string; videoId: string; description: string }
  >;
  selectedExercise: string | null;
};

export interface TutorialAction {
  type: "OPEN" | "CLOSE";
  payload: { selectedExercise: string | null };
}

const initialDialogState = {
  isOpen: false,
  selectedExercise: null,
  exerciseVideos: EXERCISE_VIDEOS,
};
const TutorialContext =
  createContext<TutorialDialogContextType>(initialDialogState);
const TutorialDispatchContext = createContext<Dispatch<TutorialAction>>(
  {} as Dispatch<TutorialAction>
);

export function TutorialDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialog, dispatch] = useReducer(tutorialReducer, initialDialogState);
  return (
    <TutorialContext.Provider value={dialog}>
      <TutorialDispatchContext.Provider value={dispatch}>
        {children}
      </TutorialDispatchContext.Provider>
    </TutorialContext.Provider>
  );
}

function tutorialReducer(
  state: TutorialDialogContextType,
  action: TutorialAction
) {
  debugger;
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        isOpen: true,
        selectedExercise: action.payload.selectedExercise,
      };
    case "CLOSE":
      return {
        ...state,
        isOpen: false,
        selectedExercise: action.payload.selectedExercise,
      };
    default:
      return state;
  }
}

export function useTutorialDialog() {
  return useContext(TutorialContext);
}

export function useTutorialDispatch() {
  return useContext(TutorialDispatchContext);
}
