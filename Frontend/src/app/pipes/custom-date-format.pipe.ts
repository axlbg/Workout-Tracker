import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat',
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(date: Date | string, showDay: boolean = true): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      ...(showDay && { weekday: 'long' }),
    };

    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(
      new Date(date)
    );
    return formattedDate;
  }
}
