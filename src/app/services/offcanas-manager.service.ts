import { Injectable } from '@angular/core';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

@Injectable({ providedIn: 'root' })
export class OffcanvasManagerService {
  private currentOffcanvas: Offcanvas | null = null;

  register(offcanvas: Offcanvas): void {
    if (this.currentOffcanvas && this.currentOffcanvas !== offcanvas) {
      this.currentOffcanvas.hide();
    }
    this.currentOffcanvas = offcanvas;
    console.log('register', this.currentOffcanvas);
  }

  unregister(offcanvas: Offcanvas): void {
    console.log('unregister', offcanvas);

    if (this.currentOffcanvas === offcanvas) {
      this.currentOffcanvas = null;
    }
  }

  closeCurrent(): void {
    console.log('close current', this.currentOffcanvas);

    this.currentOffcanvas?.hide();
    this.currentOffcanvas = null;
  }
}
