import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { Configuration } from '../models/configuration';
import { Ship } from '../models/ship';
import { ShipDto } from '../models/shipDto';
import { ShipDtoListResultResponse } from '../models/shipDtoListResultResponse';
import { ShipResultResponse } from '../models/shipResultResponse';
import { BASE_PATH } from '../models/variables';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  protected basePath = 'https://w2v9rk215a.execute-api.eu-west-1.amazonaws.com/Stage';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  public shipDetailSubject : Subject<Ship>;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }

        this.defaultHeaders.append('Accept', '*/*');
        this.defaultHeaders.append('x-Is-Carlos-Awesome', 'true');
        this.shipDetailSubject = new Subject<Ship>();
    }

    public getById(id: string): Observable<ShipResultResponse> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getById.');
        }

        let observable = this.httpClient.get<ShipResultResponse>(`${this.basePath}/ships/${encodeURIComponent(String(id))}`);

        observable.subscribe((data: ShipResultResponse) => {
            if ( data.success && data.result ) {
            this.shipDetailSubject.next(data.result);
            }
        });

        return observable;
    }


    public shipsGet(): Observable<ShipDtoListResultResponse>{
        return this.httpClient.request<ShipDtoListResultResponse>('get',`${this.basePath}/ships`);
    }

    public shipsPost(body: ShipDto): Observable<ShipResultResponse> {
        let observable = this.httpClient.post<ShipResultResponse>(`${this.basePath}/ships`, body, { headers: this.defaultHeaders });

        observable.subscribe((data: ShipResultResponse) => {
            if ( data.success && data.result ) {
                this.shipDetailSubject.next(data.result);
            }
        });

        return observable;
    }
}
