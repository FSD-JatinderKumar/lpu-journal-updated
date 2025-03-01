import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExternalUserLoginComponent } from './externalUser-login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
const routes: Routes = [
  {
    path: '',
    component: ExternalUserLoginComponent, 
  }
]
@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),     
      MatPaginatorModule,
      FormsModule,
      MaterialModule,
      MatDialogModule ,
       
    ],
  
  })
 
export class externalUserloginModule { }