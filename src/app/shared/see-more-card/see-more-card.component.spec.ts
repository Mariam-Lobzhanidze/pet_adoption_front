import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMoreCardComponent } from './see-more-card.component';

describe('SeeMoreCardComponent', () => {
  let component: SeeMoreCardComponent;
  let fixture: ComponentFixture<SeeMoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeMoreCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeMoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
