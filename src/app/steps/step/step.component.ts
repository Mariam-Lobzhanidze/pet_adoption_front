import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step',
  standalone: true,
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @Input() stepTitle: string = '';
  @Input() active: boolean = false;
  @Input() stepGroup!: FormGroup;

  @ContentChild('stepContent', { static: true }) content!: TemplateRef<void>;

  get isValid(): boolean {
    return (this.stepGroup && this.stepGroup.valid) || false;
  }

  // ngOnInit() {
  //   console.log(this.stepGroup);
  // }
}
