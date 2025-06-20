// map.component.ts
import { Component, Input, OnChanges, AfterViewInit } from '@angular/core';

import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
});

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div id="map" style="height: 400px;"></div>`,
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() addressCoords: { lat: number; lng: number } | null = null;

  private map!: L.Map;
  private marker!: L.Marker;

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    if (this.addressCoords) {
      this.addMarker(this.addressCoords);
    }
  }

  ngOnChanges(): void {
    if (this.map && this.addressCoords) {
      this.addMarker(this.addressCoords);
      this.map.setView([this.addressCoords.lat, this.addressCoords.lng], 13);
    }
  }

  private addMarker(coords: { lat: number; lng: number }) {
    if (this.marker) {
      this.marker.setLatLng(coords);
    } else {
      this.marker = L.marker([coords.lat, coords.lng]).addTo(this.map);
    }
  }
}
