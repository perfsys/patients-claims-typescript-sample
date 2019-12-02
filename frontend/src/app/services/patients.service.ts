import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/patient.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private url: string = 'http://localhost:3000/patient/get';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<any> {
    return this.httpClient.get(this.url)
    .pipe(
      map((response: PatientModel[]) => {
        return response.map((el) => {
          return new PatientModel(el.firstName, el.lastName, el.birthday, el.sex, el.address, el.email)
        })
      })
    )
  }
}
