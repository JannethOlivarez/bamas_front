


export class UrlServices {

  //servidor = 'http://ec2-18-191-152-105.us-east-2.compute.amazonaws.com'
  servidor = 'http://localhost'
  
  autorizacion = this.servidor + ':9010/encuestas-uio';
  proxy = this.servidor + ':8080/';
  login = this.autorizacion + '/oauth/token?grant_type=password'
  token = this.autorizacion + '/user'

  cantidad=this.proxy+"{name_space}/count"
  paginado=this.proxy+"{name_space}/paginacion?pageNumber=?1&pageSize=?2"
  save=this.proxy+"{name_space}/"

  catalogosHijos=this.proxy+"catalogo/hijos/lista"

  urlCantidad(name_space){
    console.log(name_space);
    let url =this.cantidad.replace("{name_space}",name_space)
    return url
  }

  urlPaginado(name_space,pageNumber,pageSize){
    console.log(name_space);
    let url =this.paginado.replace("{name_space}",name_space).replace("?1",pageNumber).replace("?2",pageSize)
    return url
  }

  urlSave(name_space){
    console.log(name_space);
    let url =this.save.replace("{name_space}",name_space)
    return url
  }
  
  constructor() {

  }



}
