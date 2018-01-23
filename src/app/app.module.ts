import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {RouterModule,Route} from '@angular/router';


import { AppComponent } from './app.component';
import { DistanceComponent } from './distance/distance.component';
import { MarkerComponent } from './marker/marker.component';

@NgModule({
  declarations: [
    AppComponent,
    DistanceComponent,
    MarkerComponent, 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
  apiKey : 'AIzaSyBQNM-gDPZrrPn1DVQkKSfFayuf_U5FyEQ'}),
   RouterModule.forRoot([
     
      { path: '', component:MarkerComponent},
       { path : 'nearby', component:DistanceComponent },
     
     
   ]
      // <-- debugging purposes only
)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
