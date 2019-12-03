import { Component, OnInit } from '@angular/core';
import {ClaimsService} from "../../services/claims.service";
import {PatientsService} from '../../services/patients.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {
  addMode: boolean = false;
  codeArray: Array<string> = [];
  procedureArray: Array<string> = [];
  addCodeMode: boolean = false;
  addProcedureMode: boolean = false;
  codes: any = [];
  patients: any = [];
  procedures: any = [];
  claims: any = [];

  constructor(
    private claimsService: ClaimsService,
    private patientsService: PatientsService,
    private formBuilder: FormBuilder
    
  ) { }

  claimForm = this.formBuilder.group({
    patient: [''],
    icdCodes: [this.codeArray],
    procedures: [this.procedureArray]
  })

  ngOnInit() {
    this.codes = this.claimsService.getAllCodes();
    this.patients = this.patientsService.getAll();
    this.procedures = this.claimsService.getAllProcedures();
    this.claimsService.getAllClaims().subscribe(val => this.claims = [...val].reverse());
  }

  public addCode(event) {
    this.codeArray.push(event.target.value);
    this.addCodeMode = false
  };

  public addProcedure(event) {
    this.procedureArray.push(event.target.value);
    this.addProcedureMode = false
  };

  public deleteCode(index) {
    this.codeArray.splice(index, 1);
  };

  public deleteProcedure(index) {
    this.procedureArray.splice(index, 1);
  }

  public onSave() {
    this.addMode = false;
    this.claimsService.postData(this.claimForm.value)
      .subscribe((res) => {
      });
      this.claims.unshift(this.claimForm.value);
      this.claimForm.reset()
      this.codeArray = this.procedureArray = [];
  }
}
