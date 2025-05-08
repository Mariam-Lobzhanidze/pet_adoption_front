import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImageService {
  constructor(private http: HttpClient) {}

  public convertCloudinaryImagesToFiles(
    images: { public_id: string; url: string }[]
  ): Observable<File[]> {
    const fileObservables = images.map((image) =>
      this.http.get(image.url, { responseType: 'blob' }).pipe(
        map((blob) => {
          const filename = `${image.public_id}-${Date.now()}.webp`;
          return new File([blob], filename, { type: 'image/webp' });
        })
      )
    );

    return forkJoin(fileObservables);
  }
}
