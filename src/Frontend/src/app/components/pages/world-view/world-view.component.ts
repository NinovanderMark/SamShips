import { Component, OnInit } from '@angular/core';
import { ShipDto } from 'src/app/models/shipDto';
import { ShipDtoListResultResponse } from 'src/app/models/shipDtoListResultResponse';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit {

  public shipList : Array<ShipDto> = [];
  constructor(private shipsService : ShipsService) { }

  async ngOnInit(): Promise<void> {
    let ships = await this.shipsService.shipsGet();
    if ( ships.result !== null) {
      this.shipList = new Array<ShipDto>();
      ships.result?.forEach(s => {
        console.debug(s);
        this.shipList.push(s);
      });
      console.debug(this.shipList);
    } else {
      throw new Error("No ship list received");
    }
  }
}
