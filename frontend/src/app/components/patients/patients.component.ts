import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../../services/patients.service';
import { Observable } from 'rxjs';
import { PatientModel } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  addMode: boolean = false;

  patients: any = [];
  constructor(
    private patientsService: PatientsService
  ) { }

  ngOnInit() {
    this.patients = this.patientsService.getAll();
    console.log('patients', this.patients)
  }

}
