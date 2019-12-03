import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ClaimService} from "../../services/claims.service";
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


  constructor(
    private claimServise: ClaimService,
    private patientsService: PatientsService,
    private formBuilder: FormBuilder
    
  ) { }

  claimForm = this.formBuilder.group({
    patient: [''],
    claims: this.codeArray,
    procedures: this.procedureArray
  })

  ngOnInit() {
    this.codes = this.claimServise.getAllCodes();
    console.log('codes', this.codes)

    this.patients = this.patientsService.getAll();
    console.log('patients', this.patients)

    this.codes = this.claimServise.getAllProcedures();
    console.log('this.procedures', this.procedures)
  }


  public addCode(event) {
    console.log('test works', event.target.value);
    this.codeArray.push(event.target.value);
    this.addCodeMode = false
  };

  public addProcedure(event) {
    console.log('test works', event.target.value);
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
    this.addMode = !this.addMode
    console.log('dsfdsfsdf')
    console.log("this.claimForm", this.claimForm)
    
    this.claimServise.postData()
      .subscribe((res) => {
        console.log("result", res)
      })
  }
}
