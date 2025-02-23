export enum MuscleGroup {
  BACK,
  CHEST,
  SHOULDERS,
  BICEPS,
  TRICEPS,
  LEGS,
  CORE,
  CARDIO,
}

export class Exercise {
  public name: string;

  public sets: number;

  public reps: number | null;
  public weight: number | null;
  public rir: number | null;
  public completed: boolean;

  public muscleGroup: MuscleGroup;

  public constructor(
    name: string,
    {
      muscleGroup = MuscleGroup.BACK,
      sets = 0,
      reps = 0,
      weight = 0,
      rir = 0,
      completed = false,
    }: {
      muscleGroup?: MuscleGroup;
      sets?: number;
      reps?: number | null;
      weight?: number | null;
      rir?: number | null;
      completed?: boolean;
    }
  ) {
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.sets = sets;
    this.reps = reps;
    this.weight = weight;
    this.rir = rir;
    this.completed = completed;
  }
}
