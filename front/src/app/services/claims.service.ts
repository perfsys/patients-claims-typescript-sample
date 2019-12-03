import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CodeModel } from '../models/code.model';
import { ProcedureModel } from '../models/procedure.model';
import { ClaimModel } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private urlCodes: string = './assets/database/codes.json';
  private urlProcedures: string = './assets/database/procedures.json';
  private urlClaims: string = 'http://localhost:3000/claim/get';
  
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllCodes(): Observable<any> {
    return this.httpClient.get(this.urlCodes)
      .pipe(
        map((response: CodeModel[]) => {
          return response.map((el) => {
            return new CodeModel(el.code, el.desc)
          })
        })
      )
  }

  public getAllProcedures(): Observable<any> {
    return this.httpClient.get(this.urlProcedures)
      .pipe(
        map((response: ProcedureModel[]) => {
          return response.map((el) => {
            return new ProcedureModel(el.name, el.count)
          })
        })
      )
  }

  public getAllClaims(): Observable<any> {
    return this.httpClient.get(this.urlClaims)
      .pipe(
        map((response: ClaimModel[]) => {
          return response.map((el) => {
            return new ClaimModel(el.patient, el.icdCodes, el.procedures)
          })
      })
    )
  }

  public postData(data){
    return this.httpClient.post('http://localhost:3000/claim', data)
      .pipe(
        map((response) => {
          return response;
        })
      )
    }
}
