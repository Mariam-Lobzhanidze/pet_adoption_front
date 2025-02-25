import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetStoriesCarouselComponent } from './pet-stories-carousel.component';

describe('PetStoriesCarouselComponent', () => {
  let component: PetStoriesCarouselComponent;
  let fixture: ComponentFixture<PetStoriesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetStoriesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetStoriesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
