import { Component, OnInit } from '@angular/core';
import { Ship } from 'src/app/models/ship';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.css']
})
export class ShipListComponent implements OnInit {

  public shipList: Ship[] = [];
  public shipIds: string[] = [];

  constructor(private localStorage : LocalStorageService, private shipsService : ShipsService) { }

  ngOnInit(): void {
    this.shipIds = this.localStorage.getShipIds();
    this.shipsService.shipDetailSubject.subscribe((data: Ship) => {
      let existing = this.shipList.find(s => s.id);
      if ( existing ) {
        existing.cargo = data.cargo;
        existing.hull = data.hull;
        existing.name = data.name;
        existing.orders = data.orders;
        existing.location = data.location;
        existing.name = data.name;
      } else {
        this.shipList.push(data);
      }
    });

    this.shipIds.forEach(id => {
      this.shipsService.getById(id);
    });
  }

}
