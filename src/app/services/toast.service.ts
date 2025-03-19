import { Injectable, signal } from '@angular/core';
import { Toast } from '../shared/models/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);
  public getToasts = this.toasts.asReadonly();

  public showToast(
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
    duration = 8000
  ) {
    this.toasts.update((toasts) => [...toasts, { message, type }]);

    setTimeout(() => {
      this.removeToast(message);
    }, duration);
  }

  private removeToast(message: string) {
    this.toasts.update((toasts) => toasts.filter((t) => t.message !== message));
  }
}
