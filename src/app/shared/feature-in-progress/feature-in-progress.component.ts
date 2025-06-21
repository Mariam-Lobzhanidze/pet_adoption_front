import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-in-progress',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container container-fluid text-center py-5 ">
      <!-- <h3 class="text-primary mb-4">We're still working on this feature 💻</h3> -->
      <p class="mb-3">
        This part of
        <strong class="text-secondary fw-bold ">Adopto</strong> is coming soon.
        In the meantime, feel free to explore other features!
      </p>
      <a routerLink="/" class="btn text-secondary text-decoration-underline"
        >Back to Home</a
      >
    </div>
  `,
})
export class FeatureInProgressComponent {}
