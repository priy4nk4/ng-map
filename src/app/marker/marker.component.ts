import { Component } from '@angular/core';
import { DistanceService } from '../Services/distance.service';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css'],
  providers: [DistanceService]
})
export class MarkerComponent {

 constructor(private path: DistanceService){}
  results: any[];
 
  lat: number = 20.825588;
  lng: number = -71.018029;
  zoom: number = 2;

  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;

  markers: marker[] = [
    {
      name: 'Company One',
      lat: 20.009,
      lng: 83.018029,
      draggable: true
    },
    {
      name: 'Company Two',
      lat:18.009,
      lng: 75.018029,
      draggable: true
    },
    {
      name: 'Company Three',
      lat: 22.009,
      lng: 79.018029,
      draggable: true
    }
  ];

  clickedMarker(marker: marker, index: number) {
    console.log('clicked marker: ' + marker.name + ' at index' + index)
  }
  mapClicked($event: any) {
    console.log('Map Clicked');
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.markers.push(newMarker);
  }
  markerDragEnd(marker: any, $event: any) {
    console.log('dragEnd', marker, $event);

    var upMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newlat = $event.coords.lat;
    var newlng = $event.coords.lng;
  }
  addMarker(address:HTMLInputElement) {
    
    this.path.getLatLng(address).subscribe(
      
      data => {
        var lat = data.results[0].geometry.location.lat
        var lng = data.results[0].geometry.location.lng

        this.path.getNearByCompanies(lat, lng).subscribe(
          response => {
            console.log(response)
            var marker_obj = []
            for(var i=0; i<response.results.length; i++){
              var latitude = response.results[i].geometry.location.lat
              var longitude = response.results[i].geometry.location.lng
              var name = response.results[i].name
             
              marker_obj.push({
                "lat" : latitude,
                "lng" : longitude,
                "name": name
              })
            }
            this.results = marker_obj;
          }
        )
        })
    

    if (this.markerDraggable == 'yes') {
      var isDraggable = true;
    }
    else {
      var isDraggable = false;
    }
    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }
    this.markers.push(newMarker);
  }
}
interface marker{
  name?:string;
  lat: number;
  lng: number;
  draggable: boolean;
}
