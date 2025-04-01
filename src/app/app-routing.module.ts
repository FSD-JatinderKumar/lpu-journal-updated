import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './views/pages/contactus/contactus.component';
import { JournalAboutComponent } from './views/pages/journal-about/journal-about.component';
import { submitManuScriptComponentModule } from './views/pages/submitManuScript/submitManuScript.module';
import { ManuScriptReportComponent } from './views/pages/ManuScriptReport/ManuScriptReport.component';

const routes: Routes = [
  {
    path: '',
    children: [

      //  // Journal WebAdmin Panel
       {
        path:'UpdateJournalsDetails',
        loadChildren:()=> import('./views/pages/Journal-Publisher/update-journal-details/update-journal-details.module').then(m=> m.UpdateJournalDetailsModule)
      },
      {
        path:"signup",
        loadChildren: () => import('./views/pages/new-registration-page/new-registration-page.module').then(m => m.NewRegistrationPageModule)
      },
      {
        path:":Id/:name/signup",
        loadChildren: () => import('./views/pages/new-registration-page/new-registration-page.module').then(m => m.NewRegistrationPageModule)
      },
      {
        path: ':Id/:name/ExternalLogin',
        loadChildren: () => import('./views/pages/externalUser-login/externalUser-login.module').then(m => m.externalUserloginModule)
      },
      {
        path: 'ExternalLogin',
        loadChildren: () => import('./views/pages/externalUser-login/externalUser-login.module').then(m => m.externalUserloginModule)
      },
      {
        path: 'Login',
        loadChildren: () => import('./views/pages/internalUser-login/internalUser-login.module').then(m => m.InternalUserLoginModule)
      },
      {
        path: ':Id/:name/Login',
        loadChildren: () => import('./views/pages/internalUser-login/internalUser-login.module').then(m => m.InternalUserLoginModule)
      },
      {
        path: '',
        loadChildren: () => import('./views/pages/journalhome/jouralhome.module').then(m => m.JournalhomeComponentModule)
      },
      {
        path: 'Home', redirectTo: ''
      },
      {
        path: 'Research',
        loadChildren: () => import('./views/pages/journalresearch/journalresearch.module').then(m => m.JournalresearchComponentModule)
      },
      {
        path: 'Conferences',
        loadChildren: () => import('./views/pages/journalconferences/journalconferences.module').then(m => m.JournalconferencesComponentModule)
      },
      {
        path: 'Contactus',
        component:ContactusComponent,
        // loadChildren: () => import('./views/pages/contactus/contactus.module').then(m => m.ContactusComponentModule)
      },
      {
        path: ':Id/:name/About',
        // component:JournalAboutComponent,
        loadChildren: () => import('./views/pages/journal-about/journal-about.component.mdoule').then(m => m.JournalAboutComponentModule)
      },
      {
        path: ":Id/:name/EditorialBoard",
        loadChildren: () => import('./views/pages/journal-editor-board/journal-editor-board.component.module').then(m => m.JournalEditorBoardComponentModule)
      },
      {
        path: ":Id/:name/AuthorGuidelines/ManuScriptPrepare",
        loadChildren: () => import('./views/pages/AuthorGuidelines/manuscript-preparation/manuscript-preparation.component.module').then(m => m.ManuScriptPreparationComponentModule)
      },
      {
        path: ":Id/:name/AuthorGuidelines/ManuScriptWorkFlow",
        loadChildren: () => import('./views/pages/AuthorGuidelines/manuscript-workflow/manuscript-workflow.component.module').then(m => m.ManuScriptWorkflowComponentModule)
      },
      // Policies Routes
      {
        path: ":Id/:name/Policies/EditorialPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/editorial-policy/editorial-policy.component.module').then(m => m.EditorialPolicyComponentModule)
      },

      {
        path: ":Id/:name/Policies/PeerReviewPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/peer-review-policy/peer-review-policy.component.module').then(m => m.PeerReviewPolicyComponentModule)
      },

      {
        path: ":Id/:name/Policies/OpenAccessPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/open-access-policy/open-access-policy.component.module').then(m => m.OpenAccessPolicyComponentModule)
      },
      {
        path: ":Id/:name/Policies/PlagiarismPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/plagriasm-policy/plagrism-policy.component.module').then(m => m.PlagriasmPolicyComponentModule)
      },
      {
        path: ":Id/:name/Policies/PublicationChargePolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/publication-charge-policy/publication-charge-policy.component.module').then(m => m.PublicationChargePolicyComponentModule)
      },

      {
        path: ":Id/:name/Policies/ComplaintPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/complaint-policy/complaint-policy.component.module').then(m => m.ComplaintPolicyComponentModule)
      },
      {
        path: ":Id/:name/Policies/CopyrightPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/copyrightand-licensingpolicy/copyrightand-licensingpolicy.component.module').then(m => m.CopyrightandLicensingpolicyComponentModule)
      },
      {
        path: ":Id/:name/Policies/ConflictInterestPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/interest-confilict-policy/interest-conflict-policy.component.module').then(m => m.InterestConfilictPolicyComponentModule)
      },

      {
        path: ":Id/:name/Policies/CorrectionsRetractionPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/corection-retraction-policy/corection-retraction-policy.component.module').then(m => m.CorectionRetractionPolicyComponentModule)
      },
      {
        path: ":Id/:name/Policies/CrossMarkPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/cross-mark-policy/cross-mark-policy.component.module').then(m => m.CrossMarkPolicyComponentModule)
      },

      {
        path: ":Id/:name/Policies/DigitalandSelfPolicy",
        loadChildren: () => import('./views/pages/JournalPolicies/digital-self-archiving-policy/digital-self-archiving-policy.component.module').then(m => m.DigitalSelfArchivingPolicyComponentModule)
      },
      {
        path: ":Id/:name/SubmitManuScript",
        // component:SubmitManuScriptComponentModule
        loadChildren: () => import('./views/pages/submitManuScript/submitManuScript.module').then(m => m.submitManuScriptComponentModule)
      },
      {
        path: ":Id/:name/MyManuScript",
        component: ManuScriptReportComponent,
        // component:SubmitManuScriptComponentModule
        // loadChildren: () => import('./views/pages/SubmitManuScript/SubmitManuScript.module').then(m => m.SubmitManuScriptComponentModule)
      },


      // Publisher Dashboard
      {
        path:'AdvancedLogin',
        loadChildren: ()=> import('./views/pages/internalUser-login/internalUser-login.module').then(m=>m.InternalUserLoginModule)
      },
      {
        path: "PublisherDashboard",
        loadChildren: () => import('./views/pages/Journal-Publisher/Publisher-Dashboard/Publisher-Dashboard.module').then(m=>m.PublisherDashboardModule)
      },
      {
        path: "AllJournals",
        loadChildren: () => import('./views/pages/Journal-Publisher/All-Journals-Details/All-Journals-Details.module').then(m=>m.AllJournalsDetailsModule)
      },
      {
        path: ":Menu/:Role/AllUsersDetails",
        loadChildren: () => import('./views/pages/Journal-Publisher/All-User-Details/All-User-Details.module').then(m=>m.AllUserDetailsModule)
      },
      {
        path: ":Menu/:Role/AllUsersDetails",
        loadChildren: () => import('./views/pages/Journal-Publisher/All-User-Details/All-User-Details.module').then(m=>m.AllUserDetailsModule)
      },
      {
        path: "AllUsersDetails",
        loadChildren: () => import('./views/pages/Journal-Publisher/All-User-Details/All-User-Details.module').then(m=>m.AllUserDetailsModule)
      },


// Editors Dashboard 
      {
        path: "EditorDashboard",
        loadChildren: () => import('./views/pages/Journal-Editors/Manuscript-Details/Manuscript-Details.module').then(m=>m.ManuscriptDetailsModule)
      },
      {
        path: "ReviewersRemarks",
        loadChildren: () => import('./views/pages/Journal-Editors/ReviewersRemarks-Details/ReviewersRemarks-Details.module').then(m=>m.ReviewersRemarksDetailsModule)
      },

      {
        path: "UpdateKey",
        loadChildren: () => import('./views/pages/Journal-Editors/Change-Password/Change-Password.module').then(m=>m.ChangePasswordComponentModule)
      },



      // Recover Password
      {
         path: ":Id/:name/RecoverPasswordReset",
        // loadChildren: () => import('./views/pages/Journal-Editors/Manuscript-Details/Manuscript-Details.module').then(m=>m.ManuscriptDetailsModule)
        loadChildren: () => import('./views/pages/recover-account/recover-account.module').then(m=>m.RecoverAccountComponentModule),
      }, 

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: '',
//         loadChildren: () => import('./views/pages/journalhome/jouralhome.module').then(m => m.JournalhomeComponentModule)
//       },
//       // {
//       //   path: 'Home', redirectTo: '' 
//       // },
//       {
//         path: 'Research',
//         loadChildren: () => import('./views/pages/journalresearch/journalresearch.module').then(m => m.JournalresearchComponentModule)
//       },
//       {
//         path: 'Conferences',
//         loadChildren: () => import('./views/pages/journalconferences/journalconferences.module').then(m => m.JournalconferencesComponentModule)
//       },
//       {
//         path: 'Contactus',
//         loadChildren: () => import('./views/pages/contactus/contactus.module').then(m => m.ContactusComponentModule)
//       },
//       {
//         path: ':BookId/:name/About',
//         loadChildren: () => import('./views/pages/journal-about/journal-about.component.mdoule').then(m => m.JournalAboutComponentModule)
//       },
//       {
//         path: ":BookId/:name/EditorialBoard",
//         loadChildren: () => import('./views/pages/journal-editor-board/journal-editor-board.component.module').then(m => m.JournalEditorBoardComponentModule)
//       },
//       {
//         path: ":BookId/:name/AuthorGuidelines/MenuScriptPrepare",
//         loadChildren: () => import('./views/pages/AuthorGuidelines/MenuScript-preparation/MenuScript-preparation.component.module').then(m => m.MenuScriptPreparationComponentModule)
//       },
//       {
//         path: ":BookId/:name/AuthorGuidelines/MenuScriptWorkFlow",
//         loadChildren: () => import('./views/pages/AuthorGuidelines/MenuScript-workflow/MenuScript-workflow.component.module').then(m => m.MenuScriptWorkflowComponentModule)
//       },

       
//       // Policies Routes 
//       {
//         path: ":BookId/:name/Policies/EditorialPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/editorial-policy/editorial-policy.component.module').then(m => m.EditorialPolicyComponentModule)
//       },
      
//       {
//         path: ":BookId/:name/Policies/PeerReviewPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/peer-review-policy/peer-review-policy.component.module').then(m => m.PeerReviewPolicyComponentModule)
//       },
      
//       {
//         path: ":BookId/:name/Policies/OpenAccessPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/open-access-policy/open-access-policy.component.module').then(m => m.OpenAccessPolicyComponentModule)
//       },
//       {
//         path: ":BookId/:name/Policies/PlagiarismPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/plagriasm-policy/plagrism-policy.component.module').then(m => m.PlagriasmPolicyComponentModule)
//       },
//       {
//         path: ":BookId/:name/Policies/PublicationChargePolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/publication-charge-policy/publication-charge-policy.component.module').then(m => m.PublicationChargePolicyComponentModule)
//       },
      
//       {
//         path: ":BookId/:name/Policies/ComplaintPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/complaint-policy/complaint-policy.component.module').then(m => m.ComplaintPolicyComponentModule)
//       },
//       {
//         path: ":BookId/:name/Policies/CopyrightPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/copyrightand-licensingpolicy/copyrightand-licensingpolicy.component.module').then(m => m.CopyrightandLicensingpolicyComponentModule)
//       },      
//       {
//         path: ":BookId/:name/Policies/ConflictInterestPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/interest-confilict-policy/interest-conflict-policy.component.module').then(m => m.InterestConfilictPolicyComponentModule)
//       },    
      
//       {
//         path: ":BookId/:name/Policies/CorrectionsRetractionPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/corection-retraction-policy/corection-retraction-policy.component.module').then(m => m.CorectionRetractionPolicyComponentModule)
//       },
//       {
//         path: ":BookId/:name/Policies/CrossMarkPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/cross-mark-policy/cross-mark-policy.component.module').then(m => m.CrossMarkPolicyComponentModule)
//       },

//       {
//         path: ":BookId/:name/Policies/DigitalandSelfPolicy",
//         loadChildren: () => import('./views/pages/JournalPolicies/digital-self-archiving-policy/digital-self-archiving-policy.component.module').then(m => m.DigitalSelfArchivingPolicyComponentModule)
//       },
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
