import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../../services/patients.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  addMode: boolean = false;
  patients: any = [];

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
    this.patientsService.getAll().subscribe(val => this.patients = [...val].reverse());
  }

  public onSave() {
    this.addMode = false;

    this.patientsService.postData(this.patientForm.value)
      .subscribe((res) => {
        console.log(`Patient saved ${res}`);
      });
      this.patients.unshift(this.patientForm.value);
      this.patientForm.reset()
    }
}
