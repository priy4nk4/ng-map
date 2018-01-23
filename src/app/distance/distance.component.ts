import { Component, OnInit } from '@angular/core';
import { DistanceService } from '../Services/distance.service';
import { NgForm} from '@angular/forms';



@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css'],
  providers : [DistanceService]
})
export class DistanceComponent {
  info : any={};
  lat: any[];
  lng: any[];
  res: any[];
 

  constructor(private distanceservice: DistanceService) { }


  Getdistance(startpoint:HTMLInputElement, endpoint:HTMLInputElement){
   
    this.distanceservice.getData(startpoint, endpoint).subscribe(
      Data => {
        // console.log("Distance is:" + Data.routes[0].legs[0].distance.text + "Time is: " +
                // Data.routes[0].legs[0].duration.text)
        var distance = Data.routes[0].legs[0].distance.text
        var duration = Data.routes[0].legs[0].duration.text
        var output = {
          "distance" : distance,
          "duration": duration,
          "start_address": Data.routes[0].legs[0].start_address
        }
        var lat = Data.routes[0].legs[0].start_location.lat
        var lng = Data.routes[0].legs[0].start_location.lng
        this.info  = output;
        console.log(Data)

        this.distanceservice.getNearByPlaces(lat, lng).subscribe(
          response => {
           this.res = response.results;
           console.log(this.res)
          }
        )
      }
    )
  }

 




  

}
