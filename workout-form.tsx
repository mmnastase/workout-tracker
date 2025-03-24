// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export default function WorkoutForm() {
//   const [exercise, setExercise] = useState("")
//   const [reps, setReps] = useState("")
//   const [weight, setWeight] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log({ exercise, reps, weight })
//     // Here you would typically save the data or perform other actions
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl">Log Workout</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="exercise">Exercise</Label>
//             <Select value={exercise} onValueChange={setExercise} required>
//               <SelectTrigger id="exercise">
//                 <SelectValue placeholder="Select an exercise" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="squat">Squat</SelectItem>
//                 <SelectItem value="bench-press">Bench Press</SelectItem>
//                 <SelectItem value="deadlift">Deadlift</SelectItem>
//                 <SelectItem value="overhead-press">Overhead Press</SelectItem>
//                 <SelectItem value="barbell-row">Barbell Row</SelectItem>
//                 <SelectItem value="pull-up">Pull Up</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="reps">Reps</Label>
//             <Input
//               id="reps"
//               type="number"
//               min="1"
//               placeholder="Number of repetitions"
//               value={reps}
//               onChange={(e) => setReps(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="weight">Weight (lbs)</Label>
//             <Input
//               id="weight"
//               type="number"
//               min="0"
//               step="2.5"
//               placeholder="Weight in pounds"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//               required
//             />
//           </div>
//         </CardContent>

//         <CardFooter>
//           <Button type="submit" className="w-full">
//             Save Exercise
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }

