/**
 * SamShips.WebAPI
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Region } from './region';
import { ShipClass } from './shipClass';

export type ShipDto = { 
    name?: string;
    class?: ShipClass;
    location?: Region;
}