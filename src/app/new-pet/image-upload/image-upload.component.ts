import { Component } from '@angular/core';
import { IconCardComponent } from '../../shared/icon-card/icon-card.component';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [IconCardComponent, ImageCropperComponent],
})
export class ImageUploadComponent {
  imageChangedEvent: Event | null = null;
  croppedImages: Blob[] = [];
  croppedImageUrls: string[] = [];

  // later
  public item = {
    label: '',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>',
  };

  //

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event);

    if (event.blob) {
      const imageUrl = URL.createObjectURL(event.blob);
      this.croppedImageUrls.push(imageUrl);
      console.log(this.croppedImageUrls);
    }
  }

  //
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}

// providers: [
//   {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => ImageUploadComponent),
//     multi: true,
//   },
// ],
// implements ControlValueAccessor
// onChange: (images: any[]) => void = () => {};
// onTouched: () => void = () => {};

// public constructor(private sanitizer: DomSanitizer) {}

// writeValue(images: any[]): void {}

// registerOnChange(fn: any): void {
//   this.onChange = fn;
// }

// registerOnTouched(fn: any): void {
//   this.onTouched = fn;
// }
