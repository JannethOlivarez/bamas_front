import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoriaClinicaComponent } from './historiaClinica.component';


const routes: Routes = [
  {
    path: '',
    component: HistoriaClinicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HistoriaClinicaRoutingModule { }