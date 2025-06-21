import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Pet, PetImageUploadResponse } from '../shared/models/pet.model';
import { ActivatedRoute, Router } from '@angular/router';
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
import { BehaviorSubject, concatMap, Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GEORGIAN_CITIES } from '../constants/georgianCities';
import { QuillEditorComponent } from '../shared/quill-editor/quill-editor.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { emptyArrayValidator } from '../validators/validators';
import { ONLY_NUMBERS_AND_PLUS_SIGN } from '../validators/patterns';
import { ToastService } from '../services/toast.service';
import { ImageService } from '../services/image-service';

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
  ],
  templateUrl: './new-pet.component.html',
  styleUrl: './new-pet.component.scss',
})
export class NewPetComponent implements OnInit, OnDestroy {
  public isSubmitting: boolean = false;
  private isPatching = false;

  @ViewChild(StepsComponent) stepperComponent!: StepsComponent;

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
    private petService: PetService,
    private toastService: ToastService,
    private imageService: ImageService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.initializeForms();

    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.patchPetData(this.petId);
    }

    this.initializeUserId();
    this.resetBreedOnTypeChange();
  }

  private initializeForms(): void {
    this.basicInfoForm = this.fb.group({
      type: [this.selectedPetType, Validators.required],
      name: ['', Validators.required],
      age: ['baby', Validators.required],
      breed: ['', Validators.required],
      city: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: [
        '',
        [Validators.required, Validators.pattern(ONLY_NUMBERS_AND_PLUS_SIGN)],
      ],

      gender: ['male', Validators.required],
      history: ['', Validators.required],
    });

    this.detailsForm = this.fb.group({
      size: ['small_0_25_lbs'],
      care: this.fb.array(['unknown'].map((value) => new FormControl(value))),
      goodWith: this.fb.array(
        ['everyone'].map((value) => new FormControl(value))
      ),
    });

    this.imagesForm = this.fb.group({
      images: this.fb.array([], emptyArrayValidator()),
    });
  }

  private resetBreedOnTypeChange() {
    this.basicInfoForm
      .get('type')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isPatching) return;
        this.clearBreedSelection();
      });
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

  private patchPetData(id: string): void {
    this.petService.getPetById(id).subscribe((pet) => {
      console.log(pet);

      this.isPatching = true;
      if (pet.type) {
        this.selectedPetType = pet.type;
      }

      this.basicInfoForm.patchValue(pet);
      this.detailsForm.patchValue(pet);
      if (pet.care) {
        const careArray = this.detailsForm.get('care') as FormArray;
        careArray.clear();

        pet.care.forEach((value: string) =>
          careArray.push(new FormControl(value))
        );
      }

      if (pet.goodWith) {
        const goodWithArray = this.detailsForm.get('goodWith') as FormArray;
        goodWithArray.clear();
        pet.goodWith.forEach((value: string) =>
          goodWithArray.push(new FormControl(value))
        );
      }

      if (pet.images) {
        this.convertToImageFiles(pet.images);
      }

      setTimeout(() => {
        this.isPatching = false;
      }, 0);
    });
  }

  private convertToImageFiles(images: { public_id: string; url: string }[]) {
    this.imageService
      .convertCloudinaryImagesToFiles(images)
      .subscribe((files) => {
        files.forEach((file) => {
          const imageArray = this.imagesForm.get('images') as FormArray;

          imageArray.push(this.fb.control(file));
        });
      });
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

  public getImageFiles(imageFiles: File[]) {
    const imageArray = this.imagesForm.get('images') as FormArray;
    imageArray.clear();

    imageFiles.forEach((file) => {
      imageArray.push(this.fb.control(file));
    });
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    const images = this.imagesForm.get('images')?.value;

    this.petService
      .uploadImages(images)
      .pipe(
        concatMap((uploadResponse: PetImageUploadResponse) => {
          const payload: Partial<Pet> = {
            userId: this.userId,
            ...this.basicInfoForm.value,
            ...this.detailsForm.value,
            images: uploadResponse.uploadResults,
          };
          console.log(payload);

          return this.petId
            ? this.petService.updatePet(this.petId, payload)
            : this.petService.createPet(payload);
        })
      )
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.toastService.showToast(res.message + '😺', 'success');

          if (this.petId) {
            this.router.navigate(['/my-pets']);
          } else {
            this.stepperComponent.resetStepper();
            this.initializeForms();
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.toastService.showToast(
            'Something went wrong,try later!',
            'error'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
