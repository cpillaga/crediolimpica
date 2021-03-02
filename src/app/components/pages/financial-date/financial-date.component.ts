import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { financialDataModel } from '../../../models/financialData.model';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-financial-date',
  templateUrl: './financial-date.component.html',
  styleUrls: ['./financial-date.component.css']
})
export class FinancialDateComponent implements OnInit {

  firstDueDate: any;
  lastDueDate: any;

  finacialData: financialDataModel = new financialDataModel();

  @Output() financialDataEvent = new EventEmitter<financialDataModel>();

  constructor( private api: ApiService) {
    this.finacialData.iva = 12;
    this.finacialData.total = 0;
    this.finacialData.amountFinanced = 0;
    this.finacialData.totalCredit = 0;
  }

  ngOnInit(): void {
  }

  sendFinancialData() {
    this.saveFinacialData();
    setTimeout(() => {
      this.financialDataEvent.emit(this.finacialData);
    }, 1000);
  }

  calcularTotal(): void {
    this.finacialData.total = this.finacialData.subtotal + (this.finacialData.subtotal * (this.finacialData.iva / 100));
    this.finacialData.interes = this.finacialData.subtotal * (this.finacialData.iva / 100);
  }

  calcularMontoFinaciar(): void {
    this.finacialData.amountFinanced = this.finacialData.total - this.finacialData.entryAmount;
  }

  calcularTotalCredito(): void {
    this.finacialData.totalCredit = this.finacialData.amountFinanced + this.finacialData.legalCosts + this.finacialData.deviceCosts;
  }

  saveFinacialData() {
    this.api.tokenReturn().then((token) => {
      this.api.saveFinancialData( this.finacialData, token )
      .subscribe( resp => {
        this.finacialData = resp.fDataDB;
      });
    });
  }

}
