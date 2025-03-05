import { Pipe, PipeTransform } from '@angular/core';
import { MuscleGroup } from '../class/exercise';

@Pipe({
  name: 'muscleGroup',
})
export class MuscleGroupPipe implements PipeTransform {
  transform(muscleGroup: MuscleGroup, ...args: unknown[]): string {
    return (
      muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1).toLowerCase()
    );
  }
}
