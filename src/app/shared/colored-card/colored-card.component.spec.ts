import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredCardComponent } from './colored-card.component';

describe('ColoredCardComponent', () => {
  let component: ColoredCardComponent;
  let fixture: ComponentFixture<ColoredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
