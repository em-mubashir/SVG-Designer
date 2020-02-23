import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SvgShapesComponent } from './svg-shapes/svg-shapes.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TopBarComponent,
    SvgShapesComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component : LoginComponent },
      { path: 'dashboard', component : DashboardComponent },
      { path: 'svgshapes', component : SvgShapesComponent }

      ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
