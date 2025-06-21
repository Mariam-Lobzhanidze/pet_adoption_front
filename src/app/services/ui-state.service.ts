// ui-state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIStateService {
  isSecondaryNavVisible = signal(false);

  public toggleSecondaryNav() {
    this.isSecondaryNavVisible.update((v) => !v);
  }

  public hideSecondaryNav() {
    this.isSecondaryNavVisible.set(false);
  }
}
