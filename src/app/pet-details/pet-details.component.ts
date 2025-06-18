import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../services/pet.service';
import { Pet } from '../shared/models/pet.model';
import { ImageCarouselComponent } from '../shared/gallery/gallery.component';
import { TitleCasePipe } from '@angular/common';
import { DottedListComponent } from '../shared/dotted-list/dotted-list.component';
import {
  ALL_BREEDS,
  PET_AGE_OPTIONS,
  PET_CARE_OPTIONS,
  PET_GENDER_OPTIONS,
  PET_SIZE_OPTIONS,
} from '../constants/pet.constants';
import { LabelFromOptionsPipe } from '../pipes/labelFromOptions';
import { GEORGIAN_CITIES } from '../constants/georgianCities';

interface Options {
  value: string;
  label: string;
}

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [
    ImageCarouselComponent,
    TitleCasePipe,
    DottedListComponent,
    RouterLink,
  ],
  providers: [LabelFromOptionsPipe],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.scss',
})
export class PetDetailsComponent {
  public allBreedOptions = ALL_BREEDS;
  public petSizeOptions = PET_SIZE_OPTIONS;
  public petGenderOptions = PET_GENDER_OPTIONS;
  public petAgeOptions = PET_AGE_OPTIONS;
  public petCityOptions = GEORGIAN_CITIES;
  public petCareOptions = PET_CARE_OPTIONS;
  public petDataLabels: string[] = [];
  public petCareLabels: string[] = [];
  public petBreed: string = '';
  public petCity: string = '';

  public pet: Partial<Pet> = {};
  public images: { src: string; title: string }[] = [];
  public petImages: { public_id: string; url: string }[] | undefined = [];
  private petId: string | null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private labelFromOptions: LabelFromOptionsPipe
  ) {
    this.petId = this.route.snapshot.paramMap.get('id');
  }

  private getDataLabels() {
    return [
      this.labelFromOptions.transform(this.pet?.gender, this.petGenderOptions),
      this.labelFromOptions
        .transform(this.pet?.size, this.petSizeOptions)
        ?.replace(/\s*\(.*\)$/, '') || '',
      this.labelFromOptions.transform(this.pet?.age, this.petAgeOptions),
    ];
  }

  private transformCloudinary(url: string, width: number, quality = 80) {
    const segments = url.split('/upload/');
    if (segments.length !== 2) return url;

    return `${segments[0]}/upload/w_${width},f_auto,q_auto/${segments[1]}`;
  }

  ngOnInit() {
    if (this.petId) {
      this.petService.getPetById(this.petId).subscribe((res) => {
        console.log(res);
        this.pet = res;
        this.petImages = res.images;

        this.images =
          this.petImages?.map((img) => ({
            src: this.transformCloudinary(img.url, 900, 90),
            title: this.pet.name ? this.pet.name : '',
          })) || [];

        this.petDataLabels = this.getDataLabels();

        this.petBreed = this.labelFromOptions.transform(
          this.pet?.breed,
          this.allBreedOptions
        );

        this.petCity = this.labelFromOptions.transform(
          this.pet?.city,
          this.petCityOptions
        );
        if (res.care) {
          this.petCareLabels = res.care?.map((item) =>
            this.labelFromOptions.transform(item, this.petCareOptions)
          );
        }
      });
    }
  }
}

// <img src="https://res.cloudinary.com/{your-cloud-name}/image/upload/w_200,h_200/{your-image}" alt="Pet" />
// ➥ Alternatively, you can apply proper width and height attributes:
// <img src="your-large-img.jpg" width="200" height="200" alt="Pet" />
