import { spouseModel } from './spouse.model';
export class customerModel  {

    _id: string;
    name: string;
    lastName: string;
    ci: string;
    addres: string;
    nationality: string;
    maritalStatus: string;
    sex: string;
    province: string;
    canton: string;
    birthDate: Date;
    birthplace: string;
    ocupation: string;
    separationProperty: string;
    phone: string;
    email: string;
    spouse: string;
    spouseModel: spouseModel;

    constructor() {
        this.spouseModel = new spouseModel();
    }
}