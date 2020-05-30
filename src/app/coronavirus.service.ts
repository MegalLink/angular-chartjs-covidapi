import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import { map } from 'rxjs/operators';
import { DataCovid } from './data-covid';
@Injectable()
export class CoronavirusService {
//https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#071be6ab-ebcc-40dc-be8b-9209ab7caca5
  constructor(private http:Http) { }
  private dataCovid:DataCovid[];
  //https://api.covid19api.com/country/ecuador?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
getCountries(){
  return this.http.get("https://api.covid19api.com/countries").pipe(map(resp=>{
     return JSON.parse(resp._body)
    
   }))
}

  getData(country:string){
   return this.http.get(`https://api.covid19api.com/total/country/${country}`).pipe(map(resp=>{
     return JSON.parse(resp._body)
    
   }))
  }

}