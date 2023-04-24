import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { DatosPersonales } from '../models/datospersonales';

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {
    //url conexion a backend
  urlApi= environment.conexionApi 

  constructor(private http:HttpClient) { }

  //metodo para consultar
  get(Documento : string){
    return this.http.get<DatosPersonales[]>(this.urlApi+"/Usuarios?Documento=" + Documento  )
  }

  

}
