import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFilteringComponent } from './pet-filtering.component';

describe('PetFilteringComponent', () => {
  let component: PetFilteringComponent;
  let fixture: ComponentFixture<PetFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetFilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
