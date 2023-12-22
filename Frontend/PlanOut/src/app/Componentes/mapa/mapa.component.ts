import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapGeocoder } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMapsModule } from '@angular/google-maps'
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, FormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})


export class MapaComponent {

  private geocoder: MapGeocoder

  origen=""
  destino=""

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 4.645926,
    lng: -74.077604
  };
  zoom = 11;

  markerPositions: google.maps.LatLngLiteral[] = [];

  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor(geocoder: MapGeocoder){
    this.geocoder = geocoder
  }


  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center.lat = position.coords.latitude
        this.center.lng = position.coords.longitude
        this.markerPositions.push({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
      
    }
  }


  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  OnSubmit(){
    console.log(this.origen)
    this.geocoder.geocode({
      address: this.origen
    }).subscribe((results)=>{
      console.log(results)
    })
        
  }

  

}