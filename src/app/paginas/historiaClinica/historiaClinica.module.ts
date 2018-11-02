import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistoriaClinicaRoutingModule } from './historiaClinica.routing';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {HistoriaClinicaService } from '../../servicios/historiaClinica.service';
import { GeneralService } from '../../servicios/general.services';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { CatalogoService } from '../../servicios/catalogos.service';
import {DropdownModule} from 'primeng/dropdown';
import {HistoriaClinicaComponent } from './historiaClinica.component';
import {DialogModule} from 'primeng/dialog';
import {AccordionModule} from 'primeng/accordion';
import {ToolbarModule} from 'primeng/toolbar';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    HistoriaClinicaRoutingModule,
    TableModule,
    PanelModule,
    DialogModule,
    AccordionModule,  
    ToolbarModule  
  ],
  declarations: [HistoriaClinicaComponent],
  providers:[GeneralService, HistoriaClinicaService]
})
export class HistoriaClinicaModule { }