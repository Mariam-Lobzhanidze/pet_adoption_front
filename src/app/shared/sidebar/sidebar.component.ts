import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import { NavigationService } from '../../services/navigation.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { OffcanvasManagerService } from '../../services/offcanas-manager.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [NgClass],
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @Input() offcanvasId: string = 'offcanvasMobileNav';
  @Input() offcanvasBodyColor: string = '';
  @Input({ required: true }) offcanvasPosition:
    | 'start'
    | 'end'
    | 'bottom'
    | 'top' = 'start';

  private destroy$ = new Subject<void>();

  @ViewChild('offcanvasElement', { static: false })
  offcanvasElement!: ElementRef;
  private offcanvasInstance!: Offcanvas;

  private previousUrl: string = '/home';

  public constructor(
    private router: Router,
    private navigationService: NavigationService,
    private renderer: Renderer2,
    private offcanvasManager: OffcanvasManagerService
  ) {}

  public ngAfterViewInit() {
    if (this.offcanvasElement?.nativeElement) {
      this.offcanvasInstance = new Offcanvas(
        this.offcanvasElement.nativeElement
      );

      //
      this.offcanvasManager.register(this.offcanvasInstance);

      this.previousUrl = this.navigationService.previousUrl();
    }

    this.listenToNavigationUpdate();
  }

  private listenToNavigationUpdate() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        if (!(event as NavigationEnd).url.includes('/auth')) {
          this.setBodyStyles('auto', '0px');
        }
      });
  }

  public onSidebarHidden() {
    this.offcanvasManager.unregister(this.offcanvasInstance);
  }

  public onSidebarShown() {
    this.setBodyStyles('hidden', '0px');
  }

  public open(): void {
    this.offcanvasManager.register(this.offcanvasInstance);
    this.offcanvasInstance.show();
  }

  public close(): void {
    this.offcanvasInstance.hide();

    if (this.router.url.includes('/auth')) {
      this.router.navigate([this.previousUrl]);
    }
  }

  private setBodyStyles(overflow: string, paddingRight: string): void {
    this.renderer.setStyle(document.body, 'overflow', overflow);
    this.renderer.setStyle(document.body, 'padding-right', paddingRight);
  }

  public get offcanvasPositionClass(): string {
    return `offcanvas-${this.offcanvasPosition}`;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
