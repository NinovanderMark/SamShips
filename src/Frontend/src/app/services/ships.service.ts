import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject, throwError, take, lastValueFrom } from 'rxjs';
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

  protected basePath = 'https://vodbm64nja.execute-api.eu-west-1.amazonaws.com/Stage';
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

        this.shipDetailSubject = new Subject<Ship>();
    }

    public async getById(id: string): Promise<ShipResultResponse> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getById.');
        }

        let apiResult = this.httpClient.get<ShipResultResponse>(`${this.basePath}/ships/${encodeURIComponent(String(id))}`)
            .pipe(take(1));

        let shipResult = await lastValueFrom(apiResult);
        if (!shipResult.success || !shipResult.result)
            throw new Error(`Unable to retrieve ship ${id}`);

        this.shipDetailSubject.next(shipResult.result);
        return shipResult;
    }


    public async shipsGet(): Promise<ShipDtoListResultResponse>{
        let apiResult = this.httpClient.request<ShipDtoListResultResponse>('get',`${this.basePath}/ships`)
            .pipe(take(1));

        let shipResult = await lastValueFrom(apiResult);
        if (!shipResult.success || !shipResult.result)
            throw new Error("Unable to retrieve ships");

        return shipResult;
    }

    public async shipsPost(body: ShipDto) : Promise<ShipResultResponse>{
        let apiResult = this.httpClient.post<ShipResultResponse>(`${this.basePath}/ships`, body, { headers: this.defaultHeaders })
            .pipe(take(1));
        
        let shipResult = await lastValueFrom(apiResult);
        if ( !shipResult.success || !shipResult.result)
            throw new Error(`Unable to save new ship ${body.name}`);

        this.shipDetailSubject.next(shipResult.result);
        return shipResult;
    }

    public async shipPatch(body: Ship) : Promise<ShipResultResponse> {
        let apiResult = this.httpClient.patch<ShipResultResponse>(`${this.basePath}/ships/${body.id}`, body, { headers: this.defaultHeaders })
            .pipe(take(1));
        
        let shipResult = await lastValueFrom(apiResult);
        if ( !shipResult.success || !shipResult.result)
            throw new Error(`Unable to update ship ${body.id}`);

        this.shipDetailSubject.next(shipResult.result);
        return shipResult;
    }
}
