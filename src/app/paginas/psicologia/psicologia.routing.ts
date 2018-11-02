import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PsicologiaComponent } from './psicologia.component';
import { PsicologiaService } from '../../servicios/psicologia.service';

const routes: Routes=[
{
    path:'',
    component: PsicologiaComponent
}

];
@NgModule({
    imports:[RouterModule.forChild(routes)]

})
export class PsicologiaRoutingModule{}