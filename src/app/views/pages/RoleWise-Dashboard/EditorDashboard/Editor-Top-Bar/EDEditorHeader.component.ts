import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginSessionService } from 'src/app/_services/login-session.service';
import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-EDEditorHeader',
  templateUrl: './EDEditorHeader.component.html',
  styleUrls: ['./EDEditorHeader.component.scss']
})
export class EDEditorHeaderComponent implements OnInit {
  isDisabled: boolean = true;
  BookId: any;
  name: any;

  showSearchForm: boolean = false;
  show: boolean = true;
  isSearchOpen: boolean = false;
  isNavbarCollapsed: boolean = true;

  UserRole: any;
  user_Email: any;
  supervisorName: any;
  departmentName: any;
  candidateName: any;
  LoginStatus: boolean = false;
  JournalTitle: any;
  userId: any;
  selectedRole: any;
  constructor(
    private journalWebApiService: LpujournalbookService,
    private AuthSession: LoginSessionService,
    private router: Router,
    private route: ActivatedRoute,
    private StoragesServices: StorageService,
    private cookieService: CookieService
  ) {}


  



  VisitUrl(Id: any, name: any, Sufix: any): void {
    this.router.navigateByUrl(`${Id}/${name}/${Sufix}`).then(() => {
      window.location.reload();
    });
  }

  VisitUserPage(Menu: any, Id: any, Sufix: any): void {
    this.router.navigateByUrl(`${Menu}/${Id}/${Sufix}`).then(() => {
      window.location.reload();
    });
  }

  VisitPage(Page: any): void {
    this.router.navigateByUrl(Page).then(() => {
      window.location.reload();
    });
  }
 
  checkUserLogin(): Boolean | any{
    const GetCookieData = this.cookieService.get('authData');
    if (GetCookieData) {
      try {
        const retrievedCookies = JSON.parse(GetCookieData);
        this.UserRole = retrievedCookies.UserRole?.length > 0 ? retrievedCookies.UserRole : -1;
        this.userId = retrievedCookies.EmailId;
        let Token = retrievedCookies.AccessToken;
        this.supervisorName = retrievedCookies.SupervisorName;
        this.departmentName = retrievedCookies.DepartmentName;
        this.candidateName = retrievedCookies.CandidateName;
        this.selectedRole = retrievedCookies.SelectedRole;
        return true;
      } catch (error) {
        console.log("error");
      }
    } else {
      return false;
    }    
  }
  Logout() {
    // Delete specific cookies
    this.cookieService.delete('authData');
    this.cookieService.delete('BookData');
  
    // Ensure all cookies are cleared
    this.cookieService.deleteAll();
  
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.clear();
  
    // Ensure session-related services are cleared
    this.AuthSession.clearSession();
    this.StoragesServices.clean();
  
    // Reset user-related variables
    this.UserRole = null;
    this.user_Email = null;
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
    this.BookId = this.route.snapshot.params['Id'];
    this.name = this.route.snapshot.params['name'];
    
    this.JournalTitle = this.name.replace(/-/g, ' ');
    this.LoginStatus = this.checkUserLogin();
   
  }
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleSearchForm(): void {
    this.showSearchForm = !this.showSearchForm;
    this.show = !this.show;
  }

  goto(val: any): void {
    this.router.navigateByUrl(val);
  }

} 