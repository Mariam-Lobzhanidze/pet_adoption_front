import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public previousUrl = signal<string>('/home');
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (
          e.urlAfterRedirects.startsWith('/pet') ||
          e.urlAfterRedirects.startsWith('/pets/search')
        ) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
  public setPreviousUrl(url: string) {
    this.previousUrl.set(url);
  }
}
