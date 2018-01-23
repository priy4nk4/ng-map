import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DistanceService {
  url= "https://maps.googleapis.com/maps/api/directions/json?"
  startloc= "origin="
  endloc = "&destination="
  API_KEY= "&key=AIzaSyC2xBjutEDe9Nu_6MXe3apFnFghPxZhJzA"
  // results: any;

  nearby_api = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
  location = "location="
  radius = "&radius=5000&"
  type = "type=restaurant&"
  keyword = "keyword=software"

  geocode_api = "https://maps.googleapis.com/maps/api/geocode/json?"
  address = "address="



  constructor(private http:Http) { }
  getData(from, to){
    try{
      var api = this.url+this.startloc+from+this.endloc+to+this.API_KEY
      
     var results =  this.http.get(api).map(Response=>Response.json());
    
    // console.log(lat, lng)
     console.log(results)
     return results;
    }
    catch (e){
      alert(e)
    }
     
  }
  getNearByPlaces(lat, lng){
    var nearby_url = this.nearby_api+this.location+lat+","+lng+this.radius+this.type+this.API_KEY
    var data =  this.http.get(nearby_url).map(Response=>Response.json());
    return data
  }

 getNearByCompanies(lat, lng){
    var nearby_url = this.nearby_api+this.location+lat+","+lng+this.radius+this.keyword+this.API_KEY
    var data =  this.http.get(nearby_url).map(Response=>Response.json());
    return data
  }
  getLatLng(address){
    var geocode_url = this.geocode_api+this.address+address+this.API_KEY
    var data = this.http.get(geocode_url).map(Response=>Response.json())
    return data
  }



}
