import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionDropdownComponent } from './suggestion-dropdown.component';

describe('SuggestionDropdownComponent', () => {
  let component: SuggestionDropdownComponent;
  let fixture: ComponentFixture<SuggestionDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
