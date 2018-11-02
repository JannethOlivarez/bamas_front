import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from '../modelos/historiaClinica';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { HistoriaClinicaService } from '../../servicios/historiaClinica.service';
import { Constantes } from '../constantes';
import { CatalogoService } from '../../servicios/catalogos.service';

@Component({
    templateUrl: './historiaClinica.component.html'
})
export class HistoriaClinicaComponent implements OnInit{
    tipo
    loading = false
    constantes = new Constantes()
    banderaEdicion = 0
    constructor(private route: ActivatedRoute, private _historiaClinicaService: HistoriaClinicaService) {
    }
    registros = []
    totalRegistros = 0
    registro;
    cols = [
        { field: 'numeroHc', header: 'Numero' }
    ]
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tipo = params['tipo'];
            console.log(this.tipo);        
        });               
    }

    cargarHistoriaClinica() {
                
        this._historiaClinicaService.getCantidadHistoriaClinicaByTipo(this.tipo)
            .subscribe((total: any) => {
                this.totalRegistros = total;
                this.loadHistoriaClinicaLazy({ first: 0, rows: this.constantes.tamanoPagina })
                this.banderaEdicion = 0;
            }, (err: any) => {
                console.log(err)
            });

    }
    guardar(){
        this._historiaClinicaService.saveHistoriaClinica(this.tipo,this.registro)
        .subscribe((total: any) => {
          this.cargarHistoriaClinica();
        }, (err: any) => {
            console.log(err)
        });
    }
    editar(registro){
        this.registro=registro;
        this.banderaEdicion=1;
    }
    loadHistoriaClinicaLazy(event: LazyLoadEvent) {
        this.loading = true;
        console.log(event);

        this._historiaClinicaService.getHistoriaClinicaPaginado(this.tipo, event.first/event.rows, event.rows)
            .subscribe((misRegitros: any) => {
                this.registros = misRegitros.content;

            }, (err: any) => {
                console.log(err)
            });
    }

    nuevo(myform){
        myform.onReset();
        this.registro= new HistoriaClinica();
        this.banderaEdicion=1;

    }


}
