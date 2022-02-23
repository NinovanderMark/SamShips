import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Region, Regions } from 'src/app/models/region';
import { ShipClasses } from 'src/app/models/shipClass';
import { ShipsService } from 'src/app/services/ships.service';
import { ShipDto } from 'src/app/models/shipDto';
import { ShipResultResponse } from 'src/app/models/shipResultResponse';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-ship-create',
  templateUrl: './ship-create.component.html',
  styleUrls: ['./ship-create.component.css']
})
export class ShipCreateComponent implements OnInit {

  public createForm = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    typeControl: new FormControl('', Validators.required),
    locationControl: new FormControl('', Validators.required)
  });

  public regions = Regions;
  public shipClasses = ShipClasses;

  constructor(private shipsService : ShipsService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  createShip() {
    let dto = new ShipDto();
    dto.name = this.createForm.get('nameControl')?.value;
    dto.location = this.createForm.get('locationControl')?.value;
    dto.class = this.createForm.get('typeControl')?.value;

    this.shipsService.shipsPost(dto).subscribe((data: ShipResultResponse) => {
      if ( data.result ) {
        if ( data.result?.id ) {
          this.localStorage.addShipId(data.result?.id)
        }
      } else {
        throw new Error("Error occurred creating new Ship");
      }
    })
  }

}
