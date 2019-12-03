import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../../services/patients.service';
import { Observable } from 'rxjs';
import { PatientModel } from '../../models/patient.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  addMode: boolean = false;
  patients: Observable<PatientModel[]>;

  constructor(
    private patientsService: PatientsService,
    private formBuilder: FormBuilder
  ) { }

  patientForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    sex: [''],
    address: [''],
    email: ['']
  })

  ngOnInit() {
    this.patientsService.getAll().subscribe(val => console.log('value', JSON.stringify(val), this.patients = [...val].reverse()));
    console.log('patients +++', this.patients)
  }

  public onSave() {
    this.addMode = false;
    console.log('dsfdsfsdf')
    console.log("this.patientForm", this.patientForm)

    this.patientsService.postData(this.patientForm.value)
      .subscribe((res) => {
        console.log("result", res)
      });

      // console.log('this.patients', Object.assign(this.patients))
      this.patients.unshift(this.patientForm.value);
      this.patientForm.reset()
    }

}
