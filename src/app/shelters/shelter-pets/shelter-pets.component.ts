import { Component, OnInit, signal } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../shared/models/pet.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-shelter-pets',
  standalone: true,
  imports: [CardComponent, TitleCasePipe],
  templateUrl: './shelter-pets.component.html',
  styleUrl: './shelter-pets.component.scss',
})
export class ShelterPetsComponent implements OnInit {
  public shelterName = '';
  public loading = signal(true);
  public petCardData: Partial<Pet>[] = [];
  public placeholders = Array(5).fill(null);
  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.shelterName = history.state?.shelterName || '';
    console.log(this.shelterName);

    this.route.paramMap.subscribe((params) => {
      const shelterId = params.get('id');
      if (shelterId) {
        this.getShelterPets(shelterId);
      }
    });
  }

  public getShelterPets(shelterId: string) {
    this.petService.getPetsByShelterId(shelterId).subscribe({
      next: (response) => {
        console.log(response);
        this.loading.set(false);

        this.petCardData = response.pets;
      },
      error: (err) => {
        console.error('Failed to load pets for shelter', err);
      },
    });
  }

  public onBackToSheltersList() {
    this.router.navigate(['shelters', 'list']);
  }
}
