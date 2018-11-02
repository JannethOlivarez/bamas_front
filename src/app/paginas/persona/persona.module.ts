import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaRoutingModule } from './persona.routing';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import { PersonaService } from '../../servicios/personas.service';
import { GeneralService } from '../../servicios/general.services';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { CatalogoService } from '../../servicios/catalogos.service';
import {DropdownModule} from 'primeng/dropdown';
import { PersonaComponent } from './persona.component';
import {DialogModule} from 'primeng/dialog';
import { FamiliarComponent } from './familiares/familiar.component';
import { FamiliarService } from '../../servicios/familiar.service';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    PersonaRoutingModule,
    TableModule,
    PanelModule,
    DialogModule
    
  ],
  //compenentes siempre en declarations
  declarations: [PersonaComponent,FamiliarComponent],
  //servicio interaccion datos
  providers:[GeneralService, PersonaService,CatalogoService,FamiliarService]
})
export class PersonaModule { }