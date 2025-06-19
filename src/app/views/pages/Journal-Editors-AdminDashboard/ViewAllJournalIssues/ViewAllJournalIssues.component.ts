declare var bootstrap: any;
import { DatePipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import { Validators } from '@angular/forms';
import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
import Swal from 'sweetalert2';
import { LoginSessionService } from 'src/app/_services/login-session.service';
import { CookieService } from 'ngx-cookie-service';
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-ViewAllJournalIssues',
  templateUrl: './ViewAllJournalIssues.component.html',
  styleUrls: ['./ViewAllJournalIssues.component.css']
})
export class ViewAllJournalIssuesComponent implements OnInit {
  dataSource: any[] = []; dataX: any; booksData: any; dataShowing: any = false;
  userRole: any; BookId: any; JournalId: any; JournalTitle: any = ''; name: any;
  userId: any; serverUrl: any; supervisorName: any; departmentName: any;
  candidateName: any;
  Journals: any;
  LoginStatus: boolean | undefined;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private AuthSession: LoginSessionService,
    private StoragesServices: StorageService,
    private route: ActivatedRoute, private cookieService: CookieService,
    private journalWebApiService: LpujournalbookService
  ) {

  }

  dataLoaded: boolean = false;


  Logout() {
    this.cookieService.delete('authData');
    this.cookieService.delete('BookData');

    this.cookieService.deleteAll();

    sessionStorage.clear();
    localStorage.clear();

    this.AuthSession.clearSession();
    this.StoragesServices.clean();

    this.userRole = null;
    this.supervisorName = null;
    this.departmentName = null;
    this.candidateName = null;
    this.LoginStatus = false;

    this.router.navigateByUrl('Home').then(() => {
      setTimeout(() => {
        location.reload();
      }, 500);
    });
  }

  ngOnInit(): void {
    this.serverUrl = 'https://files.lpu.in/umsweb/Journal/';
    let loginStatus = this.checkUserLogin();

    if (loginStatus == true) {
      this.loadJournals();
    } else {
      this.Logout();
    }
  }
  checkUserLogin(): Boolean | any {
    const GetCookieData = this.cookieService.get('authData');
    if (GetCookieData) {
      try {
        const retrievedCookies = JSON.parse(GetCookieData);
        this.userRole = retrievedCookies.UserRole?.length > 0 ? retrievedCookies.UserRole : -1;
        this.userId = retrievedCookies.EmailId;
        // let Token = retrievedCookies.AccessToken;
        this.supervisorName = retrievedCookies.SupervisorName;
        this.departmentName = retrievedCookies.DepartmentName;
        this.candidateName = retrievedCookies.CandidateName;
        return true;
      } catch (error) {
        console.log("error");
      }
    } else {
      return false;
    }
  }
  currentJournalId: any;
  currentJournalTitle: any;
  setJournalId() {
    // Find the journal object based on the selected ID
    let idx = this.journalListsData.find(
      journal => journal.id == this.JournalTitle
    );
    this.currentJournalId = idx.id;
    this.currentJournalTitle = idx.journalTitle;
    alert(JSON.stringify(idx))
    this.GetAllIssues(this.currentJournalId);
  }

  journalListsData: any[] = [];
  loadJournals() {
    this.journalWebApiService.GetAllBooksDetails().subscribe({
      next: (dataX: any) => {
        this.dataSource = dataX.item1;
        this.journalListsData = dataX.item1;
        // console.info(JSON.stringify(this.journalListsData))
      },
      error: (error: any) => {
        this.dataShowing = false;
        console.error('Error fetching data', error);
        // this.LoginFalied();
      },
      complete: () => {
        this.dataShowing = true;
      }
    });
  }
  JournalIssuesData: any;
  //journalId":60,"journalTitle":"Journal of Research and Ethics","volume":null,"publishDate":null,"issueTitle":"Test cases data ",
  
  // "issueFileName":"IssueFile751714135_Doc-1.pdf","issueFileData":null,"issueDescription":"test case"}]
  displayedColumns: string[] = [
    // 'journalId',
    'journalTitle',
    'volume',
    'publishDate',
    'issueTitle',
    'issueFileName',
    'issueDescription'
  ];
  displayedColumnsHeader: { [key: string]: string } = {
    journalTitle: 'Journal Title',
    manuScript: 'volume',
    publishDate: 'publish Date',
    issueTitle: 'issue Title',
    issueFileName: 'File',
    issueDescription:   'issueDescription'
    
  } 
     
   
  GetAllIssues(JournalId: any) {
    this.journalWebApiService.GetJournalIssues(JournalId).subscribe({
      next: (dataX: any) => {
        this.dataSource = dataX.item1;
        this.JournalIssuesData = dataX.item1;
        console.info(JSON.stringify(this.JournalIssuesData))
      },
      error: (error: any) => {
        this.dataShowing = false;
        console.error('Error fetching data', error);
        // this.LoginFalied();
      },
      complete: () => {
        this.dataShowing = true;
      }
    });
  }

  isLoading: boolean = false; // Simplified from array to single boolean
  currentPageEditor: number = 1;
  pageSizeEditor: number = 10;
  paginatedJournalIssuesData: any[] = [];
  totalPagesEditor: number = 1;
  onSelectFileEditorX(fileUrl: string) {
    window.open('https://files.lpu.in/umsweb/Journal/' + fileUrl, '_blank');
  }

  calculateTotalPagesEditor() {
    // Fixed: Use pageSizeEditor instead of totalPagesEditor
    this.totalPagesEditor = Math.ceil(this.JournalIssuesData.length / this.pageSizeEditor) || 1;
  }

  updatePaginatedDataEditor() {
    const startIndex = (this.currentPageEditor - 1) * this.pageSizeEditor;
    const endIndex = Math.min(startIndex + this.pageSizeEditor, this.JournalIssuesData.length);
    this.paginatedJournalIssuesData = this.JournalIssuesData.slice(startIndex, endIndex);
  }

  nextPageEditor() {
    if (this.currentPageEditor < this.totalPagesEditor) {
      this.currentPageEditor++;
      this.updatePaginatedDataEditor();
    }
  }

  previousPageEditor() {
    if (this.currentPageEditor > 1) {
      this.currentPageEditor--;
      this.updatePaginatedDataEditor();
    }
  }

  
  displayedEditorColumnHeaders: { [key: string]: string } = {
    journalTitle: 'Journal Title',
    manuScript: 'Manuscript',
    editorInChief: 'Author Name',
    emailId: 'Submitted User Email',
    userName: 'Submitted By',
    submissionType: 'Submission Type',
    fileUrl: 'File Download',
    journalId: 'Assign Reviewer'
  };

}