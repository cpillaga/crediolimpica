import { customerModel } from './customer.model';
import { financialDataModel } from './financialData.model';
export class amortizacionListModel {

    meses: string;
    fecha: Date;
    interes: number;
    amortizacion: number;
    pagoTotal: number;
    saldo: number;
    estado: string;
    contrato: string;
    _id?: string;
    
    constructor() {}

}