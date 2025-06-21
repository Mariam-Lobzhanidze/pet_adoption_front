import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ShelterComponent } from './shelters/shelter/shelter.component';
import { FeatureInProgressComponent } from './shared/feature-in-progress/feature-in-progress.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth/auth.component').then((m) => m.AuthComponent),
  },

  {
    path: 'verify-email',
    loadComponent: () =>
      import('./auth/email-verification.component').then(
        (m) => m.EmailVerificationComponent
      ),
  },
  {
    path: 'pets/create',
    loadComponent: () =>
      import('./new-pet/new-pet.component').then((m) => m.NewPetComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'pets/edit/:id',
    loadComponent: () =>
      import('./new-pet/new-pet.component').then((m) => m.NewPetComponent),
    canActivate: [AuthGuard],
  },

  {
    path: 'my-pets',
    loadComponent: () =>
      import('./my-pets/my-pets.component').then((m) => m.MyPetsComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'my-favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'pet/:id',
    loadComponent: () =>
      import('./pet-details/pet-details.component').then(
        (m) => m.PetDetailsComponent
      ),
  },

  {
    path: 'pets/search',
    loadComponent: () =>
      import('./pet-filtering/pet-filtering.component').then(
        (m) => m.PetFilteringComponent
      ),
  },

  {
    path: 'shelters',
    component: ShelterComponent,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./shelters/shelter-list/shelter-list.component').then(
            (m) => m.ShelterListComponent
          ),
      },
      {
        path: ':id/pets',
        loadComponent: () =>
          import('./shelters/shelter-pets/shelter-pets.component').then(
            (m) => m.ShelterPetsComponent
          ),
      },
    ],
  },
  { path: 'coming-soon', component: FeatureInProgressComponent },
  { path: '**', redirectTo: '/coming-soon' },
];
