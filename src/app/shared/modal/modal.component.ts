import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() modalId!: string;
  @Input() title!: string;

  @ViewChild('modalRef') modalRef!: ElementRef;

  open() {
    const modalEl = this.modalRef.nativeElement;
    const modal = new Modal(modalEl);
    modal.show();
  }

  close() {
    const modalEl = this.modalRef.nativeElement;
    const modal = Modal.getInstance(modalEl);
    modal?.hide();
  }
}
