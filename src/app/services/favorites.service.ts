import { computed, effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PetService } from './pet.service';
import { environment } from '../../environments/environment';
import { Pet } from '../shared/models/pet.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private API_URL = environment.apiUrl;
  private favoriteIds = signal<Set<string>>(new Set());
  private favoritePets = signal<Pet[]>([]);

  private _loading = signal(true);

  constructor(
    private http: HttpClient,
    private petService: PetService,
    private authService: AuthService
  ) {
    effect(
      () => {
        if (this.authService.isLoggedIn()) {
          this.loadFavorites();
        } else {
          this.clearFavorites();
        }
      },
      { allowSignalWrites: true }
    );
  }

  private clearFavorites() {
    this.favoritePets.set([]);
    this.favoriteIds.set(new Set());
    this._loading.set(false);
  }

  private loadFavorites(): void {
    this._loading.set(true);

    this.petService.getFavoritePets().subscribe(
      (res) => {
        this.favoritePets.set(res.pets);
        const ids = res.pets.map((p) => p.id);
        this.favoriteIds.set(new Set(ids));
        console.log(res);
        this._loading.set(false);
      },
      (err) => {
        console.log(err);
        this._loading.set(false);
      }
    );
  }

  public get favorites() {
    return this.favoritePets.asReadonly();
  }

  public get loading() {
    return this._loading.asReadonly();
  }

  public isFavorite(id: string) {
    return computed(() => this.favoriteIds().has(id));
  }

  public toggleFavorite(id: string): void {
    this.http
      .post<{ isFavorite: boolean; message: string; pet: Pet }>(
        `${this.API_URL}/pets/${id}/favorite`,
        {}
      )
      .subscribe({
        next: (res) => {
          const currentIds = this.favoriteIds();
          const updatedIds = new Set(currentIds);
          let updatedPets = [...this.favoritePets()];

          if (res.isFavorite) {
            updatedIds.add(id);
            if (res.pet) {
              updatedPets.push(res.pet);
            }
          } else {
            updatedIds.delete(id);
            updatedPets = updatedPets.filter((p) => p.id !== id);
          }

          this.favoriteIds.set(updatedIds);
          this.favoritePets.set(updatedPets);
        },
        error: (err) => console.error('Favorite toggle failed:', err),
      });
  }
}
