import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Orderss } from 'src/app/models/orders';
import { Regions } from 'src/app/models/region';
import { Ship } from 'src/app/models/ship';
import { ShipClasses } from 'src/app/models/shipClass';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {
  public ship: Ship | undefined;

  public regions = Regions;
  public shipClasses = ShipClasses;
  public orders = Orderss;
  
  public updateForm = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    locationControl: new FormControl('', Validators.required),
    orderControl: new FormControl('', Validators.required),
    typeControl: new FormControl({value: '', disabled: true}, Validators.required),
  });
  
  private sub: any;
  
  constructor(private route: ActivatedRoute, private shipsService: ShipsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(async params => {
       let id = params['id'];
       if ( !id )
        throw new Error("Id for route not set");

       let shipResult = await this.shipsService.getById(id);
       if ( !shipResult.success || !shipResult.result)
          throw new Error(`Unable to retrieve Ship with id ${id}`)

       this.ship = shipResult.result;
       this.updateForm.get('nameControl')?.setValue(this.ship.name);
       this.updateForm.get('locationControl')?.setValue(this.ship.location);
       this.updateForm.get('orderControl')?.setValue(this.ship.orders);
       this.updateForm.get('typeControl')?.setValue(this.ship.class);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateShip() {
    let shipUpdated = new Ship();
    shipUpdated.id = this.ship?.id;
    shipUpdated.name = this.updateForm.get('nameControl')?.value;
    shipUpdated.location = this.updateForm.get('locationControl')?.value;
    shipUpdated.orders = this.updateForm.get('orderControl')?.value;
    this.shipsService.shipPatch(shipUpdated);
  }

  getHull() : number {
    return this.ship?.hull?.value ?? 0;
  }

  getMaximumHull() : number {
    return this.ship?.hull?.maximumValue ?? 0;
  }
}
