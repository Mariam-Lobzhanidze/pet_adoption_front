import { Component } from '@angular/core';
import { ShelterCardComponent } from '../shelter-card/shelter-card.component';
import { Shelter } from '../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shelter',
  standalone: true,
  imports: [ShelterCardComponent],
  templateUrl: './shelter-list.component.html',
  styleUrl: './shelter-list.component.scss',
})
export class ShelterListComponent {
  public shelters: Shelter[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.getAllShelters().subscribe((res) => {
      console.log(res);
      this.shelters = res;
    });
  }

  public navigateToPets(id: string, shelterName: string) {
    this.router.navigate(['shelters', id, 'pets'], {
      state: { shelterName: shelterName },
    });
  }
}
