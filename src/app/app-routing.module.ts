import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SvgImportComponent } from './svg-import/svg-import.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'svgImport', component: SvgImportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
