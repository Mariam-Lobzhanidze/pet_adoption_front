import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [NgClass, RouterLink],
})
export class SidebarComponent implements AfterViewInit {
  @Input() offcanvasId: string = 'offcanvasMobileNav';
  @Input({ required: true }) offcanvasPosition:
    | 'start'
    | 'end'
    | 'bottom'
    | 'top' = 'start';

  @ViewChild('offcanvasElement', { static: false })
  offcanvasElement!: ElementRef;
  private offcanvasInstance!: Offcanvas;

  public ngAfterViewInit() {
    if (this.offcanvasElement) {
      this.offcanvasInstance = new Offcanvas(
        this.offcanvasElement.nativeElement
      );
    }
  }

  public open(): void {
    this.offcanvasInstance.show();
  }

  public close(): void {
    this.offcanvasInstance.hide();
  }

  public get offcanvasPositionClass(): string {
    return `offcanvas-${this.offcanvasPosition}`;
  }
}
