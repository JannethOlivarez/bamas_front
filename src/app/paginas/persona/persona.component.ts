import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../breadcrumb.service';
import { Persona } from '../modelos/persona';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/primeng';
import { PersonaService } from '../../servicios/personas.service';
import { Constantes } from '../constantes';
import { CatalogoService } from '../../servicios/catalogos.service';

@Component({
    //vista
    templateUrl: './persona.component.html',
    //estilo css
    styleUrls: ["./persona.css"]
})
export class PersonaComponent implements OnInit {
    //variables para diferenciar si es doctor,civil, o militar
    tipo
    loading = false
    constantes = new Constantes()
    // 0 = lista , 1 = ver/editar
    banderaEdicion = 0
    constructor(private route: ActivatedRoute, private _personaService: PersonaService,private _catalogoService:CatalogoService) {

    }

    registros = []
    totalRegistros = 0
    registro;
    cols = [
        { field: 'cedula', header: 'Cédula' },
        { field: 'nombres', header: 'Nombres' },
        { field: 'apellidoPaterno', header: 'Apellido Paterno' },
        { field: 'apellidoMaterno', header: 'Dirección' },
        { field: 'telefono', header: 'Teléfono' },
        { field: 'sexo', header: 'Sexo' },
        { field: 'estadoCivil', header: 'EstadoCivil' },
        { field: 'fechaNacimiento', header: 'Fecha de Nacimiento' },
        { field: 'lugarNacimiento', header: 'Lugar de Nacimiento' },
        { field: 'raza', header: 'Raza' }
        
    ];

    estadoCivil: SelectItem[]=[{value:null,label:this.constantes.labelSeleccione}];
    sexo: SelectItem[]=[{value:null,label:this.constantes.labelSeleccione}];
    gradosMilitares: SelectItem[]=[{value:null,label:this.constantes.labelSeleccione}];
    especialidadVuelo: SelectItem[]=[{value:null,label:this.constantes.labelSeleccione}];
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tipo = params['tipo']; // (+) converts string 'id' to a number
            console.log(this.tipo);
            this.cargarPersonas();
        });
        this.cargarCatalogos();
        
       
    }

    cargarPersonas() {
        
        
        this._personaService.getCantidadPersonaByTipo(this.tipo)
            .subscribe((total: any) => {
                this.totalRegistros = total;
                this.loadPersonaLazy({ first: 0, rows: this.constantes.tamanoPagina })
                this.banderaEdicion = 0;
            }, (err: any) => {
                console.log(err)
            });

    }

    cargarCatalogos(){
        this._catalogoService.getCatalogosByIds([this.constantes.catalogoIds.sexo, this.constantes.catalogoIds.estadoCivil, this.constantes.catalogoIds.gradosMilitares,this.constantes.catalogoIds.especialidadVuelo])
        .subscribe((catalogos: any[]) => {
          catalogos.filter(x => x.padreId == this.constantes.catalogoIds.estadoCivil).forEach(x => {
            this.estadoCivil.push({ label: x.nombre, value: x.id })
          });
          catalogos.filter(x => x.padreId ==this.constantes.catalogoIds.gradosMilitares).forEach(x => {
            this.gradosMilitares.push({ label: x.nombre, value: x.id })
          });
          catalogos.filter(x => x.padreId ==this.constantes.catalogoIds.especialidadVuelo).forEach(x => {
            this.especialidadVuelo.push({ label: x.nombre, value: x.id })
          });
          catalogos.filter(x => x.padreId ==this.constantes.catalogoIds.sexo).forEach(x => {
            this.sexo.push({ label: x.nombre, value: x.id })
          });
         

        }, (err: any) => {
            ///this.msgs.push({ severity: 'error', summary: 'Error', detail: 'No se pudo consultar la lista de Catalogos.' }),
          });
    }

    guardar(){
        this._personaService.savePersona(this.tipo,this.registro)
        .subscribe((total: any) => {
           this.cargarPersonas();
        }, (err: any) => {
            console.log(err)
        });
    }

    editar(registro){
        this.registro=registro;
        this.banderaEdicion=1;
    }

    loadPersonaLazy(event: LazyLoadEvent) {
        this.loading = true;
        console.log(event);

        this._personaService.getPersonasPaginado(this.tipo, event.first/event.rows, event.rows)
            .subscribe((misRegitros: any) => {
                this.registros = misRegitros.content;

            }, (err: any) => {
                console.log(err)
            });
    }

    nuevo(myform){
        myform.onReset();
        this.registro= new Persona();
        this.banderaEdicion=1;

    }


}
