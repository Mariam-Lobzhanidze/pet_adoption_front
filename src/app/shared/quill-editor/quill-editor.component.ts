import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-quill-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule, FormsModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true,
    },
  ],
})
export class QuillEditorComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Write about pet...';
  public editorValue = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.editorValue = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onContentChange(event: any) {
    if (event.source === 'user') {
      this.onChange(event.html);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
