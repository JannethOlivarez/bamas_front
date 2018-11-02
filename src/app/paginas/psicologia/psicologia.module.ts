import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologiaRoutingModule } from './psicologia.routing';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import { GeneralService } from '../../servicios/general.services';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { CatalogoService } from '../../servicios/catalogos.service';
import {DropdownModule} from 'primeng/dropdown';
import {PsicologiaComponent } from './psicologia.component';
import {DialogModule} from 'primeng/dialog';
import { PsicologiaService } from '../../servicios/psicologia.service';
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        PsicologiaRoutingModule,
        TableModule,
        PanelModule,
        DialogModule        
      ],
      declarations:[PsicologiaComponent],
      providers:[GeneralService,PsicologiaService]
})
export class PsicologiaModule{}