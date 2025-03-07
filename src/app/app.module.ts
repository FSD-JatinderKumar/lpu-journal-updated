import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopsliderComponent } from './views/pages/topslider/topslider.component';
import { JournalmenubarComponent } from './views/pages/journalmenubar/journalmenubar.component';
import { JournalhomeComponent } from './views/pages/journalhome/journalhome.component';
import { JournalfooterComponent } from './views/pages/journalfooter/journalfooter.component';
import { JournalcarouselComponent } from './views/pages/journalcarousel/journalcarousel.component';
import { JournalauthorComponent } from './views/pages/journalauthor/journalauthor.component';
import { JournalPopularByGenreComponent } from './views/pages/journal-popular-by-genre/journal-popular-by-genre.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JournalAboutComponent } from './views/pages/journal-about/journal-about.component';
import { JournalInnerMenuComponent } from './views/pages/journal-inner-menu/journal-inner-menu.component';
import { JournalDetailsTabComponent } from './views/pages/journal-details-tab/journal-details-tab.component';
import { JournalEditorBoardComponent } from './views/pages/journal-editor-board/journal-editor-board.component';
import { ManuScriptPreparationComponent } from './views/pages/AuthorGuidelines/manuscript-preparation/manuscript-preparation.component';
import { ManuScriptWorkflowComponent } from './views/pages/AuthorGuidelines/manuscript-workflow/manuscript-workflow.component';
import { ComplaintPolicyComponent } from './views/pages/JournalPolicies/complaint-policy/complaint-policy.component';
import { CopyrightandLicensingpolicyComponent } from './views/pages/JournalPolicies/copyrightand-licensingpolicy/copyrightand-licensingpolicy.component';
import { CorectionRetractionPolicyComponent } from './views/pages/JournalPolicies/corection-retraction-policy/corection-retraction-policy.component';
import { CrossMarkPolicyComponent } from './views/pages/JournalPolicies/cross-mark-policy/cross-mark-policy.component';
import { DigitalSelfArchivingPolicyComponent } from './views/pages/JournalPolicies/digital-self-archiving-policy/digital-self-archiving-policy.component';
import { EditorialPolicyComponent } from './views/pages/JournalPolicies/editorial-policy/editorial-policy.component';
import { InterestConfilictPolicyComponent } from './views/pages/JournalPolicies/interest-confilict-policy/interest-confilict-policy.component';
import { OpenAccessPolicyComponent } from './views/pages/JournalPolicies/open-access-policy/open-access-policy.component';
import { PeerReviewPolicyComponent } from './views/pages/JournalPolicies/peer-review-policy/peer-review-policy.component';
import { PlagriasmPolicyComponent } from './views/pages/JournalPolicies/plagriasm-policy/plagriasm-policy.component';
import { PublicationChargePolicyComponent } from './views/pages/JournalPolicies/publication-charge-policy/publication-charge-policy.component';
import { JournalresearchComponent } from './views/pages/journalresearch/journalresearch.component';
import { JournalconferencesComponent } from './views/pages/journalconferences/journalconferences.component';
import { ContactusComponent } from './views/pages/contactus/contactus.component';
import { InternalUserLoginComponent } from './views/pages/internalUser-login/internalUser-login.component';
import { ExternalUserLoginComponent } from './views/pages/externalUser-login/externalUser-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitManuScriptComponent } from './views/pages/submitManuScript/submitManuScript.component';
import { ManuScriptReportComponent } from './views/pages/ManuScriptReport/ManuScriptReport.component';
import { NewRegistrationPageComponent } from './views/pages/new-registration-page/new-registration-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';
import { NewManuScriptComponent } from './views/pages/NewManuScript/NewManuScript.component';
import { PublisherDashboardComponent } from './views/pages/Journal-Publisher/Publisher-Dashboard/Publisher-Dashboard.component';
import { PublisherDashboardModule } from './views/pages/Journal-Publisher/Publisher-Dashboard/Publisher-Dashboard.module';
import { TopMenuBarModule } from './views/pages/Journal-Publisher/TopMenuBar/TopMenuBar.moudle';
import { TopMenuBarComponent } from './views/pages/Journal-Publisher/TopMenuBar/TopMenuBar.component';
import { AllJournalsDetailsModule } from './views/pages/Journal-Publisher/All-Journals-Details/All-Journals-Details.module';
import { AllJournalsDetailsComponent } from './views/pages/Journal-Publisher/All-Journals-Details/All-Journals-Details.component';
import { AllUserDetailsModule } from './views/pages/Journal-Publisher/All-User-Details/All-User-Details.module';
import { AllUserDetailsComponent } from './views/pages/Journal-Publisher/All-User-Details/All-User-Details.component';
import { NewJournalComponentModule } from './views/pages/Journal-Publisher/NewJournal/NewJournal.module';
import { UpdateJournalDetailsModule } from './views/pages/Journal-Publisher/update-journal-details/update-journal-details.module';
import { UpdateJournalDetailsComponent } from './views/pages/Journal-Publisher/update-journal-details/update-journal-details.component';
import { EditorHeaderModule } from './views/pages/Journal-Editors/Editor-Top-Bar/EditorHeader.moudle';
import { ManuscriptDetailsModule } from './views/pages/Journal-Editors/Manuscript-Details/Manuscript-Details.module';
import { EditorHeaderComponent } from './views/pages/Journal-Editors/Editor-Top-Bar/EditorHeader.component';
import { ManuscriptDetailsComponent } from './views/pages/Journal-Editors/Manuscript-Details/Manuscript-Details.component';
import { RecoverAccountComponent } from './views/pages/recover-account/recover-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NewRegistrationPageComponent,
    InternalUserLoginComponent,
    ExternalUserLoginComponent,
    ManuScriptReportComponent,
    TopsliderComponent,
    JournalmenubarComponent,
    JournalhomeComponent,
    JournalfooterComponent,
    JournalcarouselComponent,
    JournalauthorComponent,
    JournalPopularByGenreComponent,
    JournalAboutComponent,
    JournalInnerMenuComponent,
    JournalDetailsTabComponent,
    JournalEditorBoardComponent,
    ManuScriptPreparationComponent,
    ManuScriptWorkflowComponent,
    ComplaintPolicyComponent,
    CopyrightandLicensingpolicyComponent,
    CorectionRetractionPolicyComponent,
    CrossMarkPolicyComponent,
    DigitalSelfArchivingPolicyComponent,
    EditorialPolicyComponent,
    InterestConfilictPolicyComponent,
    OpenAccessPolicyComponent,
    PeerReviewPolicyComponent,
    PlagriasmPolicyComponent,
    PublicationChargePolicyComponent,
    JournalresearchComponent,
    JournalconferencesComponent,
    ContactusComponent,
    SubmitManuScriptComponent,
    JournalfooterComponent,
    NewManuScriptComponent, 

    PublisherDashboardComponent, 
    TopMenuBarComponent,
    AllJournalsDetailsComponent,
    AllUserDetailsComponent,
    UpdateJournalDetailsComponent, 

    EditorHeaderComponent, 
    ManuscriptDetailsComponent,
    RecoverAccountComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule, 
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MaterialModule,
    
    PublisherDashboardModule, 
    TopMenuBarModule,
    AllJournalsDetailsModule, 
    AllUserDetailsModule,
    NewJournalComponentModule,
    UpdateJournalDetailsModule, 

    EditorHeaderModule,
    ManuscriptDetailsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
