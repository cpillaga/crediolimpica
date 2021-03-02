import { customerModel } from './customer.model';
import { financialDataModel } from './financialData.model';
export class contratoListModel {

    id: string;
    codigo: string;
    cliente: customerModel;
    fechaCredito: Date;
    credito: financialDataModel;

    constructor() {}

}