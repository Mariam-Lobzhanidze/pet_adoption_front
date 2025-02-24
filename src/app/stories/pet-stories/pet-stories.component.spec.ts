import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetStoriesComponent } from './pet-stories.component';

describe('PetStoriesComponent', () => {
  let component: PetStoriesComponent;
  let fixture: ComponentFixture<PetStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
