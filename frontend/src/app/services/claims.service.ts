import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CodeModel } from '../models/code.model';
import { ProcedureModel } from '../models/procedure.model';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  private urlCodes: string = './assets/database/codes.json';
  private urlProcedures: string = './assets/database/procedures.json';

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


  public postData(){
         
   const body = {firstName:'fdgdfgdfg', lastName: 'dfgdfgdfg', birthday: 'gdfgdfgdfg', sex: 'fdgdfgdfg', address: 'dfgdfgdfg', email: 'dfgdfgdfgdfg'}
      console.log('body', body)
      return this.httpClient.post('http://localhost:3000/patient', body)
        .pipe(
          map((response) => {
            console.log("test tst test", response);
            return response;
          })
        )
  }
}
