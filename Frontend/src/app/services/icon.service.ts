import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconMap: { [key: number]: string } = {
    0: '/icons/bodybuilder.png',
    1: '/icons/dumbbell.png',
    2: '/icons/octopus.png',
    3: '/icons/training.png',
    4: '/icons/weightlifting.png',
  };

  constructor() {}

  getIconUrl(iconId: number): string {
    return this.iconMap[iconId];
  }
}
