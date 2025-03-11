import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private guestModeKey = 'guest_mode';

  constructor() {}

  enableGuestMode() {
    localStorage.setItem(this.guestModeKey, 'true');
  }

  disableGuestMode() {
    localStorage.removeItem(this.guestModeKey);
  }

  isGuestMode(): boolean {
    return localStorage.getItem(this.guestModeKey) === 'true';
  }

  getWorkouts(): Observable<any> {
    // Get current date
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Create a date 7 days ago to start the workout
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);

    // Format a date as YYYY-MM-DD
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };

    // Get day of week name
    const getDayOfWeek = (date: Date): string => {
      const days = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ];
      return days[date.getDay()];
    };

    // Create workout days - ensuring at least one day matches current day of week
    const createWorkoutDays = (): any[] => {
      const workoutDays = [];

      // Create a workout on the same day of the week as today
      let dayPattern = [currentDayOfWeek];

      // Add two more workout days (we'll use the next two days after today's day of week)
      dayPattern.push((currentDayOfWeek + 1) % 7);
      dayPattern.push((currentDayOfWeek + 2) % 7);

      // Sort the pattern for consistency
      dayPattern.sort();

      // Mapping for muscle groups based on day position in pattern
      const muscleGroups = ['BACK', 'CHEST', 'SHOULDERS'];

      // Create 4 weeks of workouts
      for (let week = 0; week < 4; week++) {
        for (let dayIndex = 0; dayIndex < dayPattern.length; dayIndex++) {
          const workoutDate = new Date(startDate);
          // Calculate days to add based on week and day pattern
          const daysToAdd =
            week * 7 + ((dayPattern[dayIndex] - startDate.getDay() + 7) % 7);
          workoutDate.setDate(startDate.getDate() + daysToAdd);

          // Create workout day
          const workoutDay: any = {
            id: workoutDays.length + 1,
            date: formatDate(workoutDate),
            dayOfWeek: getDayOfWeek(workoutDate),
            workoutId: 1,
            exercises: [],
          };

          // Simplified exercise generation - use muscle group based on day position
          const muscleGroup = muscleGroups[dayIndex];

          // Create exercises based on muscle group
          const exercises = createExercisesForGroup(
            muscleGroup,
            workoutDays.length,
            week,
            workoutDay.id,
            workoutDate < today
          );

          workoutDay.exercises = exercises;
          workoutDays.push(workoutDay);
        }
      }

      return workoutDays;
    };

    // Helper function to create exercises for a muscle group
    const createExercisesForGroup = (
      muscleGroup: string,
      baseId: number,
      week: number,
      workoutDayId: number,
      completed: boolean
    ): any[] => {
      // Exercise templates based on muscle group
      const exercisesByGroup: { [key: string]: any[] } = {
        BACK: [
          {
            name:
              week === 0
                ? 'Lat Pulldown'
                : week === 1
                ? 'Barbell Row'
                : week === 2
                ? 'T-Bar Row'
                : 'Deadlift',
            sets: 4,
            reps: week === 3 ? 6 : 12 - week,
            weight:
              week === 0 ? 70.0 : week === 1 ? 75.0 : week === 2 ? 60.0 : 130.0,
            rir: 2,
          },
          {
            name:
              week === 0
                ? 'Seated Row'
                : week === 1
                ? 'Pull-ups'
                : week === 2
                ? 'Chin-ups'
                : 'Lat Pulldown',
            sets: 4,
            reps: 10 - (week === 1 || week === 2 ? 2 : 0),
            weight: week === 1 || week === 2 ? 0.0 : week === 0 ? 80.0 : 75.0,
            rir: 1,
          },
          {
            name:
              week === 0
                ? 'Deadlift'
                : week === 1
                ? 'Single-Arm Dumbbell Row'
                : week === 2
                ? 'Cable Rows'
                : 'Seated Row',
            sets: week === 3 ? 3 : 4,
            reps: week === 0 ? 8 : 12,
            weight:
              week === 0 ? 120.0 : week === 1 ? 25.0 : week === 2 ? 65.0 : 85.0,
            rir: week === 0 ? 2 : 1,
          },
        ],
        CHEST: [
          {
            name:
              week === 0
                ? 'Bench Press'
                : week === 1
                ? 'Dumbbell Bench Press'
                : week === 2
                ? 'Incline Bench Press'
                : 'Bench Press',
            sets: 3,
            reps: week === 0 || week === 2 || week === 3 ? 8 : 10,
            weight:
              week === 0 ? 90.0 : week === 1 ? 35.0 : week === 2 ? 75.0 : 95.0,
            rir: 2,
          },
          {
            name:
              week === 0
                ? 'Incline Dumbbell Press'
                : week === 1
                ? 'Push-ups'
                : week === 2
                ? 'Dumbbell Flyes'
                : 'Incline Dumbbell Press',
            sets: 3,
            reps: week === 1 ? 15 : week === 2 ? 12 : 10,
            weight:
              week === 1 ? 0.0 : week === 0 ? 30.0 : week === 2 ? 17.5 : 32.5,
            rir: 1,
          },
          {
            name:
              week === 0
                ? 'Cable Flyes'
                : week === 1
                ? 'Decline Bench Press'
                : week === 2
                ? 'Chest Dips'
                : 'Cable Crossovers',
            sets: 3,
            reps: week === 0 ? 12 : week === 1 ? 8 : week === 2 ? 10 : 12,
            weight:
              week === 2 ? 0.0 : week === 0 ? 15.0 : week === 1 ? 75.0 : 17.5,
            rir: 1,
          },
        ],
        SHOULDERS: [
          {
            name:
              week === 0
                ? 'Overhead Press'
                : week === 1
                ? 'Arnold Press'
                : week === 2
                ? 'Seated Dumbbell Press'
                : 'Military Press',
            sets: week === 0 ? 3 : 4,
            reps: week === 1 ? 10 : 8,
            weight:
              week === 0 ? 50.0 : week === 1 ? 20.0 : week === 2 ? 22.5 : 55.0,
            rir: 2,
          },
          {
            name:
              week === 0 || week === 3
                ? 'Lateral Raises'
                : week === 1
                ? 'Upright Rows'
                : 'Front Raises',
            sets: week === 3 ? 4 : 3,
            reps: 12,
            weight:
              week === 0 || week === 3
                ? week === 0
                  ? 12.5
                  : 15.0
                : week === 1
                ? 30.0
                : 12.5,
            rir: 1,
          },
          {
            name:
              week === 0
                ? 'Face Pulls'
                : week === 1
                ? 'Rear Delt Flyes'
                : week === 2
                ? 'Shrugs'
                : 'Reverse Pec Deck',
            sets: week === 3 ? 4 : 3,
            reps: 15,
            weight:
              week === 0 ? 25.0 : week === 1 ? 10.0 : week === 2 ? 35.0 : 27.5,
            rir: week === 0 ? 2 : 1,
          },
        ],
      };

      // Get exercises for this muscle group
      const exercises = exercisesByGroup[muscleGroup].map((template, index) => {
        return {
          id: baseId * 3 + index + 1,
          name: template.name,
          sets: template.sets,
          reps: template.reps,
          weight: template.weight,
          rir: template.rir,
          completed: completed,
          workoutPerDayId: workoutDayId,
          muscleGroup: muscleGroup,
        };
      });

      return exercises;
    };

    return of([
      {
        id: 1,
        name: '3-Day Split Workout',
        icon: 1,
        workoutPerDays: createWorkoutDays(),
      },
    ]);
  }
}
