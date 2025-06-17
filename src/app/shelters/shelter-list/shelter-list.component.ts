import { Component } from '@angular/core';
import { ShelterCardComponent } from '../shelter-card/shelter-card.component';
import { Shelter } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shelter',
  standalone: true,
  imports: [ShelterCardComponent],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.scss',
})
export class ShelterListComponent {
  public shelters: Shelter[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllShelters().subscribe((res) => {
      console.log(res);
      this.shelters = res;
    });
  }
}
