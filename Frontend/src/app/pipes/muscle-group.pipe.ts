import { Pipe, PipeTransform } from '@angular/core';
import { MuscleGroup } from '../class/exercise';

@Pipe({
  name: 'muscleGroup',
})
export class MuscleGroupPipe implements PipeTransform {
  transform(muscleGroup: MuscleGroup, ...args: unknown[]): unknown {
    switch (muscleGroup) {
      case MuscleGroup.BACK:
        return 'Back';
      case MuscleGroup.CHEST:
        return 'Chest';
      case MuscleGroup.SHOULDERS:
        return 'Shoulders';
      case MuscleGroup.BICEPS:
        return 'Biceps';
      case MuscleGroup.TRICEPS:
        return 'Triceps';
      case MuscleGroup.LEGS:
        return 'Legs';
      case MuscleGroup.CORE:
        return 'Core';
      case MuscleGroup.CARDIO:
        return 'Cardio';
    }
  }
}
