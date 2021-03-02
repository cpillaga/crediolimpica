// import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { contratoModel } from '../../../models/contrato.model';
import { ApiService } from '../../../services/api.service';

import { Component, OnInit } from '@angular/core';
import { contratoListModel } from 'src/app/models/contrato-list.model';
import { amortizacionListModel } from '../../../models/amortizacion.model';



@Component({
  selector: 'app-contract-list',
  templateUrl: './payment.component.html',
  styleUrls: []
})
export class PaymentComponent implements OnInit {

  contracts: contratoModel[] = [];
  contractsGenerates: contratoListModel[] = [];
  contractGenerate: contratoListModel;
  amortizacion: amortizacionListModel[] = [];
  data: amortizacionListModel[] = [];
  datosA: any[] = [];
  fechaPend: Date[] = [];
  salpen: number[] = [];
  mora: number[] = [];
  estado: string[] = [];
  codContrato: string;
  mes: number[] = [];
  pago: number = 0;

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
    this.getAmortizacion();
  }

  getAmortizacion() {
    this.amortizacion = [];
    this.api.tokenReturn().then((token) => {
      this.api.getContracts(token).subscribe((resp) => {

        for (let j = 0; j < resp.contract.length; j++) {
          var contrato = resp.contract;
          
          var aux = 0;
          var saldoPend = 0;
          var array = [];
          var diasMora = 0;
          var st;

          this.api.getAmortizacion(token, contrato[j]._id).subscribe((data) => {
            for (let i = 0; i < data.length; i++) {
              var fecha = moment(data[i].fecha);
              var fAct = moment();

              var meses = data[i].meses;

              if(moment(fecha).isBefore(fAct) && meses >= 1){
                if (data[i].estado != 'Vencido' && data[i].pagoTotal > 0) {
                  this.cambioEstado(token, data[i]._id, 'Vencido');
                }
                var resta = moment().diff(fecha);

                array[aux] = (fecha.format('DD/MM/yyyy'));
                saldoPend = saldoPend + data[i].pagoTotal;
                aux++;
                st = data[i].estado;
                diasMora = diasMora + Math.round((resta / 86400000));
              }
            }

            this.fechaPend.push(array[0]);
            this.salpen.push(saldoPend);
            this.mora.push(diasMora);
            this.estado.push(st);
            this.amortizacion.push(data[j]);
          });
        }
      });
    });
  }

  cambioEstado(token, id, estado){
    this.api.cambioEstadoAmort(token, id, estado).subscribe((data) => {
      console.log(data);
    });
  }

  cambioValorpago(token, id, pago){
    this.api.cambioValorPago(token, id, pago).subscribe((data) => {
      console.log(data);
    });
  }

  setContrato(id){
    this.pago = 0;
    this.codContrato = id;
  }

  setPago(cantidad){
    this.api.tokenReturn().then((token) => {
      this.api.getAmortizacion(token, this.codContrato).subscribe((data) => {
        var cuota;
        var valorPagar;
        var pagar;

        for (let i = 1; i < data.length; i++) {
          console.log("Cantidad" + cantidad);
          valorPagar = data[i].pagoTotal;

          if(cantidad == valorPagar){
            console.log('Estado: Pagado');
            this.cambioEstado(token, data[i]._id, 'Pagado');
            this.cambioValorpago(token, data[i]._id, 0);
            return;
          }else if(cantidad < valorPagar){
            pagar = valorPagar - cantidad;
            var fecha = moment(data[i].fecha);
            var fAct = moment();
            var meses = data[i].meses;

            if(moment(fecha).isBefore(fAct) && meses >= 1){
              console.log("Estado: Vencido");
              this.cambioEstado(token, data[i]._id, 'Vencido');
              this.cambioValorpago(token, data[i]._id, pagar);
            }else if(moment(fecha).isAfter(fAct) && meses >= 1){
              console.log("Estado: A favor");
              this.cambioEstado(token, data[i]._id, 'A favor');
              this.cambioValorpago(token, data[i]._id, pagar);
            }else{
              console.log("Estado: Vencido");
              this.cambioEstado(token, data[i]._id, 'A favor');
              this.cambioValorpago(token, data[i]._id, pagar);
            }

            return;
          }else if(cantidad > valorPagar){
            console.log("Estado: Pagado");
            this.cambioEstado(token, data[i]._id, 'Pagado');
            this.cambioValorpago(token, data[i]._id, 0);
            cuota = cantidad - valorPagar;
            cantidad = cuota;
          }
        }
      });
    });

    this.getAmortizacion();

  }
}
