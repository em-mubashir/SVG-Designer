import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SvgImportComponent } from './svg-import/svg-import.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SvgImportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
