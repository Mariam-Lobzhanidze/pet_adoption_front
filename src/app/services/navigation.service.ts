import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public previousUrl = signal<string>('/home');
  constructor(private router: Router) {}
  public setPreviousUrl(url: string) {
    this.previousUrl.set(url);
  }

  public scrollToTop() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
