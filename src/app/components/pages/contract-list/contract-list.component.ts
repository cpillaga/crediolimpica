// import { Component, OnInit } from '@angular/core';
import { customerModel } from '../../../models/customer.model';
import { contratoModel } from '../../../models/contrato.model';
import { ApiService } from '../../../services/api.service';

import { Component, OnInit } from '@angular/core';
import { contratoListModel } from 'src/app/models/contrato-list.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  contracts: contratoModel[] = [];
  contractsGenerates: contratoListModel[] = [];
  contractGenerate: contratoListModel;
  estado: string;
  contractId: string;
  pdfdocument: string;
  url: string;

  constructor( private api: ApiService ) {
    this.estado = 'Contratos';
  }

  ngOnInit(): void {
    this.api.tokenReturn().then((token) => {
      this.api.getContracts(token)
      .subscribe( resp => {
        this.contracts = resp.contract;
      });
    });

    setTimeout(() => {
      this.contracts.forEach(contract => {
        // console.log(contract._id);
        this.api.tokenReturn().then((token) => {
          this.api.getContractData(contract._id, token)
          .subscribe( resp => {
            this.contractGenerate = new contratoListModel();
  
            this.contractGenerate.codigo = resp.contract.code;
            this.contractGenerate.fechaCredito = resp.contract.date;
            this.contractGenerate.cliente = resp.contract.customer;
            this.contractGenerate.credito = resp.contract.financialData;
            // console.log(resp.contract);
            // console.log(this.contractGenerate);
            this.contractsGenerates.push( this.contractGenerate );
            console.log(this.contractGenerate);
          });
        });
      });

      // console.log(this.contractsGenerates);
    }, 500);

    // setTimeout(() => {
    //   this.contractsData.forEach(contractData => {
    //     console.log(contractData);
    //   });
    // }, 1000);

  }

  setContractID(code) {
    this.contracts.forEach(contract => {
      if (contract.code === code) {
        this.contractId = contract._id;
      }
    });
    // console.log(this.contractId);
  }

  pagarealaordencon() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.pagarealaordenPDF(this.contractId, token);
    });
  }

  informacioncompromisoadicionales() {
    console.log(this.contractId);
    this.api.tokenReturn().then((token) => {
      this.url = this.api.informacioncompromisoadicionalesPDF(this.contractId, token);
    });
  }

  declaracionorigenlicito() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.declaracionorigenlicitoPDF(this.contractId, token);
    });
  }

  notificaionaceptacioncostas() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.notificaionaceptacioncostasPDF(this.contractId, token);
    });
  }

  contratosesionderechos() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.contratosesionderechosPDF(this.contractId, token);
    });
  }

  contratocompraventa() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.contratocompraventaPDF(this.contractId, token);
    });
  }

  autorizacionbloqueo() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.autorizacionbloqueoPDF(this.contractId, token);
    });
  }

  informedecredito() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.informedecreditoPDF(this.contractId, token);
    });
  }

  tablaamortizacion(){
    this.api.tokenReturn().then((token) => {
      this.url = this.api.tablaamortizacionPDF(this.contractId, token);
    });
  }

  buroCredito() {
    this.api.tokenReturn().then((token) => {
      this.url = this.api.buroCreditoPDF(token);
    });
  }

  contatos() {
    this.estado = 'Contratos';
  }

  generados() {
    this.estado = 'Generados';
  }

  por_generar() {
    this.estado = 'Por Generar';
  }

  pendientes() {
    this.estado = 'Pendientes';
  }

}
