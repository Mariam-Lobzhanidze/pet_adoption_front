import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

interface UploadedImage {
  id: string;
  originalFile: File;
  croppedFile: File;
  croppedUrl: string;
}
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  standalone: true,
  imports: [ImageCropperComponent, NgClass],
})
export class ImageUploadComponent {
  @Output() imageChanges = new EventEmitter<File[]>();
  public uploadedImages: UploadedImage[] = [];

  public activeImageFile: File | undefined | null = undefined;
  public activeImageId: string | null = null;

  public fileChangeEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.activeImageId = file.name + '-' + Date.now();
      this.activeImageFile = file;

      this.addNewImage(this.activeImageId, file);
      input.value = '';
    }
  }

  private addNewImage(id: string, file: File) {
    this.uploadedImages.unshift({
      id,
      originalFile: file,
      croppedUrl: '',
      croppedFile: file,
    });
  }

  public imageCropped(event: ImageCroppedEvent) {
    const uploadedImage = this.uploadedImages.find(
      (img) => img.id === this.activeImageId
    );

    if (event && event.blob && uploadedImage) {
      this.saveCroppedFile(event.blob, uploadedImage);
      this.emitCroppedFiles();
    }
  }

  private saveCroppedFile(blob: Blob, uploadedImage: UploadedImage): void {
    if (uploadedImage && uploadedImage?.croppedUrl) {
      URL.revokeObjectURL(uploadedImage.croppedUrl);
    }

    const getName = () =>
      uploadedImage.id.substring(0, uploadedImage.id.lastIndexOf('.')) +
      '-' +
      Date.now() +
      '.webp';

    const croppedFile = new File([blob], getName(), { type: blob.type });

    uploadedImage.croppedFile = croppedFile;
    uploadedImage.croppedUrl = URL.createObjectURL(blob);
  }

  public deleteImage(id: string): void {
    this.uploadedImages = this.uploadedImages.filter((img) => img.id !== id);

    if (this.activeImageId === id) {
      const next = this.uploadedImages[0] || null;
      this.activeImageFile = next?.croppedFile ?? null;
      this.activeImageId = next?.id ?? null;
    }

    this.emitCroppedFiles();
  }

  public onShowImage(id: string): void {
    const uploadedImage = this.uploadedImages.find((img) => img.id === id);
    if (uploadedImage && this.activeImageId !== uploadedImage.id) {
      this.activeImageId = uploadedImage.id;
      this.activeImageFile = uploadedImage.originalFile;
    }
  }

  private getCroppedFiles(arr: UploadedImage[]): File[] {
    return this.uploadedImages.map((item) => item.croppedFile);
  }

  public emitCroppedFiles() {
    const croppedFiles = this.getCroppedFiles(this.uploadedImages);
    this.imageChanges.emit(croppedFiles);
  }
}

// imageLoaded(image: LoadedImage) {
//   // show cropper
// }

// cropperReady() {
//   // cropper ready
// }

// loadImageFailed() {
//   // show message
// }
