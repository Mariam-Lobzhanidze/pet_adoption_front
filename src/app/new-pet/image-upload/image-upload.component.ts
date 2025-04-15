import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() initialImageFiles: File[] = [];

  public activeImageFile: File | undefined | null = undefined;
  public activeImageId: string | null = null;

  public imageSaveState: boolean = false;
  public isDragging = false;

  public ngOnInit(): void {
    if (this.initialImageFiles?.length) {
      this.uploadedImages = this.initialImageFiles.map((file) => {
        const id = file.name + '-' + Date.now();
        return {
          id,
          originalFile: file,
          croppedFile: file,
          croppedUrl: URL.createObjectURL(file),
        };
      });

      this.setFirstImageAsActive();
    }
  }

  private setFirstImageAsActive(): void {
    const first = this.uploadedImages[0];
    this.activeImageFile = first?.croppedFile ?? null;
    this.activeImageId = first?.id ?? null;
  }

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
    }
    this.imageSaveState = true;
  }

  public onSaveImages(): void {
    this.imageSaveState = false;
    this.emitCroppedFiles();
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
    this.imageSaveState = true;
    this.uploadedImages = this.uploadedImages.filter((img) => img.id !== id);

    if (this.activeImageId === id) {
      this.setFirstImageAsActive();
    }
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

  //
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.activeImageId = file.name + '-' + Date.now();
      this.activeImageFile = file;
      this.addNewImage(this.activeImageId, file);
    }
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
