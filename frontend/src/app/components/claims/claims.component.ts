import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ClaimsService} from "../../services/claims.service";
import {PatientsService} from '../../services/patients.service';
import { FormBuilder } from '@angular/forms';
import { ClaimModel } from 'src/app/models/claim.model';

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
  claims: Observable<ClaimModel[]>;


  constructor(
    private claimsService: ClaimsService,
    private patientsService: PatientsService,
    private formBuilder: FormBuilder
    
  ) { }

  claimForm = this.formBuilder.group({
    patient: [''],
  })

  ngOnInit() {
    this.codes = this.claimsService.getAllCodes();
    console.log('codes', this.codes)
    // this.patientsService.getAll().subscribe(val => console.log('value', JSON.stringify(val), this.patients = [...val].reverse()));

    this.patients = this.patientsService.getAll();
    console.log('patients', this.patients)

    this.procedures = this.claimsService.getAllProcedures();
    console.log('this.procedures', this.procedures)

    this.claimsService.getAllClaims().subscribe(val => console.log('value', JSON.stringify(val), this.claims = [...val].reverse()));
    console.log('this.claims', this.claims)
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

  // public onSave() {
  //   this.addMode = !this.addMode
  //   console.log('dsfdsfsdf')
  //   console.log("this.claimForm", this.claimForm)
    
  //   this.claimsService.postData()
  //     .subscribe((res) => {
  //       console.log("result", res)
  //     })
  // }
}
