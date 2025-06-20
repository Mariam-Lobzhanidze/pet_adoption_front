import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerInfoComponent } from './pet-owner-info.component';

describe('PetOwnerInfoComponent', () => {
  let component: PetOwnerInfoComponent;
  let fixture: ComponentFixture<PetOwnerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOwnerInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
