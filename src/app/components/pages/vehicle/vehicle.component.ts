import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { vehicleModel } from '../../../models/vehicle.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicleExist: boolean;
  vehicle: vehicleModel = new vehicleModel();

  @Output() vehicleEvent = new EventEmitter<vehicleModel>();

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
  }

  sendVehicle() {
    if ( this.vehicleExist ) {
      this.updateVehicle();
    } else {
      this.saveVehicle();
    }

    setTimeout(() => {
      this.vehicleEvent.emit(this.vehicle);
    }, 1000);
  }

  findVehicleByChasis() {
    this.api.tokenReturn().then((token) => {
      this.api.getVehicleByChasis( this.vehicle.chassisNumber, token )
      .subscribe( resp => {
        if ( resp.vehicle != null ) {
          this.vehicleExist = true;
          this.vehicle = resp.vehicle;
        } else {
          this.vehicleExist = false;
        }
      });
    });
  }

  saveVehicle() {
    this.api.tokenReturn().then((token) => {
      this.api.saveVehicle( this.vehicle, token )
      .subscribe( resp => {
        this.vehicle = resp.vehicleDB;
      });
    });
  }

  updateVehicle() {
    this.api.tokenReturn().then((token) => {
      this.api.updateVehicle( this.vehicle._id, this.vehicle, token )
      .subscribe( resp => {
        this.vehicle = resp.vehicleDB;
      });
    });
  }


}
