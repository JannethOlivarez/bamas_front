import { Component, OnInit } from '@angular/core';
import { Psicologia } from '../modelos/psicologia';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { PsicologiaService } from '../../servicios/psicologia.service';
import { Constantes } from '../constantes';
import { registerLocaleData } from '@angular/common';

@Component({
    templateUrl:'./psicologia.component.html'
})
export class PsicologiaComponent implements OnInit{
    tipo
    loading=false
    constantes=new Constantes()
    banderaEdicion=0
    constructor(private route: ActivatedRoute, private _psicologiaService: PsicologiaService){        
    }
    registros=[]
    totalRegistros=0
    registro;
    cols=[
        { field: 'observaciones', header: 'Observaciones' },
        { field: 'nombrePsicologo', header: 'Especialista' },
        { field: 'opinion', header: 'Opinion' }
    ]
       ngOnInit() {
        this.route.params.subscribe(params => {
            this.tipo = params['tipo']; 
            console.log(this.tipo);        
        });
    }
        cargarPsicologia() {
        
        
            this._psicologiaService.getCantidadPsicologiaByTipo(this.tipo)
                .subscribe((total: any) => {
                    this.totalRegistros = total;
                    this.loadPsicologiaLazy({ first: 0, rows: this.constantes.tamanoPagina })
                    this.banderaEdicion = 0;
                }, (err: any) => {
                    console.log(err)
                });
    
        }
        guardar(){
            this._psicologiaService.savePsicologia(this.tipo,this.registro)
            .subscribe((total: any) => {
               this.cargarPsicologia();
            }, (err: any) => {
                console.log(err)
            });
        } 
        editar(registro){
            this.registro=registro;
            this.banderaEdicion=1;
        }
    
        loadPsicologiaLazy(event: LazyLoadEvent) {
            this.loading = true;
            console.log(event);
    
            this._psicologiaService.getPsicologiaPaginado(this.tipo, event.first/event.rows, event.rows)
                .subscribe((misRegitros: any) => {
                    this.registros = misRegitros.content;
    
                }, (err: any) => {
                    console.log(err+"errorsito")
                });
        }
    
        nuevo(myform){
            myform.onReset();
            this.registro= new Psicologia();
            this.banderaEdicion=1;
    
        }
        
       
    }

