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

  private HOST: string = `${document.location.protocol}//${document.location.hostname}:3000`

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
    return this.httpClient.get(`${this.HOST}/claim/get`)
      .pipe(
        map((response: ClaimModel[]) => {
          return response.map((el) => {
            return new ClaimModel(el.patient, el.icdCodes, el.procedures)
          })
      })
    )
  }

  public postData(data){
    return this.httpClient.post(`${this.HOST}/claim`, data)
      .pipe(
        map((response) => {
          return response;
        })
      )
    }
}
