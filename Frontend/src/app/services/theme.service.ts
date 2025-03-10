import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'theme'; // Key to use on localstorage

  constructor() {}

  getCurrentTheme(): string {
    return localStorage.getItem(this.themeKey) || 'light';
  }

  setTheme(theme: string): void {
    const element: HTMLElement = document.documentElement;
    if (theme === 'dark') {
      element.classList.add(theme);
    } else {
      element.classList.remove('dark');
    }

    localStorage.setItem(this.themeKey, theme);
  }
}
