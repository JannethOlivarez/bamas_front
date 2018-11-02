import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UrlServices } from './urls'
import { GeneralService } from './general.services';
@Injectable()
export class FamiliarService {

    url = new UrlServices();
    
    constructor(private _generalServices: GeneralService) {
        //this._generalServices.autenticar("admin","password"); 
    }

}
