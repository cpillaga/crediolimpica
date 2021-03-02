import { Component, OnInit } from '@angular/core';
import { customerModel } from '../../../models/customer.model';
import { vehicleModel } from '../../../models/vehicle.model';
import { financialDataModel } from '../../../models/financialData.model';
import { ApiService } from '../../../services/api.service';
import { contratoModel } from '../../../models/contrato.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { amortizacionListModel } from '../../../models/amortizacion.model';
declare function init_plugins();

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  customer: customerModel;
  vehicle: vehicleModel;
  finacialData: financialDataModel;
  contrato: contratoModel = new contratoModel();
  amortizacion: amortizacionListModel;

  statusCode = true;
  btnPDFSattus = true;
  btnContractStatis = false;

  constructor(  private api: ApiService, private router: Router ) {}

  ngOnInit(): void {
    init_plugins();

    this.api.tokenReturn().then((token) => {
      this.api.getCompany(token)
      .subscribe( resp => {
        this.contrato.company = resp[0]._id;
      });
    });

    this.api.employeeIDReturn().then((employee_id) => {
      this.contrato.employee = String(employee_id);
    });

    this.getCode();

  }

  getCode() {
    console.log("Entro a generar codigo");
    this.api.tokenReturn().then((token) => {
      this.api.getContractCode(token)
      .subscribe( resp => {
          this.contrato.code =resp.data;
          if (isNaN(Number(this.contrato.code))) {
            this.contrato.code = '';
            this.statusCode = false;
          } else {
            this.statusCode = true;
          }
      });
    });
  }

  reciveCustomer( $customer ) {
    this.customer = $customer;
    this.contrato.customer = this.customer._id;
  }

  reciveVehicle( $vehicle ) {
    this.vehicle = $vehicle;
    this.contrato.vehicle = this.vehicle._id;
  }

  reciveFinancialData( $financialData ) {
    this.finacialData = $financialData;
    this.contrato.financialData = this.finacialData._id;
  }

  generateContracts() {
    // Generar Contratos
      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.autorizacionBloqueo( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Autorizacion Bloqueo Generado');
          });
        });
      }, 550);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.compraVenta( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Compra Venta Generado');
          });
        });
      }, 600);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.convenioSesionDerechos(this.contrato._id, token)
          .subscribe( resp => {
            // console.log('Convenio Derechos Generado');
          });
        });
      }, 650);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.aceptacionCostas( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Aceptacion Costas Generado');
          });
        });
      }, 700);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.pagareALaOrden( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Pagare a la orden generado');
          });
        });
      }, 750);

      setTimeout(() => {
        console.log("Numero Contrado: "+this.contrato._id);
        this.api.tokenReturn().then((token) => {
          this.api.informacionycompromisosadicionales( this.contrato._id, token )
          .subscribe( resp => {
            console.log('Informacion y compromisos adiciones Generado');
          });
        });
      }, 800);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.declaracionorigenlicitoderecursos( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Declaracion de Origen Licitos Generado');
          });
        });
      }, 850);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.informedecredito( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Informde de credito Generado');
          });
        });
      }, 900);

      setTimeout(() => {
        this.api.tokenReturn().then((token) => {
          this.api.tablaamortizacion( this.contrato._id, token )
          .subscribe( resp => {
            // console.log('Tabla Amortizacion Generado');
          });
        });
      }, 950);

  }

  saveContractinDB(): void {
    this.saveContract();
  }

  saveContract() {
    if( this.contrato.customer === undefined || this.contrato.financialData === undefined || this.contrato.vehicle === undefined) {
      this.contractError();
    } else {
      this.api.tokenReturn().then((token) => {
        this.api.saveContract( this.contrato, token )
        .subscribe( resp => {
          this.contrato = resp.contractDB;
          this.generateContracts();
          this.contractSuccess();
          this.btnContractStatis = true;
          this.btnPDFSattus = false;
          this.router.navigate(['/contract-list']);
          this.crearTAmorti(this.contrato.financialData, this.contrato._id);
        });
      });
    }
  }

  crearTAmorti(fData, idCont){
        
    this.api.tokenReturn().then((token) => {
      this.api.saveAmortizacion(token, fData, idCont)
        .subscribe( resp => {
          console.log(resp);
      });
    });
  }

  contractError() {
    Swal.fire({
      icon: 'error',
      title: 'Verifique que los datos esten completos',
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
  }

  contractSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Contrato Generado',
      showConfirmButton: false,
      timer: 700
    });
  }

  pdfSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Contrato Generado',
      showConfirmButton: false,
      timer: 700
    });
  }
}
