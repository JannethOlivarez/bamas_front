import {Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UrlServices } from './urls'
import { GeneralService } from './general.services';
@Injectable()
export class PsicologiaService{
    
    url=new UrlServices();
    constructor(private _generalServices: GeneralService){

    }
    getCantidadPsicologiaByTipo(tipo): Observable<any> {
        // get para saber quepeticion se hace y endpoint  es la url del servico que  se quiere hacer la peticion
       
        return this._generalServices.getResources('get', this.url.urlCantidad(tipo))

    }

    getPsicologiaPaginado(tipo,number,size): Observable<any> {
        return this._generalServices.getResources('get', this.url.urlPaginado(tipo,number,size))
    }

    savePsicologia(tipo,psicologia): Observable<any> {
        return this._generalServices.getResources('post', this.url.urlSave(tipo),psicologia)
    }

}

