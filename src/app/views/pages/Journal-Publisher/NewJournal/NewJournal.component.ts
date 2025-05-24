import { NgModule } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;
import Swal from 'sweetalert2';
import { MatPaginator, _MatPaginatorBase } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import * as XLSX from 'xlsx';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { ChangeDetectionStrategy, ChangeDetectorRef,  ElementRef, Inject, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
 

import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
 
interface SchoolDivision {
  id: string;
  schoolDivision: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './NewJournal.component.html',
  standalone: false,styleUrls: ['./NewJournal.component.scss']
})
export class NewJournalComponent implements OnInit {
  @ViewChild('viewDescModal')
  viewDescModal!: TemplateRef<any>;
  AllJournalsDetails:  any[] = []; TempAllJournalsDetails : any[]=[];  headHtmlData: never[] = []; isInputDisabled:boolean = true;    JournalId: any; fileNamesX!: string;         searchQueryx: any;
  Title: any;
  fileDataX: File | undefined;
  fileStatus: boolean | undefined;
  loadingIndicator: boolean | undefined;
  columns: never[] | undefined;
  isLoginFailed: boolean | undefined;
  PropertiesData: any;
  chunkedProperties: any;

  onSelectFile(a:any){
    let aa = a;   
    window.open(aa.imageUrl,'_blank');
  }

 
  openModal(journalId: string | number, title: string) {
    this.JournalId = journalId;
    this.Title = title;

    const modalElement = document.getElementById('viewDescModal');
    // if (modalElement) {
    //   this.modalInstance = new BootstrapModal(modalElement);
    //   this.modalInstance.show();
    // }
  }
  onSelect(a: any) {
    let aa = a;
    this.JournalId = aa['id'];
    this.Title = aa['journalTitle'];
    // this.modalService.open(this.viewDescModal, {size: 'sm'}).result.then((result: string) => {

    //   console.log("Modal closed" + result);
    // }).catch((res: any) => {});
  }
  onEditClick(a: any)
  {
    // alert(" " + JSON.stringify(a))
   this.router.navigateByUrl(a.id+ '/' + a.journalTitle + '/' + 'About');
  }
  
  UpdateFileDocument(Id: any) {
    if (this.fileChosen[Id]) {
    const formData = new FormData();
    formData.append('JournalId', Id);
    // formData.append('FilePath', this.fileName);
    // formData.append('File', this.FileDataX);
  
    this.LpujournalbookService.UpdateJournalImageFile(formData).subscribe({
      next: (data: any) => {
        const result = data.item1[0]['msg'];
        if (result === 'ok') {
          swal.fire({
            title: 'Uploaded the Document',
            text: data.item1[0]['msg'],
            icon: 'success'
          }).then(() => {
            window.location.reload();
          });
        } else  if (result === 'Failed') {
          swal.fire({
            title: 'Failed to Upload',
            text: result,
            icon: 'error'
          });
        }
      },
      error: (error: any) => {
        swal.fire({
          title: 'Error',
          text: 'Internal Server error',
          icon: 'error'
        });
      },
      complete: () => {
        window.location.reload();
      }
    });
    }
  }
  fileName(arg0: string, fileName: any) {
    throw new Error('Method not implemented.');
  }
  fileChosen: { [key: number]: boolean } = {};
  onFileXSelected(event: any, id: number): void {
    this.fileChosen[id] = event.target.files.length > 0;
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files as FileList)[0] || null;
  
    if (file && file.size > 3148576) {
      swal.fire({
        title: 'File size exceeds 3 MB. Please upload a smaller file.',
        text: 'Invalid File size',
        icon: 'warning'
      });
      target.value = '';
      return;
    }
  
    const fileNameRegex = /^[a-zA-Z0-9._-]+$/;
    if (file && !fileNameRegex.test(file.name)) {
      const validFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
 
      const modifiedFile = new File([file], validFileName, { type: file.type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(modifiedFile);
      target.files = dataTransfer.files;
  
      this.fileDataX = modifiedFile;
      this.fileStatus = true;
      
      reader.readAsDataURL(modifiedFile);
      reader.onload = () => {
        const ssss = reader.result as string;
        const ssssArray = ssss.split(',');
        // this.FileDataX = ssssArray[1];
        // this.fileName = validFileName;
      };
      return;
    }
  
    this.fileDataX = file;
    this.fileStatus = true;
  
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const ssss = reader.result as string;
        const ssssArray = ssss.split(',');
        // this.FileDataX = ssssArray[1];
        // this.fileName = file.name;
      };
    }
  }
  exportToExcel(): void {
    const fileName = 'Journals_Document_report.xlsx';
    const exportedData = this.AllJournalsDetails.map(item => ({
      Id: item.id,
      Title:item.journalTitle,
      Introduction: item.introduction
    }));
    const header = [
      'JournalId',
      'Title',
      'Introduction',
    ];
    const ws_data = [header, ...exportedData.map(item => Object.values(item))];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(ws_data);
    for (let i = 1; i < ws_data.length; i++) { // Start from 1 to skip the header row
      const cellAddress = XLSX.utils.encode_cell({ r: i, c:3 }); // Column 7 is DocumentUrl
      const cell = ws[cellAddress];
      if (cell && cell.v) {
        cell.f = `HYPERLINK("${cell.v}", "Download Attachement")`;
      }
    }
    const wscols = [
      { wpx: 200 }, { wpx: 200 }, { wpx: 200 }
    ];
    ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const blobData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([blobData], { type: 'application/octet-stream' }));
    link.download = fileName;
    link.click();
  }
 
  getBooksDetail(): void {
    this.LpujournalbookService.GetAllBooksDetails().subscribe((response) => {
      if (response.item1 && response.item1.length > 0) {
        this.AllJournalsDetails = response.item1;
        this.TempAllJournalsDetails = this.AllJournalsDetails; 
        this.loadingIndicator = false;
        this.columns =[];        this.headHtmlData=[];
     
            this.headHtmlData = this.TempAllJournalsDetails[0];
            this.updatePaginatedData();
            // ["id","journalTitle","introduction","subTitle","volumne","scopeofJournal","publishDate","thrustArea","articleType","imageUrl"]
            this.columns = this.columns.filter((item: any) => item !== 'imageUrl'  && item !== 'volumne' && item !== 'introduction' && item !== 'publishDate'  && item !== 'scopeofJournal' && item !== 'thrustArea' && item !== 'articleType' );
            this.columns.push()
         this.loadingIndicator = false;
      }
      else {
        this.TempAllJournalsDetails = [];
      }
    });
  }
  
  onNewFileSelected(e: any): void {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    let fileExtension
    let fileNames = file.name.split('.')
    fileExtension = fileNames[1];
    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png") {
      //TO DO
    } else {
      swal.fire({
        title: 'Journal File',
        text: 'Only jpg/jpeg and png files are allowed!',
        icon: 'warning'
      });
      target.value = '';
      return;
    }
    if (file && file.size > 1048576) {
      swal.fire({
        title: 'File size exceeds 1MB. Please upload a smaller file.',
        text: 'Invalid File size',
        icon: 'warning'
      });
      target.value = '';
      return;
    }
    this.fileDataX = file;
    this.isInputDisabled= false;
  }
   
  constructor(
    private LpujournalbookService: LpujournalbookService,
    
    private router: Router,
    private storageService: StorageService, private authService: AuthService,
    public formBuilder: UntypedFormBuilder, private route: ActivatedRoute,
    private fb: FormBuilder) { }
  ngOnInit(): void {

    

    // (<HTMLInputElement>document.getElementById('stMain')).innerHTML = '<span class="themeClr">Journal </span> Master';
    // (<HTMLInputElement>document.getElementById('imgLogo')).style.width = '164px';
    this.getBooksDetail();  
    // let loginName = this.route.snapshot.params['loginName'];
    // if (loginName != '' && loginName != undefined) {
    //   this.getToken(loginName);
    // }
  }

  
  searchx() {
    const query = this.searchQueryx.toLowerCase();
    this.TempAllJournalsDetails = this.AllJournalsDetails.filter(item => {
      return Object.values(item).some(val =>
        String(val).toLowerCase().includes(query)
      );
    });
  }
  getToken(id: any) {
    this.authService.loginTemp(id).subscribe({
      next: data => {
        this.storageService.saveUser(data);      
        this.getBooksDetail();      
      },
      error: _err => {
        this.LoginFailed(_err);
      }
    });
  }
 
  LoginFailed(_NewError: any) {
    this.isLoginFailed = true;
    swal.fire({
      title: 'Login Failed',
      text: 'Login details are Invalid!',
      icon: 'warning',
    })
    const element = document.getElementById('JournalForm');
    if (element) {
      element.hidden = true;
    }
  }
   

  
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedJournals: any[] = [];

 

  // Update paginated data when data changes
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJournals = this.TempAllJournalsDetails.slice(startIndex, endIndex);
  }

  // Calculate total pages
  get totalPages(): number {
    return Math.ceil(this.TempAllJournalsDetails.length / this.itemsPerPage);
  }

  // Pagination controls
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }


  // Call this when your data changes
  onDataChange() {
    this.updatePaginatedData();
  }
 
} 