import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet } from '../shared/models/pet.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private API_URL = environment.apiUrl;
  public loading = signal(true);

  private petItemsSubject = new BehaviorSubject<Partial<Pet[]>>([]);
  public petItems$ = this.petItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    setTimeout(() => {
      const petData: Partial<Pet[]> = [
        {
          id: '1',
          userId: '1',
          age: 'baby',
          breed: '',
          gender: 'female',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/74178829/1/?bust=1739281534&width=300',
            },
          ],
          name: 'Otto',
          type: 'Dog',
        },
        {
          type: 'Dog',
          id: '2',
          userId: '2',
          age: 'baby',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Molly',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73702827/1/?bust=1738562553&width=3000',
            },
          ],
        },
        {
          type: 'Dog',
          userId: '3',
          id: '3',
          age: 'baby',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Willow',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/74178829/1/?bust=1739281534&width=300',
            },
          ],
        },
        {
          type: 'Dog',

          userId: '4',
          id: '4',
          age: 'baby',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Sally',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73839167/1/?bust=1739281543&width=300',
            },
          ],
        },
        {
          type: 'Dog',
          userId: '5',
          id: '5',
          age: 'adult',
          breed: '',
          gender: 'female',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dbw3zep4prcju.cloudfront.net/animal/d1da9e46-6c08-4533-b8cc-dce2d6e605f9/image/022c8b4f-576d-4854-9d6c-bdeec90a3aff.jpg?versionId=.I6QUC19BFbZ39HmcsOtPu9ITi7fGItB&bust=1737744676&width=300',
            },
          ],
          name: 'Stella',
        },
        {
          type: 'Dog',
          userId: '6',
          id: '6',
          age: 'baby',
          breed: 'bengal',
          gender: 'female',
          name: 'Molly',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dbw3zep4prcju.cloudfront.net/animal/974155ad-67a2-4976-bdbf-006bff60452e/image/8d8c13ca-8fb3-4494-91d1-2075dc26d71b.jpg?versionId=MFt3EQP12RDJwgrmFfi9oAaTBdShpWRt&bust=1739888166&width=280',
            },
          ],
        },
        {
          type: 'Dog',
          userId: '7',
          id: '7',
          age: 'baby',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Willow',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/74178829/1/?bust=1739281534&width=300',
            },
          ],
        },
        {
          type: 'Dog',
          userId: '8',
          id: '8',
          age: 'baby',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Jellybean',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73839167/1/?bust=1739281543&width=300',
            },
          ],
        },
        {
          type: 'Dog',
          userId: '9',
          id: '9',
          age: 'senior',
          breed: 'Labrador terrier',
          gender: 'female',
          name: 'Minnie',
          images: [
            {
              public_id: 'adopto/dh8ks72fjz9m1xvvc5yz',
              url: 'https://dbw3zep4prcju.cloudfront.net/animal/df4b29c4-aec4-4cd2-9927-7bcad679e3ff/image/4814a6b8-8aeb-46ec-ad58-fc6fa8f35d66.jpg?versionId=Coy1O7Yc2Zsd_alMg7t__91EqV_XoDk2&bust=1737745517&width=300',
            },
          ],
        },
      ];

      this.petItemsSubject.next(petData);
      this.loading.set(false);
    }, 1000);
  }

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

  //
  public uploadImages(files: FileList): Observable<any> {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    return this.http.post(`${this.API_URL}/upload`, formData);
  }

  public deleteImage(publicId: string): Observable<any> {
    return this.http.post(`${this.API_URL}/delete`, { publicId });
  }
}
