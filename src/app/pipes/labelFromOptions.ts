import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'labelFromOptions', standalone: true })
export class LabelFromOptionsPipe implements PipeTransform {
  transform(
    value: string | undefined,
    options: { label: string; value: string }[]
  ): string {
    return options.find((item) => item.value === value)?.label || value || '';
  }
}
