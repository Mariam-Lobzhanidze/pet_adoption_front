import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public previousUrl = signal<string>('/home');

  public setPreviousUrl(url: string) {
    this.previousUrl.set(url);
  }
}
