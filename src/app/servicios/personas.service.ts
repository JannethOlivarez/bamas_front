import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UrlServices } from './urls'
import { GeneralService } from './general.services';
@Injectable()
export class PersonaService {

    url = new UrlServices();
    
    constructor(private _generalServices: GeneralService) {
        //this._generalServices.autenticar("admin","password"); 
    }

    getCantidadPersonaByTipo(tipo): Observable<any> {
        // get para saber quepeticion se hace y endpoint  es la url del servico que  se quiere hacer la peticion
       
        return this._generalServices.getResources('get', this.url.urlCantidad(tipo))

    }

    getPersonasPaginado(tipo,number,size): Observable<any> {
        return this._generalServices.getResources('get', this.url.urlPaginado(tipo,number,size))
    }

    savePersona(tipo,persona): Observable<any> {
        return this._generalServices.getResources('post', this.url.urlSave(tipo),persona)
    }


}
