import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetImageUploadResponse } from '../shared/models/pet.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public createPet(pet: Partial<Pet>): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/pets`, pet);
  }

  public updatePet(
    petId: string,
    pet: Partial<Pet>
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.API_URL}/pets/${petId}`,
      pet
    );
  }

  // public getAllPets(
  //   limit: number = 14,
  //   offset: number = 0
  // ): Observable<{ pets: Partial<Pet>[]; totalCount: number }> {
  //   return this.http.get<{ pets: Partial<Pet>[]; totalCount: number }>(
  //     `${this.API_URL}/pets?limit=${limit}&offset=${offset}`
  //   );
  // }

  public getAllPets(
    limit: number = 14,
    offset: number = 0,
    filters: { [key: string]: any } = {}
  ): Observable<{ pets: Partial<Pet>[]; totalCount: number }> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    for (const key in filters) {
      if (filters[key] !== undefined && filters[key] !== null) {
        params = params.set(key, filters[key]);
      }
    }

    return this.http.get<{ pets: Partial<Pet>[]; totalCount: number }>(
      `${this.API_URL}/pets`,
      { params }
    );
  }

  public getMyPets(
    limit: number = 10,
    offset: number = 0
  ): Observable<{ pets: Partial<Pet>[]; totalCount: number }> {
    const userId = this.authService.user()?.id;

    return this.http.get<{ pets: Partial<Pet>[]; totalCount: number }>(
      `${this.API_URL}/pets/user/${userId}?limit=${limit}&offset=${offset}`
    );
  }

  public deletePet(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/pets/${id}`);
  }

  public getPetById(id: string): Observable<Partial<Pet>> {
    return this.http.get<Partial<Pet>>(`${this.API_URL}/pets/${id}`);
  }

  public getBreedsCount(): Observable<{ breed: string; count: string }[]> {
    return this.http.get<{ breed: string; count: string }[]>(
      `${this.API_URL}/breeds/count`
    );
  }

  public toggleFavorite(
    petId: string,
    userId: string
  ): Observable<{ isFavorite: boolean; message: string }> {
    return this.http.post<{ isFavorite: boolean; message: string }>(
      `${this.API_URL}/pets/${petId}/favorite`,
      { userId }
    );
  }

  public getFavoritePets(): Observable<{ pets: Pet[] }> {
    return this.http.get<{ pets: Pet[] }>(`${this.API_URL}/pets/favorites`);
  }

  //
  public uploadImages(files: FileList): Observable<PetImageUploadResponse> {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post<PetImageUploadResponse>(
      `${this.API_URL}/upload`,
      formData
    );
  }

  public deleteImage(publicId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/delete`, { publicId });
  }
}
