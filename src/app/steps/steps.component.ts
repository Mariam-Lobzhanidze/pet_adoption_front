import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { StepComponent } from './step/step.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements AfterContentInit {
  @Input() isSubmitting: boolean = false;
  @Output() stepsDataCollected = new EventEmitter<void>();
  @ContentChildren(StepComponent)
  allSteps!: QueryList<StepComponent>;

  public activeStepIndex: number = 0;

  public constructor(private router: Router) {}

  ngAfterContentInit() {
    this.updateRouteQueryParams();
  }

  private updateRouteQueryParams() {
    this.router.navigate([], {
      queryParams: { step: this.activeStepIndex + 1 },
      queryParamsHandling: 'merge',
    });
  }

  public nextStep() {
    const step = [...this.allSteps][this.activeStepIndex];
    const activeStepGroup = step.stepGroup;

    activeStepGroup?.markAllAsTouched();

    const isLastStep = this.activeStepIndex === this.allSteps.length - 1;

    if (activeStepGroup?.valid) {
      if (isLastStep) {
        this.stepsDataCollected.emit();
        this.scrollToTop();
      } else {
        this.activeStepIndex++;
        this.updateRouteQueryParams();
        this.scrollToTop();
      }
    }
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public prevStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
      this.updateRouteQueryParams();
      this.scrollToTop();
    }
  }

  public resetStepper() {
    this.activeStepIndex = 0;
    this.allSteps.forEach((step) => step.stepGroup.reset());
    this.updateRouteQueryParams();
  }
}
