import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
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

    console.log(activeStepGroup.value);

    activeStepGroup?.markAllAsTouched();
    activeStepGroup.updateValueAndValidity();

    if (
      this.activeStepIndex < this.allSteps.length - 1 &&
      activeStepGroup.valid
    ) {
      this.activeStepIndex++;
      this.updateRouteQueryParams();
    } else {
      return;
    }
  }

  public prevStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
      this.updateRouteQueryParams();
    }
  }
}
