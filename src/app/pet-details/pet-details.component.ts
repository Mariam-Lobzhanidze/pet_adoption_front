import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetService } from '../services/pet.service';
import { Pet } from '../shared/models/pet.model';
import { ImageCarouselComponent } from '../shared/gallery/gallery.component';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [ImageCarouselComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.scss',
})
export class PetDetailsComponent {
  private pet: Partial<Pet> = {};
  public images: { src: string; title: string }[] = [];
  public petImages: { public_id: string; url: string }[] | undefined = [];
  private petId: string | null;
  constructor(private route: ActivatedRoute, private petService: PetService) {
    this.petId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe((res) => {
        console.log(res);
        this.pet = res;
        this.petImages = res.images;

        this.images =
          this.petImages?.map((img) => ({
            src: img.url,
            title: this.pet.name ? this.pet.name : '',
          })) || [];
      });
    }
  }
}
