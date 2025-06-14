import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetGalleryComponent } from '../shared/gallery/gallery.component';
import { PetService } from '../services/pet.service';
import { Pet } from '../shared/models/pet.model';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [PetGalleryComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.scss',
})
export class PetDetailsComponent {
  private pet: Partial<Pet> = {};
  public petImages: { public_id: string; url: string }[] | undefined = [];
  private petId: string | null;
  constructor(private route: ActivatedRoute, private petService: PetService) {
    this.petId = this.route.snapshot.paramMap.get('id');
  }

  get images(): string[] {
    return this.petImages?.map((img) => img.url) || [];
  }

  ngOnInit() {
    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe((res) => {
        console.log(res);
        this.pet = res;
        this.petImages = res.images;
      });
    }
  }
}
