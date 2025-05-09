import { Component, computed, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from '../shared/section-title/section-title.component';
import { CardComponent } from '../shared/card/card.component';
import { Pet } from '../shared/models/pet.model';
import { PetService } from '../services/pet.service';
import { Item } from '../shared/models/item.model';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { forkJoin } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-my-pets',
  standalone: true,
  imports: [SectionTitleComponent, CardComponent, ConfirmModalComponent],
  templateUrl: './my-pets.component.html',
  styleUrl: './my-pets.component.scss',
})
export class MyPetsComponent implements OnInit {
  public loading = true;
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

  constructor(
    private petService: PetService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadPets();
  }

  private loadPets() {
    const offset = (this.currentPage - 1) * this.limit;

    this.petService.getMyPets(this.limit, offset).subscribe({
      next: (response) => {
        this.myPets = response.pets;
        this.totalCount = response.totalCount;
        this.loading = false;
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
  }

  public confirmDeletion() {
    const ids = [...this.selectedPetIds];

    if (ids.length === 0) return;

    const deleteObservables = ids.map((id) => this.petService.deletePet(id));

    forkJoin(deleteObservables).subscribe({
      next: (response) => {
        console.log('Deleted pets:', response);
        this.selectedPetIds.clear();
        this.toastService.showToast(
          'All selected pets were deleted.',
          'success',
          3000
        );

        this.loadPets();
      },
      error: (error) => {
        this.toastService.showToast('Something went wrong', 'error', 3000);
      },
    });
  }

  public cancelDeletion() {
    this.selectedPetIds.clear();
  }
}
