import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pet } from '../shared/models/pet.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PetService } from '../services/pet.service';
import { ErrorComponent } from '../shared/error/error.component';
import { IconCardComponent } from '../shared/icon-card/icon-card.component';
import { Item } from '../shared/models/item.model';
import { StepsComponent } from '../steps/steps.component';
import { StepComponent } from '../steps/step/step.component';
import { SuggestionDropdownComponent } from '../shared/suggestion-dropdown/suggestion-dropdown.component';

import {
  BIRD_BREEDS_OPTIONS,
  CAT_BREEDS_OPTIONS,
  DOG_BREEDS_OPTIONS,
  GOOD_WITH_OPTIONS,
  HORSE_BREEDS_OPTIONS,
  ICON_CARDS_ITEMS,
  PET_AGE_OPTIONS,
  PET_CARE_OPTIONS,
  PET_GENDER_OPTIONS,
  PET_SIZE_OPTIONS,
  RABBIT_BREEDS_OPTIONS,
} from '../constants/pet.constants';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GEORGIAN_CITIES } from '../constants/georgianCities';
import { QuillEditorComponent } from '../shared/quill-editor/quill-editor.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageCropper } from '../shared/image-cropper/image-cropper.component';

interface Options {
  value: string;
  label: string;
}

@Component({
  selector: 'app-new-pet',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ErrorComponent,
    IconCardComponent,
    StepsComponent,
    StepComponent,
    SuggestionDropdownComponent,
    AsyncPipe,
    QuillEditorComponent,
    FormsModule,
    ImageUploadComponent,
    ImageCropper,
  ],
  templateUrl: './new-pet.component.html',
  styleUrl: './new-pet.component.scss',
})
export class NewPetComponent implements OnInit, OnDestroy {
  public basicInfoForm!: FormGroup;
  public detailsForm!: FormGroup;
  public imagesForm!: FormGroup;

  public petBreeds: { [key: string]: Options[] } = {
    dogs: DOG_BREEDS_OPTIONS,
    cats: CAT_BREEDS_OPTIONS,
    horses: HORSE_BREEDS_OPTIONS,
    birds: BIRD_BREEDS_OPTIONS,
    rabbits: RABBIT_BREEDS_OPTIONS,
  };

  public petAgeOptions: Options[] = PET_AGE_OPTIONS;
  public petCityOptions: Options[] = GEORGIAN_CITIES;
  public petGenderOptions: Options[] = PET_GENDER_OPTIONS;
  public petCareOptions: Options[] = PET_CARE_OPTIONS;
  public petGoodWithOptions: Options[] = GOOD_WITH_OPTIONS;
  public petSizeOptions: Options[] = PET_SIZE_OPTIONS;
  private petIconCards: Item[] = ICON_CARDS_ITEMS.filter(
    (item) => item.value !== 'shelters'
  );

  private petId: string | null = null;
  private userId: string | null = null;

  public selectedPetType: string = 'dogs';

  public clearBreedSelect$ = new BehaviorSubject<number>(1);
  private destroy$ = new Subject<void>();

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private petService: PetService
  ) {}

  public ngOnInit(): void {
    this.initializeForms();

    this.petId = this.route.snapshot.paramMap.get('id');

    this.loadPetData();
    this.initializeUserId();
    this.resetBreedOnTypeChange();
  }

  private initializeForms(): void {
    this.basicInfoForm = this.fb.group({
      type: [this.selectedPetType, Validators.required],
      name: ['', Validators.required],
      age: ['baby'],
      breed: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['male'],
      history: ['', Validators.required],
    });

    this.detailsForm = this.fb.group({
      size: ['small_0_25_lbs'],
      care: this.fb.array(
        ['house_trained'].map((value) => new FormControl(value))
      ),
      goodWith: this.fb.array(
        ['everyone'].map((value) => new FormControl(value))
      ),
    });

    this.imagesForm = this.fb.group({
      images: this.fb.array([]),
      // Validators.required
    });
  }

  private resetBreedOnTypeChange() {
    this.basicInfoForm
      .get('type')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.clearBreedSelection());
  }

  private clearBreedSelection(): void {
    this.clearBreedSelect$.next(this.clearBreedSelect$.getValue() + 1);
  }

  private removeControl(formArray: FormArray, value: string): void {
    const index = formArray.controls.findIndex((ctrl) => ctrl.value === value);
    if (index !== -1) {
      formArray.removeAt(index);
    }
  }

  public onGoodWithSelectionChange(event: Event, value: string): void {
    const checkbox = event.target as HTMLInputElement;
    const goodWithArray = this.detailsForm.get('goodWith') as FormArray;

    if (value === 'everyone' && checkbox.checked) {
      goodWithArray.clear();
      goodWithArray.push(new FormControl('everyone'));
    } else {
      this.removeControl(goodWithArray, 'everyone');

      if (checkbox.checked) {
        goodWithArray.push(new FormControl(value));
      } else {
        this.removeControl(goodWithArray, value);
      }
    }
  }

  public onCareSelectionChange(event: Event, value: string): void {
    const checkbox = event.target as HTMLInputElement;
    const careArray = this.detailsForm.get('care') as FormArray;

    if (value === 'unknown' && checkbox.checked) {
      careArray.clear();
      careArray.push(new FormControl('unknown'));
    } else {
      this.removeControl(careArray, 'unknown');

      if (checkbox.checked) {
        careArray.push(new FormControl(value));
      } else {
        this.removeControl(careArray, value);
      }
    }
  }

  public get petTypes() {
    if (
      this.selectedPetType === 'others' ||
      (this.selectedPetType !== 'dogs' && this.selectedPetType !== 'cats')
    ) {
      return this.petIconCards.filter((type) => type.value !== 'others');
    }

    return this.petIconCards.slice(0, 3);
  }

  public onSelectPetType(petType: string | undefined) {
    if (petType) {
      this.selectedPetType = petType;
      this.basicInfoForm.patchValue({ type: petType, breed: '' });
    }

    if (petType === 'others') {
      this.basicInfoForm.patchValue({ type: 'birds', breed: '' });
      this.selectedPetType = 'birds';
    }
  }

  private loadPetData(): void {
    if (this.petId) {
      // console.log(this.petId);
    }
  }

  public setSelectedPetBreed(breed: string) {
    this.basicInfoForm.patchValue({ breed });
  }

  public setSelectedPetCity(city: string) {
    this.basicInfoForm.patchValue({ city });
  }

  private initializeUserId(): void {
    const user = this.authService.user();
    this.userId = user?.id || null;
  }

  private savePet(pet: Partial<Pet>): void {
    if (this.petId) {
      this.updatePet(pet);
    } else {
      this.createPet(pet);
    }
  }

  private createPet(pet: Partial<Pet>): void {
    this.petService.createPet(pet).subscribe({
      next: (response) => console.log('Pet Created:', response),
      error: (err) => console.error('Error creating pet:', err),
    });
  }

  private updatePet(pet: Partial<Pet>): void {
    if (!this.petId) return;

    this.petService.updatePet(this.petId, pet).subscribe({
      next: (response) => console.log('Pet Updated:', response),
      error: (err) => console.error('Error updating pet:', err),
    });
  }

  public onSubmit(): void {
    if (this.basicInfoForm.valid) {
      // this.savePet(this.basicInfoForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// this.updatePet(this.petId, pet); // this.createPet(pet);
