import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { contratoModel } from '../../../models/contrato.model';
import { ApiService } from '../../../services/api.service';
import { contratoListModel } from '../../../models/contrato-list.model';
import { amortizacionListModel } from '../../../models/amortizacion.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contracts: contratoModel[] = [];
  dates: string[] = [];
  fecha: string;
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


  contractsGenerates: contratoListModel[] = [];
  contractGenerate: contratoListModel;
  amortizacion: amortizacionListModel[] = [];
  datosA: any[] = [];
  fechaPend: Date[] = [];
  salpen: number[] = [];
  mora: number[] = [];
  estado: string[] = [];
  constructor( private api: ApiService ) { }

  // lineChartData: ChartDataSets[] = [
  //   { data: [2, 1], label: 'Generados' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Por Generar' },
    // { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Pendientes' }
  // ];

  // lineChartLabels: Label[] = this.dates.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);

  // public lineChartOptions: any = {
  //   responsive: true
  // };

  // public lineChartLegend = true;
  // public lineChartType = 'line';

  ngOnInit(): void {
    this.api.tokenReturn().then((token) => {
      this.api.getContracts(token)
      .subscribe( resp => {
        this.contracts = resp.contract;
      });
    });

    setTimeout(() => {
      this.contracts.forEach(contract => {
        let date = String(contract.date).split('T');
        date = date[0].split('-');

        this.fecha = this.meses[Number(date[1]) - 1] + ' ' + date[0];
        this.dates.push( this.fecha );
      });

      console.log(this.dates.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual) );
    }, 500);



  }

}
