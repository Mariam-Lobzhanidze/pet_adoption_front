import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetDetails } from '../shared/models/petModel';

@Injectable({
  providedIn: 'root',
})
export class PetForAdoptionService {
  public loading = signal(true);

  private petItemsSubject = new BehaviorSubject<PetDetails[]>([]);
  public petItems$ = this.petItemsSubject.asObservable();

  constructor() {
    setTimeout(() => {
      const petData: PetDetails[] = [
        {
          id: 1,
          age: 'Puppy',
          breed: '',
          gender: 'Female',
          image: '',
          name: 'Otto',
          type: 'Dog',
        },
        {
          id: 2,
          age: 'Puppy',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Molly',
          image:
            'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73702827/1/?bust=1738562553&width=3000',
        },
        {
          id: 3,
          age: 'Puppy',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Willow',
          image:
            'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/74178829/1/?bust=1739281534&width=300',
        },
        {
          id: 4,
          age: 'Puppy',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Sally',
          image:
            'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73839167/1/?bust=1739281543&width=300',
        },
        {
          id: 5,
          age: 'Adult',
          breed: '',
          gender: 'Female',
          image:
            'https://dbw3zep4prcju.cloudfront.net/animal/d1da9e46-6c08-4533-b8cc-dce2d6e605f9/image/022c8b4f-576d-4854-9d6c-bdeec90a3aff.jpg?versionId=.I6QUC19BFbZ39HmcsOtPu9ITi7fGItB&bust=1737744676&width=300',
          name: 'Stella',
          type: 'Dog',
        },
        {
          id: 6,
          age: 'Kitten',
          breed: 'bengal',
          gender: 'Female',
          name: 'Molly',
          image:
            'https://dbw3zep4prcju.cloudfront.net/animal/974155ad-67a2-4976-bdbf-006bff60452e/image/8d8c13ca-8fb3-4494-91d1-2075dc26d71b.jpg?versionId=MFt3EQP12RDJwgrmFfi9oAaTBdShpWRt&bust=1739888166&width=280',
        },
        {
          id: 7,
          age: 'Puppy',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Willow',
          image:
            'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/74178829/1/?bust=1739281534&width=300',
        },
        {
          id: 8,
          age: 'Puppy',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Jellybean',
          image:
            'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73839167/1/?bust=1739281543&width=300',
        },
        {
          id: 9,
          age: 'Kitten',
          breed: 'Labrador terrier',
          gender: 'Female',
          name: 'Minnie',
          image:
            'https://dbw3zep4prcju.cloudfront.net/animal/df4b29c4-aec4-4cd2-9927-7bcad679e3ff/image/4814a6b8-8aeb-46ec-ad58-fc6fa8f35d66.jpg?versionId=Coy1O7Yc2Zsd_alMg7t__91EqV_XoDk2&bust=1737745517&width=300',
        },
      ];

      this.petItemsSubject.next(petData);
      this.loading.set(false);
    }, 1000);
  }
}
