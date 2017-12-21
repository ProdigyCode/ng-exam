import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AppService } from './app.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  providers: [AppService]
})

export class AppComponent {
}