import { NgModule }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DetailComponent } from './detail.component';

// Route Configuration
export const appRoutes: Routes = [
  { path: '', redirectTo: 'map/asean/en', pathMatch: 'full' }
];

export const childRoutes: Routes = [
  { path: 'map/:region/:language/:country', component: DetailComponent},
  { path: 'map/:region/:language', component: DetailComponent},
  { path: '**', redirectTo: 'map/asean/en' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    RouterModule.forChild(
      childRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
