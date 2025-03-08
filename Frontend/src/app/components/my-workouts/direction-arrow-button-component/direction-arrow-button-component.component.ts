import {
  animate,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-direction-arrow-button-component',
  imports: [],
  templateUrl: './direction-arrow-button-component.component.html',
  styleUrl: './direction-arrow-button-component.component.css',
  animations: [
    trigger('messageChange', [
      transition(':increment', [
        sequence([
          animate('0.1s ease-out', style({ transform: 'translateX(-100%)' })),
          style({ transform: 'translateX(100%)' }),
          animate('0.1s ease-in', style({ transform: 'translateX(0)' })),
        ]),
      ]),
      transition(':decrement', [
        sequence([
          animate('0.1s ease-out', style({ transform: 'translateX(100%)' })),
          style({ transform: 'translateX(-100%)' }),
          animate('0.1s ease-in', style({ transform: 'translateX(0)' })),
        ]),
      ]),
    ]),
  ],
})
export class DirectionArrowButtonComponentComponent {
  @Input({ required: true }) message: string = '';
  changeMsg = output<string>();

  currentIndex: number = 1;

  changeMessage(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.currentIndex = this.currentIndex - 1;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
    this.changeMsg.emit(direction);
  }
}
