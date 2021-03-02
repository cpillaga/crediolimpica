import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { URL_SERVICES } from '../config/url.services';
import { map } from 'rxjs/operators';
import { customerModel } from '../models/customer.model';
import { vehicleModel } from '../models/vehicle.model';
import { financialDataModel } from '../models/financialData.model';
import { spouseModel } from '../models/spouse.model';
import { contratoModel } from '../models/contrato.model';
import { employeeModel } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  Authorization: any;
  employee_id: any;
  constructor( private http: HttpClient) { }

  // COMPANY
  getCompany( Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/company`, { headers }).pipe(map((data: any) => data.company));
  }

  // EMPLOYEE
  getEmployee( Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/employee`, { headers }).pipe(map((data: any) => data.employee));
  }

  saveEmployee(employee: employeeModel, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/employee`, employee, {headers}).pipe(map((data: any) => data));
  }

  // CUSTOMER
  saveCustomer( customer: customerModel, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/customer`, customer, {headers}).pipe(map((data: any) => data));
  }

  getCustomerByID( id_customer: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/customer/${id_customer}`, { headers }).pipe(map((data: any) => data));
  }

  getCustomerByCI( customer_ci: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/customer/buscar/${customer_ci}`, { headers }).pipe(map((data: any) => data));
  }

  updateCustomer( id_customer: any, customer: customerModel, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.put(`${ URL_SERVICES }/customer/${ id_customer }`, customer, {headers}).pipe(map((data: any) => data));
  }

  // VEHICLE
  saveVehicle( vehicle: vehicleModel, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/vehicle`, vehicle, {headers}).pipe(map((data: any) => data));

  }

  updateVehicle( id_vehicle: any, vehicle: vehicleModel, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.put(`${ URL_SERVICES }/vehicle/${ id_vehicle }`, vehicle, {headers}).pipe(map((data: any) => data));
  }

  getVehicleByChasis( vehicle_chasis: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/vehicle/chasis/${vehicle_chasis}`, { headers }).pipe(map((data: any) => data));
  }

  // FINANCIAL DATA
  saveFinancialData( financialData: financialDataModel, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/financialData`, financialData, {headers}).pipe(map((data: any) => data));

  }

  // SPOUSE
  saveSpouse( spouse: spouseModel, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/spouse`, spouse, {headers}).pipe(map((data: any) => data));
  }

  updateSpouse( id_spouse: any, spouse: spouseModel, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.put(`${ URL_SERVICES }/spouse/${ id_spouse }`, spouse, {headers}).pipe(map((data: any) => data));
  }

  // CONTRACT
  saveContract( contrato: contratoModel, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    return this.http.post(`${ URL_SERVICES }/contract`, contrato, {headers}).pipe(map((data: any) => data));
  }

  getContractCode( Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/getContractCode`, { headers }).pipe(map((data: any) => data));
  }

  getContracts( Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/contract`, { headers }).pipe(map((data: any) => data));
  }

  getContractData( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/contract_data/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // REPORTS
  // Autoricacion Bloqueo
  autorizacionBloqueo( id_contrato: any, Authorization) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/autoriazionBloqueo/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }
  // Comptra Venta
  compraVenta( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/contratodecomprayventa/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }
  // Convenio Sesion Derechos
  convenioSesionDerechos( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/contratocesionderechos/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }
  // Aceptacion Costas
  aceptacionCostas( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/aceptacioncostas/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // Pagare a la orden
  pagareALaOrden( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/pagarealaorden/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // Informacion y compromisos adicionales
  informacionycompromisosadicionales( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/informacionycompromisosadicionales/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // Declaracion de origen licito de recursos
  declaracionorigenlicitoderecursos( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/declaracionorigenlicitoderecursos/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // Informde de Credito
  informedecredito( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/informedecredito/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // Tabla de Amortizacion
  tablaamortizacion( id_contrato: any, Authorization ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    return this.http.get(`${URL_SERVICES}/tablaamortizacion/${id_contrato}`, { headers }).pipe(map((data: any) => data));
  }

  // VIEW PDF
  pagarealaordenPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/pagarealaorden/${document}?token=${Authorization}`;
  }

  informacioncompromisoadicionalesPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/informacioncompromisoadicionales/${document}?token=${Authorization}`;
  }

  declaracionorigenlicitoPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/declaracionorigenlicito/${document}?token=${Authorization}`;
  }

  notificaionaceptacioncostasPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/notificaionaceptacioncostas/${document}?token=${Authorization}`;
  }

  contratosesionderechosPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/contratosesionderechos/${document}?token=${Authorization}`;
  }

  contratocompraventaPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/contratocompraventa/${document}?token=${Authorization}`;
  }

  autorizacionbloqueoPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/autorizacionbloqueo/${document}?token=${Authorization}`;
  }

  informedecreditoPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/informedecredito/${document}?token=${Authorization}`;
  }

  tablaamortizacionPDF(document: any, Authorization ) {
    return `${URL_SERVICES}/document/tablaamortizacion/${document}?token=${Authorization}`;
  }

  buroCreditoPDF(Authorization){
    return `${URL_SERVICES}/document/autorizacion_para_revisar_buro.pdf?token=${Authorization}`;
  }

  // LOGIN
  postlogin( body: any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = URL_SERVICES + '/login';
    return this.http.post(url, body, {headers}).pipe(
      map((data: any) => data));
  }

  //  SESSIONS
  getSession(Authorization) {
    const headers = new HttpHeaders({
      Authorization
    });
    const url = URL_SERVICES + 'user';
    return this.http.get(url, { headers }).pipe(map((data: any) => data.user));
  }

  tokenReturn() {
    return new Promise((res, err) => {
      if (localStorage.getItem('token')) {
        this.Authorization = JSON.parse(localStorage.getItem('token'));
        res(this.Authorization);
      } else {
        res(400);
      }
    });
  }

  employeeIDReturn() {
    return new Promise((res, err) => {
      if (localStorage.getItem('employee_id')) {
        this.employee_id = JSON.parse(localStorage.getItem('employee_id'));
        res(this.employee_id);
      } else {
        res(400);
      }
    });
  }

  getAutorizacionBuroCredito(Authorization){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    const url = URL_SERVICES + 'getAutorizacionBuroCredito';
    return this.http.get(url, { headers }).pipe(map((data: any) => data.user));
  }


  saveAmortizacion(Authorization, finData, contract){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });
    
    const url = `${URL_SERVICES}/amortizacion/tabla/${finData}&${contract}`;

    return this.http.get(url, { headers }).pipe(map((data: any) => data.user));
  }

  getAmortizacion(Authorization, contrato){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    const url = URL_SERVICES + '/amortizacion/' + contrato;

    return this.http.get(url, { headers }).pipe(map((data: any) => data.amortizacion));
  }

  cambioEstadoAmort(Authorization, id, estActual){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    const url = URL_SERVICES + '/amortizacion/' + id;

    const body = {
      estado: estActual
    }

    return this.http.put(url, body, { headers }).pipe(map((data: any) => data.amortizacion));
  }

  
  cambioValorPago(Authorization, id, pago){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization
    });

    const url = URL_SERVICES + '/amortizacion/valorPago/' + id;

    const body = {
      pagoTotal: pago
    }

    return this.http.put(url, body, { headers }).pipe(map((data: any) => data.amortizacion));
  }
}