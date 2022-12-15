import { api } from "./session";

export function getWorkouts() {
  return api<ListEnvelope<Workout>>('workouts');
}

export function getWorkout(id: string) {
  return api<Workout>(`workouts/${id}`)
}

export function addWorkout(workout: Workout) {
    return api<Workout>(`workouts`, workout);
}

export function updateWorkout(id: string, workout: Workout) {
    return api<Workout>(`workouts/${id}`, workout, 'PATCH');
}

export function deleteWorkout(id: string) {
    return api<{deletedCount:boolean}>(`workouts/${id}`,{}, 'DELETE');
}

export interface ListEnvelope<T> {
    workouts: T[]
    // total: number
    // skip: number
    // limit: number
}
  
export interface Workout {
    _id: string
    workoutName: string,
    workoutType: string,
    exercise: string,
    sets: number,
    reps: number,
    weight: number,
    type: string,
    distance: number,
    duration: number,
    pace: number
}
