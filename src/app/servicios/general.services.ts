import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
//import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { BlockUI, NgBlockUI } from 'ng-block-ui';
//import * as CryptoJS from 'crypto-js';
import { UrlServices } from './urls';

@Injectable()
export class GeneralService {
    //@BlockUI() blockUI: NgBlockUI;
    url = new UrlServices();
    strSesion = 'sesion';
    key = 'HackersSeeIT2';
    constructor(private _http: Http, private _router: Router) { }

    autenticar(username, password) {
        let params = new URLSearchParams();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa('encuestas:uioEncuestaSuio'))
        let options = new RequestOptions({ headers: headers });

        this._http.post(this.url.login + '&username=' + username + '&password=' + password, params.toString(), options)
            .map(res => res.json())
            .subscribe(
                token => {
                    let headersToken = new Headers();
                    headersToken.append('Authorization', 'Bearer ' + token.access_token)
                    let optionsToken = new RequestOptions({ headers: headersToken });
                    this._http.get(this.url.token, optionsToken)
                        .map(res => res.json())
                        .subscribe(
                            usuario => {
                                let nombres = ''


                                if (usuario.principal && usuario.principal.rol) {
                                    let roles = JSON.parse(usuario.principal.rol)
                                    if (roles.find(x => x == "A") || roles.find(x => x == "R")) {
                                        if (roles.find(x => x == "A")) {
                                            localStorage.setItem('rol', "0");
                                        } else if (roles.find(x => x == "R")) {
                                            localStorage.setItem('rol', "1");
                                        }

                                        localStorage.setItem('nombres', usuario.principal.nombres);
                                        localStorage.setItem('id', usuario.principal.id);
                                        let usuarioLocalStorage = { 'token': token, 'usuario': usuario.principal }
                                       // var encrypted = CryptoJS.AES.encrypt(JSON.stringify(usuarioLocalStorage), this.key);
                                        //let sesion = encrypted.toString()
                                       // localStorage.setItem(this.strSesion, sesion);

                                        window.open('/', '_self')
                                    } else {
                                        this._router.navigate(['/login/error']);
                                    }
                                }

                                // localStorage.setItem('nombres', nombres);
                                // let usuarioLocalStorage = { 'token': token, 'usuario': usuario.principal }
                                // localStorage.setItem("administrador",usuario.principal.rol)

                                // var encrypted = CryptoJS.AES.encrypt(JSON.stringify(usuarioLocalStorage), this.key);
                                // let sesion = encrypted.toString()
                                // localStorage.setItem(this.strSesion, sesion);

                                // window.open('/', '_self')


                                err => { this._router.navigate(['/login/error']); }
                            },
                            err => { this._router.navigate(['/login/error']); }
                        );
                },
                err => { this._router.navigate(['/login/error']); }
            );

    }


    checkCredentials() {
        if (localStorage.getItem(this.strSesion) == null) {
            this._router.navigate(['/login']);
        }
    }
    // getCredentials() {
    //     if (localStorage.getItem(this.strSesion) == null) {
    //         this._router.navigate(['/login']);
    //     } else {
    //         var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
    //         let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    //         return persona.usuario.roles
    //     }
    // }



    getPersonaId() {
        if (localStorage.getItem(this.strSesion) == null) {
            this._router.navigate(['/login']);
        } else {
           // var decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
           // let persona = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
           // return persona.usuario.personaId
        }
    }

    logout() {
        localStorage.removeItem(this.strSesion);
        localStorage.removeItem('nombres');
        localStorage.removeItem('rol');
        this._router.navigate(['/login']);

    }
    getResources(tipo, url, body = null): Observable<any> {
       // this.blockUI.start('Loading...');
        let result;
      
            if (tipo === 'get') {
                return this._http['get'](url)
                    .map((res: Response) => {
                       // this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo === 'post') {
                return this._http['post'](url, body)
                    .map((res: Response) => {
                       // this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo === 'delete') {
                return this._http.delete(url)
                    .map((res: Response) => {
                       // this.blockUI.stop();
                        result = res.json();
                        return result;
                    }).catch(this.handleError());
            } else if (tipo === 'getFile') {
               let optionsToken = new RequestOptions({ responseType: ResponseContentType.Blob });
                return this._http['get'](url)
                    .map((res: Response) => {
                       // this.blockUI.stop();
                        return res;
                    }).catch(this.handleError());
            }


        
        return null;
    }

    // getResources(tipo, url, body = null): Observable<any> {
    //     this.blockUI.start('Loading...');
    //     let result;
    //     if (localStorage.getItem(this.strSesion) != null) {
    //         const headersToken = new Headers();
    //         const decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.strSesion), this.key);
    //         const token = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    //         headersToken.append('Authorization', 'Bearer ' + token.token.access_token)
    //         let optionsToken = new RequestOptions({ headers: headersToken });
    //         if (tipo === 'get') {
    //             return this._http['get'](url, optionsToken)
    //                 .map((res: Response) => {
    //                    // this.blockUI.stop();
    //                     result = res.json();
    //                     return result;
    //                 }).catch(this.handleError());
    //         } else if (tipo === 'post') {
    //             return this._http['post'](url, body, optionsToken)
    //                 .map((res: Response) => {
    //                    // this.blockUI.stop();
    //                     result = res.json();
    //                     return result;
    //                 }).catch(this.handleError());
    //         } else if (tipo === 'delete') {
    //             return this._http.delete(url, optionsToken)
    //                 .map((res: Response) => {
    //                    // this.blockUI.stop();
    //                     result = res.json();
    //                     return result;
    //                 }).catch(this.handleError());
    //         } else if (tipo === 'getFile') {
    //             optionsToken = new RequestOptions({ headers: headersToken, responseType: ResponseContentType.Blob });
    //             return this._http['get'](url, optionsToken)
    //                 .map((res: Response) => {
    //                    // this.blockUI.stop();
    //                     return res;
    //                 }).catch(this.handleError());
    //         }


    //     }
    //     return null;
    // }


    private handleError() {
        return (res: Response) => {
           // this.blockUI.stop();
            const errMessage = 'Error';
            if (res.status == 401) {

                this._router.navigate(['/login']);
            }

            return Promise.reject(errMessage);
        };
    }

}
