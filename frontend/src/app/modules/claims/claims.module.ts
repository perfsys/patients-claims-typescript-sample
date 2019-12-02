import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsComponent } from '../../components/claims/claims.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClaimsComponent],
  imports: [
    CommonModule,
    ClaimsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClaimsModule { }
