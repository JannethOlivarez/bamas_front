import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UrlServices } from './urls'
import { GeneralService } from './general.services';
@Injectable()
export class CatalogoService {

    url = new UrlServices();
    
    constructor(private _generalServices: GeneralService) {
        //this._generalServices.autenticar("admin","password"); 
    }

    getCatalogosByIds(ids): Observable<any> {
       
        return this._generalServices.getResources('post', this.url.catalogosHijos,ids)

    }

    getPersonasPaginado(tipo,number,size): Observable<any> {
        return this._generalServices.getResources('get', this.url.urlPaginado(tipo,number,size))
    }

    savePersona(tipo,persona): Observable<any> {
        return this._generalServices.getResources('post', this.url.urlSave(tipo),persona)
    }


}
