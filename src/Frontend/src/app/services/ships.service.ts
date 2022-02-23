import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Configuration } from '../models/configuration';
import { ShipDto } from '../models/shipDto';
import { ShipDtoListResultResponse } from '../models/shipDtoListResultResponse';
import { ShipResultResponse } from '../models/shipResultResponse';
import { BASE_PATH } from '../models/variables';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  protected basePath = 'https://w2v9rk215a.execute-api.eu-west-1.amazonaws.com/Stage/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
        this.basePath = basePath;
    }
    if (configuration) {
        this.configuration = configuration;
        this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
      const form = 'multipart/form-data';
      for (const consume of consumes) {
          if (form === consume) {
              return true;
          }
      }
      return false;
  }


  /**
   * 
   * 
   * @param id 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getById(id: string, observe?: 'body', reportProgress?: boolean): Observable<ShipResultResponse>;
  public getById(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShipResultResponse>>;
  public getById(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShipResultResponse>>;
  public getById(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (id === null || id === undefined) {
          throw new Error('Required parameter id was null or undefined when calling getById.');
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'text/plain',
          'application/json',
          'text/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.request<ShipResultResponse>('get',`${this.basePath}/ships/${encodeURIComponent(String(id))}`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * 
   * 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public shipsGet(observe?: 'body', reportProgress?: boolean): Observable<ShipDtoListResultResponse>;
  public shipsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShipDtoListResultResponse>>;
  public shipsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShipDtoListResultResponse>>;
  public shipsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'text/plain',
          'application/json',
          'text/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.request<ShipDtoListResultResponse>('get',`${this.basePath}/ships`,
          {
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
   * 
   * 
   * @param body 
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public shipsPost(body?: ShipDto, observe?: 'body', reportProgress?: boolean): Observable<ShipResultResponse>;
  public shipsPost(body?: ShipDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ShipResultResponse>>;
  public shipsPost(body?: ShipDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ShipResultResponse>>;
  public shipsPost(body?: ShipDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          'text/plain',
          'application/json',
          'text/json'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
          'application/json',
          'text/json',
          'application/_*+json'
      ];
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected != undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.request<ShipResultResponse>('post',`${this.basePath}/ships`,
          {
              body: body,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

}
