import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
const AUTH_API = 'https://projectsapi.lpu.in/';
//  const AUTH_API = 'https://localhost:7125/';// 'https://projectsapi.lpu.in/';//'https://projectsapi.lpu.in/'; //
const AUTH_API_LOCAL = 'https://projectsapi.lpu.in/'; //'https://localhost:7125/';
const AUTH_API_LOCALs = 'https://projectsapi.lpu.in/'; //'https://localhost:7125/';
const AUTH_API_LOCAs = 'https://projectsapi.lpu.in/';
// const LOCAL_API_URL = 'https://localhost:7125/';

@Injectable({
  providedIn: 'root'
})
export class LpujournalbookService {
  baseUrl = AUTH_API;

  constructor(private http: HttpClient, private storageService: StorageService) { }
  private authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbk5hbWUiOiJMUFVKb3VybmFsIiwibmJmIjoxNzM5MjU0OTYzLCJleHAiOjE3NzA3OTA5NjMsImlhdCI6MTczOTI1NDk2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyNS8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTI1LyJ9.Ir-NM1QRF4MMr-hSvbMAhwv6Fzyhc3agCmn0TkqtwrM';//

  GetAllBooksDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    // return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetBooksMasterData`, httpOptions);
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetAllJournalData`, httpOptions);
  }

  GetBooksDataWithEditorDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetBooksDataWithEditorDetails`, httpOptions);
  }
  GetJournalBookDetailsById(BookId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetJournalBookDetailsById?Id=` + BookId, httpOptions);
  }
  GetJournalEditorsDetailsByBookId(BookId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetJournalEditorsDetailsByBookId?Id=` + BookId, httpOptions);
  }
  GetJournalAuthorDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetJournalAuthorDetails`, httpOptions);
  }


  GetBookTabsDetails(BookId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    }; //GetJournalBooksDetailsTabs?BookId=
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetJournalBooksDetailsTabs?BookId=` + BookId, httpOptions);
  }


  //24-sep-24
  GetAllJournalMasterwithEditorDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetAllJournalMasterwithEditorDetails`, httpOptions);
  }

  //26-09-24
  //GetJournalDetailsforAboutPage?JournalId=29
  GetJournalDetailsforAboutPage(JournalId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetJournalDetailsforAboutPage?JournalId=` + JournalId, httpOptions);
    // return this.http.get<any>(`${LOCAL_API_URL}api/LpuJournal/GetJournalDetailsforAboutPage?JournalId=` + JournalId, httpOptions);
  }
  GetAllJournalEditorsDetails(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetAllJournalEditorsDetails`, httpOptions);
  }




  // 30-09-24


  JournalMasterNewEntry(dataSoft: FormData): Observable<any> {
    var authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      // .set('Authorization', 'Bearer ' + authToken)
      .set('Authorization', 'Bearer ' + authToken)
    return this.http.post(
      AUTH_API + 'LpuJournal/JournalMasterNewEvent',
      dataSoft,
      { headers }
    );
  }


  GetJournalProperties(): Observable<any> {
    var authToken = this.storageService.getUser();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      })
    };
    return this.http.get<any>(`${AUTH_API}api/LpuJournal/GetJournalProperties`, httpOptions);
  }


  addJournalData(dataSoft: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', '*/*',);

    //httpOptions.headers.set('Authentication', 'Bearer ' + token);
    return this.http.post(
      AUTH_API + 'api/LpuJournal/JournalMasterNew', dataSoft,
      { headers }
    );
  }


  AddJournalUserAccount(newUserData: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.post(
      // AUTH_API + 'api/LpuJournal/CreateJournalUserAccount', newUserData, { headers }
      AUTH_API + 'api/LpuJournal/CreateJournalUserAccount', newUserData, { headers }
      // LOCAL_API_URL + 'api/LpuJournal/CreateJournalUserAccount', newUserData, { headers }
    );
  }



  GetAuthoriseUserData(UserEmail: any, secreatKeys: any, userRole: any): Observable<any> {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
      .set('Content-Type', 'application/json');
    return this.http.get(
      AUTH_API + 'api/LpuJournal/GetJournalUserDetailsIdWise?Email=' + UserEmail + '&PasswordText=' + secreatKeys + '&UserRole=' + userRole,
      // AUTH_API_LOCAL + 'api/LpuJournal/GetJournalUserDetailsIdWise?Email=' + UserEmail + '&PasswordText=' + secreatKeys + '&UserRole=' + userRole,
      { headers }
    );
  }

  UpdateJournalImageFile(dataSoft: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', '*/*',);
    //httpOptions.headers.set('Authentication', 'Bearer ' + token);
    return this.http.post(
      AUTH_API + 'api/LpuJournal/UpdateJournalImage', dataSoft,
      // AUTH_API_LOCAL + 'api/LpuJournal/UpdateJournalImage',dataSoft,
      { headers }
    );
  }



  // 24-oct-24
  //NewJournalMenuScript


  AddNewJournalMenuScriptData(newMenuscriptData: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', '*/*',);
    //httpOptions.headers.set('Authentication', 'Bearer ' + token);
    return this.http.post(
      // AUTH_API + 'api/LpuJournal/NewJournalMenuScript', newMenuscriptData, { headers }
      AUTH_API_LOCAL + 'api/LpuJournal/NewJournalMenuScript', newMenuscriptData, { headers }
    );
  }

  UserWiseAllMenuScript(UserEmail: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API + 'api/LpuJournal/GetAllMenuScriptForUser?Email=' + UserEmail, { headers }
    );
  }
  // GetUserRolesforUser(UserEmail:any): Observable<any> {
  //   let token = this.storageService.getUser();
  //   let headers = new HttpHeaders()
  //   .set('Authorization', 'Bearer ' + this.authToken)
  //   return this.http.get(
  //     // AUTH_API_LOCAL + 'api/LpuJournal/GetAllMenuScriptForUser?Email=' + UserEmail, { headers }
  //     // AUTH_API+ 'api/LpuJournal/GetUserRoles?Email=' + UserEmail, { headers }
  //     AUTH_API_LOCAL+ 'api/LpuJournal/GetUserRoles?Email=' + UserEmail, { headers }
  //   );
  // }
  GetUserRolesforUser(UserEmail: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authToken}`
      })
    };
    // return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetBooksMasterData`, httpOptions);
    return this.http.get<any>(`${this.baseUrl}api/LpuJournal/GetUserRoles?Email=` + UserEmail, httpOptions);
  }

  AuthoriseUserDetails(UserEmail: any, secreatKeys: any, JournalId: any): Observable<any> {
    //  var authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
      .set('Content-Type', 'application/json');
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetUserDetailsIdWise?Email=' + UserEmail + '&PasswordText=' + secreatKeys + '&JournalId=' + JournalId,
      // AUTH_API + 'api/LpuJournal/GetUserDetailsIdWise?Email=' + UserEmail + '&PasswordText=' + secreatKeys ,
      { headers }
    );
  }

  //  13-feb-25
  NewReviewersRemarks(newReviewersRemarks: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', '*/*',);
    return this.http.post(
      // AUTH_API + 'api/LpuJournal/NewJournalMenuScript', newMenuscriptData, { headers }
      AUTH_API_LOCAL + 'api/LpuJournal/UpdateReviewersRemarks', newReviewersRemarks, { headers }
    );
  }

  // 21-feb-25

  GetAllMenuScriptForJournalId(JournalId: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllMenuScriptForJournal?Id=' + JournalId, { headers }
    );
  }


  GetAllReviewersForJournalId(JournalId: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllReviewersForJournal?Id=' + JournalId, { headers }
    );
  }

  // added on 25-feb-25
  AssignNewReviewerForJournal(AssignnewReviewer: FormData): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', '*/*',);
    return this.http.post(
      // AUTH_API + 'api/LpuJournal/NewJournalMenuScript', newMenuscriptData, { headers }
      AUTH_API_LOCAL + 'api/LpuJournal/AssignReviewerForJournal', AssignnewReviewer, { headers }
    );
  }

  // GetAllJournalEditorDetails(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.authToken}`
  //     })
  //   };
  //   return this.http.get<any>(`${AUTH_API_LOCALs}api/LpuJournal/GetAllJournalEditorDetails`, httpOptions);
  // }

  GetAllJournalEditorDetails(): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllJournalEditorDetails', { headers }
    );
  }

  GetAllJournalUserDetails(RoleId: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllJournalUserDetails?Role=' + RoleId, { headers }
    );
  }
  // 3-March-25

  GetReviewerDetailsForEditors(UserId: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllReviewersForEditors?UserId=' + UserId, { headers }
    );
  }

  // 5-march-25
  GetMenuScriptForReviewers(AssignedToUserEmail: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API_LOCAL + 'api/LpuJournal/GetAllMenuScriptForReviewers?Email=' + AssignedToUserEmail, { headers }
    );
  }

  // 6-march-25

  JournalGetUserDetails(UserEmailId: string): Observable<any> {
    let authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      //  .set('Authorization', 'Bearer ' + authToken) // for local API
      .set('Authorization', 'Bearer ' + this.authToken)
      .set('Content-Type', 'application/json');
    return this.http.get(
      AUTH_API_LOCALs + 'api/LpuJournal/JournalGetUserDetails?EmailId=' + UserEmailId,
      { headers }
    );
  }


  // 6-march-25
  JournalUpdatePasswordDetails(UpdateUserData: FormData): Observable<any> {
    let authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authToken)
    return this.http.post(
      AUTH_API_LOCALs + 'api/LpuJournal/JournalUpdatePasswordDetails', UpdateUserData, { headers }
    );
  }
  // 27-march-25
  GetAllReviewersRemarks(JournalId: any): Observable<any> {
    let authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken)
    return this.http.post(
      AUTH_API_LOCALs + 'api/LpuJournal/GetReviewersRemarks?JournalId=' + JournalId,
      { headers }
    );
  }

  // 27-march-25


  GetAllReviewersRemarkss(JournalId: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API_LOCAs + 'api/LpuJournal/GetReviewersRemarks?JournalId=' + JournalId,
      { headers }
    );
  }

  // 1-april-25
  ApproveDocument(dataSoft: FormData): Observable<any> {
    let authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken)
    //.set('Authorization', 'Bearer ' + this.Localtoken)
    return this.http.post(
      AUTH_API_LOCAs + 'api/LpuJournal/ApprovalAction',
      dataSoft,
      { headers });
    // // Create an HttpHeaders object with the Authorization header
    // debugger;
    // let headers = new HttpHeaders()
    //   .set('Authorization', 'Bearer ' + this.authToken)
  }
  GetUserReviewersRemarks(UserEmail: any): Observable<any> {
    let token = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.http.get(
      AUTH_API_LOCAs + 'api/LpuJournal/GetReviewersRemarks?UserEmail=' + UserEmail,
      { headers }
    );
  }

  ApproveEditor(dataSoft: FormData): Observable<any> {
    let authToken = this.storageService.getUser();
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken)
    //.set('Authorization', 'Bearer ' + this.Localtoken)
    return this.http.post(
      AUTH_API_LOCAs + 'api/LpuJournal/ApproveEditor',
      dataSoft,
      { headers });
    // // Create an HttpHeaders object with the Authorization header
    // debugger;
    // let headers = new HttpHeaders()
    //   .set('Authorization', 'Bearer ' + this.authToken)
  }

}
