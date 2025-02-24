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
  selector: 'app-ManuScriptReport',
  templateUrl: './ManuScriptReport.component.html',
  styleUrls: ['./ManuScriptReport.component.scss']
})
export class ManuScriptReportComponent implements OnInit {
  fromDate: any; booksDataColumns: any; toDate: any; pipe = new DatePipe('en-CA');
  dataSource: any[] = []; dataX: any; booksData: any; dataShowing: any = false;
  userRole: any; BookId: any; JournalId: any; JournalTitle: any;
  userId: any; serverUrl: any; supervisorName: any; departmentName: any;
  candidateName: any;
  Math: any;
  //   displayedColumns: string[] = [
  //   // 'journalId',
  //   'journalTitle',
  //   'editorInChief',
  //   // 'ManuScriptType',
  //   'submissionType',
  //   // 'fileUrl'
  // ];
  // displayedColumnsHeader: string[] = [
  //   // 'journalId',
  //   'Journal Title',
  //   'Editor In Chief',
  //   // 'ManuScript Type',
  //   'Submission Type',
  //   // 'Action'
  // ];
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private AuthSession: LoginSessionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, private cookieService: CookieService,
    private journalWebApiService: LpujournalbookService
  ) {

  }

  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.serverUrl = 'https://files.lpu.in/umsweb/Journal/';
    let BookId = this.route.snapshot.params['Id'];
    let name = this.route.snapshot.params['name'];
    let loginStatus = this.checkUserLogin();
    if (BookId != undefined && BookId != null) {
      this.BookId = BookId;
      this.JournalId = BookId;
      this.JournalTitle = name;
      this.JournalTitle = name.replace(/-/g, ' ');
      this.showData(this.userId);
    }
  }

  checkUserLogin() {
    const GetCookieData = this.cookieService.get('authData');
    if (GetCookieData) {
      try {
        const retrievedCookies = JSON.parse(GetCookieData);
        this.userRole = retrievedCookies.userRole?.length > 0 ? retrievedCookies.userRole : 'Guest';
        this.userId = retrievedCookies.EmailId;
        this.supervisorName = retrievedCookies.SupervisorName;
        this.departmentName = retrievedCookies.DepartmentName;
        this.candidateName = retrievedCookies.CandidateName;
        return true;
      } catch (error) {
        console.error("Error parsing JSON from cookies:", error);
        return false;
      }
    } else {
      return false;
    }

  }


  Reset() {
    window.location.reload();

  }
  exportExcel() {
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    // XLSX.writeFile(wb, 'Data.xlsx');  

    // let element = document.getElementById('dataTableExampleNews');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, 'ManuScriptReport.xlsx');


  }



  // showData(Emailid: any) {
  //   this.journalWebApiService.UserWiseAllMenuScript(Emailid).subscribe({
  //     next: (dataX: any) => {
  //       this.dataSource = dataX.item1;
  //       this.dataLoaded = true;
  //       this.booksData = dataX.item1;
  //       console.log("ALL Scripts Data" + JSON.stringify(this.booksData))
  //       if (this.booksData.length > 0) {
  //         this.booksDataColumns = Object.keys(this.booksData[0]);
  //       }
  //       this.dataShowing = true;
  //       // this.paginatedData();
  //       setTimeout(() => {

  //         var wrapper1 = (<HTMLInputElement>document.getElementById('wrapper1'));
  //         var wrapper2 = (<HTMLInputElement>document.getElementById('wrapper2'));
  //         wrapper1.onscroll = function () {
  //           wrapper2.scrollLeft = wrapper1.scrollLeft;
  //         };
  //         wrapper2.onscroll = function () {
  //           wrapper1.scrollLeft = wrapper2.scrollLeft;
  //         };

  //       }, 500);

  //     },
  //     error: (error: any) => {
  //       this.dataShowing = false;
  //       console.error('Error fetching data', error);
  //     },
  //     complete: () => {
  //       this.dataShowing = true;
  //       console.log('Data fetching complete');
  //     }
  //   });
  // }
  onSelectFileX(a: any) {
    let aa = a;
    window.open(aa, '_blank');
  }

  displayedEditorColumns: string[] = [
    // 'journalId',
    'journalTitle',
    'manuScript',
    'editorInChief',
    'emailId',
    'userName',
    'submissionType',
    'fileUrl',
    'journalId'
  ];
  displayedEditorColumnHeaders: { [key: string]: string } = {
    journalTitle: 'Journal Title',
    manuScript: 'Manu Script',
    editorInChief: 'Author Name',
    emailId: 'User Email',
    userName: 'User Name',
    submissionType: 'Submitted Script ',
    fileUrl: 'File Download',
    journalId: 'Action'
  }; // Custom header text journalTitle	editorInChief	ManuScriptType	submissionType



  EditorData: any;
  EditorDataColumns: any;
  //  Data[{"journalId":53,"journalTitle":"Bioengineering and Biosciences Reports","manuScriptType":null,"submissionType":
  // "Manuscript,Manuscript","fileUrl":"53_1482989762_24_2025_merged-files.zip","file":null,"editorInChief":"Dr. Neeta Raj Sharma","userId":null,"subItemType":null}
  EditordisplayedColumns: string[] = [
    'journalTitle',
    // 'manuScriptType',
    'submissionType',
    'editorInChief',
    'fileUrl',
    // 'journalId',
  ];

  EditordisplayedColumnsHeader: string[] = [
    'Journal Title',
    // 'Manu Script',
    'Submission ',
    'Editor In Chief',
    'Download File',
    // 'Action'
  ];
  showData(Emailid: any) {
    this.journalWebApiService.UserWiseAllMenuScript(Emailid).subscribe({
      next: (dataX: any) => {
        this.dataSource = dataX.item1;
        this.dataLoaded = true;
        this.EditorData = dataX.item1;
        // console.log("ALL EDitors  Data" + JSON.stringify(this.EditorData))
        if (this.EditorData.length > 0) {
          this.EditorDataColumns = Object.keys(this.EditorData[0]);
          this.calculateTotalPagesEditor();
          this.updatePaginatedDataEditor();
        }
        this.dataShowing = true;

      },
      error: (error: any) => {
        this.dataShowing = false;
        console.error('Error fetching data', error);
      },
      complete: () => {
        this.dataShowing = true;
      }
    });
  }
  onSelectFileEditorX(a: any) {
    let aa = a;
    // alert(aa)
    window.open('https://files.lpu.in/umsweb/Journal/' + aa, '_blank');
  }

  currentPageEditor: number = 1;
  pageSizeEditor: number = 10;
  paginatedEditorData: any[] = [];
  totalPagesEditor: number = 1;



  calculateTotalPagesEditor() {
    this.totalPagesEditor = Math.ceil(this.EditorData.length / this.pageSizeEditor);
  }

  updatePaginatedDataEditor() {
    const startIndex = (this.currentPageEditor - 1) * this.pageSizeEditor;
    this.paginatedEditorData = this.EditorData.slice(startIndex, startIndex + this.pageSizeEditor);
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

}
