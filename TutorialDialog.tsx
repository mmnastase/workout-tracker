import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import {
  useTutorialDialog,
  useTutorialDispatch,
} from "./TutorialDialogProvider";

export function TutorialDialog() {
  const { isOpen, selectedExercise, exerciseVideos } = useTutorialDialog();
  const dispatch = useTutorialDispatch();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) =>
        dispatch({
          type: open ? "OPEN" : "CLOSE",
          payload: { selectedExercise },
        })
      }
    >
      <DialogContent className="sm:max-w-[700px] bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none">
        <DialogTitle className="text-zinc-100">Exercise Tutorial</DialogTitle>
        {selectedExercise && exerciseVideos[selectedExercise] && (
          <>
            <DialogHeader>
              <DialogTitle className="text-zinc-100">
                {exerciseVideos[selectedExercise].title}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                {exerciseVideos[selectedExercise].description}
              </DialogDescription>
            </DialogHeader>
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${exerciseVideos[selectedExercise].videoId}`}
                title={exerciseVideos[selectedExercise].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video"
              ></iframe>
            </div>
            <DialogFooter>
              <Button
                onClick={() =>
                  dispatch({
                    type: "CLOSE",
                    payload: { selectedExercise: null },
                  })
                }
                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-none"
              >
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
