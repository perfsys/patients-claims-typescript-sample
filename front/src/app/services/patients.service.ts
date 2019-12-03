import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private HOST: string = `${document.location.protocol}//${document.location.hostname}:3000`
  // private HOST: string = `http://localhost:3000`

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.HOST}/patient/get`)
      .pipe(
        map((response: PatientModel[]) => {
          return response.map((el) => {
            return new PatientModel(el.firstName, el.lastName, el.birthday, el.sex, el.address, el.email)
          })
        })
      )
  }

  public postData(data){
    return this.httpClient.post(`${this.HOST}/patient`, data)
      .pipe(
        map((response) => {
          return response;
        })
      )
    }

}
