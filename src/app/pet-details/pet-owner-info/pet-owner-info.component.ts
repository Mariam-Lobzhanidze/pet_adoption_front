import { TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MapComponent } from '../map/map.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-owner-info',
  standalone: true,
  imports: [TitleCasePipe, MapComponent],
  templateUrl: './pet-owner-info.component.html',
  styleUrl: './pet-owner-info.component.scss',
})
export class PetOwnerInfoComponent implements OnInit, OnChanges {
  public coords = { lat: 40.7128, lng: -74.006 };
  @Input() ownerData: {
    isShelter: boolean;
    shelterName: string;
    address: string;
    username: string;
    contactEmail: string;
    contactPhone: string;
  } = {
    isShelter: true,
    shelterName: '',
    address: '',
    username: '',
    contactEmail: '',
    contactPhone: '',
  };
  public phone = '';

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ownerData'] && this.ownerData?.contactPhone) {
      let phoneRaw = this.ownerData.contactPhone.replace(/\D/g, '');
      if (!phoneRaw.startsWith('995')) {
        phoneRaw = '995' + phoneRaw;
      }
      this.phone = phoneRaw;
    }
  }

  ngOnInit() {
    if (this.ownerData.address) {
      this.http
        .get<any>(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            this.ownerData.address
          )}&format=json`
        )
        .subscribe((results) => {
          if (results.length > 0) {
            this.coords = {
              lat: parseFloat(results[0].lat),
              lng: parseFloat(results[0].lon),
            };
          }
        });
    }
  }
}
