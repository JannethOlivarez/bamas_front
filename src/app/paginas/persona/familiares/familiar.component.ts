import { Component, OnInit } from '@angular/core';
import { Familiar } from '../../modelos/familiar';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { FamiliarService } from '../../../servicios/familiar.service';
import { Constantes } from '../../constantes';
import { CatalogoService } from '../../../servicios/catalogos.service';

@Component({
    selector:"familiares",
    //vista

    templateUrl: './familiar.component.html',
})
export class FamiliarComponent implements OnInit {
    //variables para diferenciar si es doctor,civil, o militar
    tipo
    loading = false
    constantes = new Constantes()
    // 0 = lista , 1 = ver/editar
    banderaEdicion = 0
    constructor(private route: ActivatedRoute, private _familiarService: FamiliarService,private _catalogoService:CatalogoService) {

    }

    registros = []
    totalRegistros = 0
    registro;
    cols = [
        { field: 'parentesco', header: 'Parentesco' }
        
    ];
    
    ngOnInit() {                   
    }


    editar(registro){
        this.registro=registro;
        this.banderaEdicion=1;
    }


    nuevo(myform){
        myform.onReset();
        this.registro= new Familiar();
        this.banderaEdicion=1;

    }


}
