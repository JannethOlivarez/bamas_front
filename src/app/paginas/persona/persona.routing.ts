import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './persona.component';



const routes: Routes = [
  {
    path: '',
    component: PersonaComponent
  },
  //parametros de entrada para la ruta 
  {
    path: ':tipo',
    component: PersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PersonaRoutingModule { }