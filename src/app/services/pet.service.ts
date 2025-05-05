import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet, PetImageUploadResponse } from '../shared/models/pet.model';
import { HttpClient } from '@angular/common/http';
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

  public getAllPets(
    limit: number = 14,
    offset: number = 0
  ): Observable<{ pets: Partial<Pet>[]; totalCount: number }> {
    return this.http.get<{ pets: Partial<Pet>[]; totalCount: number }>(
      `${this.API_URL}/pets?limit=${limit}&offset=${offset}`
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
