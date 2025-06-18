import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPetsComponent } from './shelter-pets.component';

describe('ShelterPetsComponent', () => {
  let component: ShelterPetsComponent;
  let fixture: ComponentFixture<ShelterPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
