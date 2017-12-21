import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { DetailComponent } from './detail.component';
import { AppRoutingModule } from './app.routing';

import { HttpService } from '../common/service/http.service';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	ReactiveFormsModule,
  	HttpModule,
  	AppRoutingModule
	],
  declarations: [ AppComponent, DetailComponent],
  bootstrap: [ AppComponent ],
  providers: [
  	HttpService
  ]
})
export class AppModule { }
