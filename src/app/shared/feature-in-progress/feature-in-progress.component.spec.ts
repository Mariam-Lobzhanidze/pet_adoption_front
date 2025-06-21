import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureInProgressComponent } from './feature-in-progress.component';

describe('FeatureInProgressComponent', () => {
  let component: FeatureInProgressComponent;
  let fixture: ComponentFixture<FeatureInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureInProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
