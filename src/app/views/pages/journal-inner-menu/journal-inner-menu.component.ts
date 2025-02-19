import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginSessionService } from 'src/app/_services/login-session.service';
import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
import { StorageService } from 'src/app/_services/storage.service';
 
import Swal from 'sweetalert2';
// import swal from 'sweetalert2';
@Component({
  selector: 'app-journal-inner-menu',
  templateUrl: './journal-inner-menu.component.html',
  styleUrls: ['./journal-inner-menu.component.scss']
})
export class JournalInnerMenuComponent implements OnInit {
  isDisabled = true; 
  BookId: any; name: any;
  UserRole: any;
  user_Email: any;
  supervisorName: any;
  departmentName: any;
  candidateName: any;
  LoginStatus: boolean = false;
  constructor(
    private journalWebApiService: LpujournalbookService,
    private AuthSession: LoginSessionService,
    private StoragesServices: StorageService,

    private router: Router, private route: ActivatedRoute,
    private cookieService: CookieService) { }

  VisitUrl(Id: any, name: any, Sufix: any) {
    this.router.navigateByUrl(Id + '/' + name + '/' + Sufix);
  }

  ngOnInit(): void {
    var BookId = this.route.snapshot.params['Id'];
    var name = this.route.snapshot.params['name'];
    if (BookId != undefined && BookId != null) {
      this.BookId = BookId;
      this.name = name;
      this.LoginStatus = this.checkUserLogin();
    }
  }
  checkUserLogin() {
    const GetCookieData = this.cookieService.get('authData');
    if (GetCookieData) {
      try {
        const retrievedCookies = JSON.parse(GetCookieData);
        this.UserRole = retrievedCookies.userRole?.length > 0 ? retrievedCookies.userRole : 'Internal User';
        this.user_Email = retrievedCookies.EmailId;
        this.supervisorName = retrievedCookies.SupervisorName;
        this.departmentName = retrievedCookies.DepartmentName;
        this.candidateName = retrievedCookies.CandidateName;
        return true;
      } catch (error) {
        console.error("Error parsing JSON from cookies:", error);
        return false; // Handle error scenario here
      }
    } else {
      return false;
    }

  }
  // Logout() {
  //   //authData
  //   // Delete specific cookies with explicit paths
  //   this.cookieService.delete('authData', '/');
  //   this.cookieService.delete('BookData', '/');

  //   this.cookieService.deleteAll('/');

  //   this.AuthSession.clearSession();

  //   this.router.navigateByUrl('/');

  // }

  Logout() {
    // Delete cookies properly
    this.cookieService.delete('authData');
    this.cookieService.delete('BookData');
    this.cookieService.deleteAll();
  
    // Clear session storage if used
    this.AuthSession.clearSession();
    this.StoragesServices.clean();
    sessionStorage.clear();
    localStorage.clear();
  
    // Reset user variables
    this.UserRole = null;
    this.user_Email = null;
    this.supervisorName = null;
    this.departmentName = null;
    this.candidateName = null;
    this.LoginStatus = false;
  
    // Navigate to login page instead of reloading
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
}
