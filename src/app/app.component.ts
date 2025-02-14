import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // public image =
  //   'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73702827/1/?bust=1738562553&width=3000';
  // private items: PetDetails = {
  //   age: 'Puppy',
  //   breed: 'Labrador terrier',
  //   gender: 'Female',
  //   // size: 'Small(0-25 lbs)',
  //   // color: 'red',
  //   // coatLength: 'Short',
  //   // shelterName: 'Uganda',
  // };
  // public shelters: Shelter[] = [
  //   {
  //     title: 'Bone Voyage Dog Rescue',
  //     address: 'Ajijic Centro, JAL',
  //     phone: '33 2971 8011',
  //     logo: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/52008/1/?bust=1653597824',
  //   },
  //   {
  //     title: 'Isabel Y. Garcia Animal Shelter',
  //     address: 'Port Isabel, TX',
  //     phone: '(956) 346-4330',
  //     logo: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/41193/1/?bust=1511997764',
  //   },
  //   {
  //     title: 'Fundación Dame una Pata A.C.',
  //     address: 'San Cristóbal de las Casas, CHP',
  //     phone: '961 155 8696',
  //     logo: 'https://www.petfinder.com/next-images/default-shelter-logo.png',
  //   },
  //   {
  //     title: 'Sunshine Sanctuary',
  //     address: 'De las Juntas Delegación, JAL',
  //     phone: '322 191 1257',
  //     logo: 'https://dl5zpyw5k3jeb.cloudfront.net/organization-photos/52926/5/?bust=1684171919',
  //   },
  // ];
  // public get listItems(): string[] {
  //   return Object.values(this.items);
  // }
  // public onCardClick(value: string): void {
  //   console.log(value);
  // }
}
