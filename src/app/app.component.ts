import { Component } from '@angular/core';
import { CardComponent } from './shared/card/card.component';
import { UpperCasePipe } from '@angular/common';
import { DottedListComponent } from './shared/dotted-list/dotted-list.component';
import { PetDetails } from './shared/models/petModal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, DottedListComponent, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public image =
    'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/73702827/1/?bust=1738562553&width=3000';

  private items: PetDetails = {
    age: 'Puppy',
    breed: 'Labrador terrier',
    gender: 'Female',

    // size: 'Small(0-25 lbs)',
    // color: 'red',
    // coatLength: 'Short',
    // shelterName: 'Uganda',
  };

  public get listItems(): string[] {
    return Object.values(this.items);
  }
}
