import { Component, computed, inject, Signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { Toast } from '../models/toast.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ToastMessageComponent {
  private toastService = inject(ToastService);
  public toasts: Signal<Toast[]> = computed(() =>
    this.toastService.getToasts()
  );
}
