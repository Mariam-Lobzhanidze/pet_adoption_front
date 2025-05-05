import { Component, computed, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { CardComponent } from '../shared/card/card.component';
import { Pet } from '../shared/models/pet.model';
import { PetService } from '../services/pet.service';

import { Item } from '../shared/models/item.model';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [SectionTitleComponent, CardComponent, ConfirmModalComponent],
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.scss',
})
export class MyPetsComponent implements OnInit {
  public myPets: Partial<Pet>[] = [];
  public totalCount: number = 0;
  public limit: number = 10;
  public currentPage: number = 1;

  selectedPetId = signal<string>('');

  public editItems = computed<Item[]>(() => {
    const id = this.selectedPetId();
    return id
      ? [
          { label: 'update', route: `/pets/edit/${id}` },
          { label: 'details', route: '/' },
        ]
      : [];
  });

  public selectedPetIds: Set<string> = new Set();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.loadPets();
  }

  private loadPets() {
    const offset = (this.currentPage - 1) * this.limit;

    this.petService.getMyPets(this.limit, offset).subscribe({
      next: (response) => {
        this.myPets = response.pets;
        this.totalCount = response.totalCount;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.loadPets();
  }

  public setSelectedPetId(event: { id: string }) {
    this.selectedPetId.set(event.id);
  }

  public onCardSelectionChange(event: { id: string; selected: boolean }) {
    if (event.selected) {
      this.selectedPetIds.add(event.id);
    } else {
      this.selectedPetIds.delete(event.id);
    }
    console.log(event, this.selectedPetIds);
  }

  public confirmDeletion() {
    const ids = [...this.selectedPetIds];
    console.log('Deleting pets:', ids);
    // this.petService.deletePets(ids).subscribe(...)
    this.selectedPetIds.clear();
  }

  public cancelDeletion() {
    console.log('User cancelled the deletion');
    this.selectedPetIds.clear();
  }
}
