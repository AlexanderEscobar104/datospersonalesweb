import { Component } from '@angular/core';
import { DatosPersonales } from 'src/app/models/datospersonales';
import { DatosPersonalesService } from 'src/app/services/datospersonales.service';
import { LoadingController, ToastController } from '@ionic/angular';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.css']
})
export class DatospersonalesComponent {
  datospersonales: DatosPersonales[];
  documento : string;
  loading: any;
  existe: boolean = false;
  constructor(private datospersonalesService: DatosPersonalesService, 
    public loadingController: LoadingController,
    public toastController: ToastController,){}

  ngOnInit(){

  }

  //metodo para consultar datos
  getDatos(){
    if(this.documento != ""){
      this.presentLoading();
      //lista todos los turnos
      this.datospersonalesService.get(this.documento).subscribe(data=>{
        this.datospersonales=data;
        this.existe=true;
        console.log("datos", data)
       
      })
    }else{
      console.log("datos requeridos")
      this.presentToast("Ingrese Los Datos Obligatorios.");
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Generando Turnos...',
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  //excel exportar
  exportToExcel() {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.datospersonales); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "datospersonales");
    });
  }

  //guardar archivo excel
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      
      FileSaver.saveAs(
        data,
        fileName  + new Date().getTime() + EXCEL_EXTENSION
      );
  }

 
}
