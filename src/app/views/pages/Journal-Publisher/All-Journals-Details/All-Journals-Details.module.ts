import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllJournalsDetailsComponent } from './All-Journals-Details.component';


const routes: Routes = [
  {
    path: '',
    component: AllJournalsDetailsComponent, 
  }
]

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
  
    ],
  
  })
export class AllJournalsDetailsModule { }

