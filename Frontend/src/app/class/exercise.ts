export enum MuscleGroup {
  BACK = 'BACK',
  CHEST = 'CHEST',
  SHOULDERS = 'SHOULDERS',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
  LEGS = 'LEGS',
  CORE = 'CORE',
  CARDIO = 'CARDIO',
}

export class Exercise {
  public name: string;

  public sets: number;

  public reps: number;
  public weight: number;
  public rir: number;
  public completed: boolean;

  public muscleGroup: MuscleGroup;

  public constructor(
    name: string,
    muscleGroup = MuscleGroup.BACK,
    sets = 0,
    reps = 0,
    weight = 0,
    rir = 0,
    completed = false
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
