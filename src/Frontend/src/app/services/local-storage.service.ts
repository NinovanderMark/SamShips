import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private shipListKey = 'shipListIds'

  private newShipSubject : Subject<string>;

  constructor() { 
    this.newShipSubject = new Subject();
  }

  get(key: string) : string | null {
    return localStorage.getItem(key);
  }

  save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getShipIds() : string[] {
    const stored = localStorage.getItem(this.shipListKey);
    if ( stored === null)
      return [];

    const storedArray = JSON.parse(stored);
    return storedArray;
  }

  addShipId(newId: string) {
    let idList = this.getShipIds();
    idList.push(newId);
    const newList = JSON.stringify(idList);
    localStorage.setItem(this.shipListKey, newList);

    this.newShipSubject.next(newId);
  }
}
