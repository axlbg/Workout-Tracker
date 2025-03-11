import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showLoading(): void {
    this.messageService.add({
      key: 'loading',
      severity: 'info',
      sticky: true,
      icon: 'pi pi-spin pi-spinner',
    });
  }

  hideLoading() {
    this.messageService.clear('loading');
  }

  showSuccess(message: string) {
    this.messageService.add({
      key: 'toasty',
      severity: 'success',
      summary: message,
      sticky: false,
    });
  }

  showError(message: string) {
    this.messageService.add({
      key: 'toasty',
      severity: 'error',
      summary: message,
      sticky: false,
    });
  }
}
