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
  userRoleText: any;

  constructor(
    private journalWebApiService: LpujournalbookService,
    private AuthSession: LoginSessionService,
    private router: Router,
    private route: ActivatedRoute,
    private StoragesServices: StorageService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    var BookId = this.route.snapshot.params['Id'];
    var name = this.route.snapshot.params['name'];
    this.LoginStatus=this.checkUserLogin();
    if (BookId != undefined && this.LoginStatus==true ) {
      this.BookId = BookId;
      this.name = name;
    }
    else 
    {
      this.BookId = BookId;
      this.name = name;
    }
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


  UserRolesData: any;
  UserRolesArray: { value: string; label: string; id: string }[] = [];
  editorRole: boolean = false;
  authorRole: boolean = false;
  reviewerRole: boolean = false;
  publisherRole: boolean = false;


  availableRoles = [
    { value: '0', label: 'Editor Login' },
    { value: '1', label: 'Author Login' },
    { value: '2', label: 'Reviewer Login' },
    { value: '3', label: 'Publisher Login' },
  ];

  selectedRoles: string[] = [];


  
 

  getUserRolesforId(): void {
    this.journalWebApiService.GetUserRolesforUser(this.userId).subscribe({
      next: (response) => {
        if (response?.item1?.length > 0) {
          this.UserRolesData = response.item1[0];
          const roles = this.UserRolesData?.userRole?.split(',') ?? [];
          if (this.selectedRole===undefined || this.selectedRole===null ) {
            this.Logout(); 
           }
          this.UserRole = roles;
          // Sort and join roles to compare easily
          const sortedRoles = [...roles].sort().join(',');
  
          
          if (this.selectedRole ==='0' && sortedRoles.includes(this.selectedRole)  ) {
            this.userRoleText = 'Editor';
          }
          // Reviewer
          else if (this.selectedRole === '2' && sortedRoles.includes(this.selectedRole)   ) {
            this.userRoleText = 'Reviewer';
          }
          // Publisher
          else if (this.selectedRole === '3' && sortedRoles.includes(this.selectedRole)  ) {
            this.userRoleText = 'Publisher';
          }
          // Default fallback
          else if (this.selectedRole ==='1' && sortedRoles.includes(this.selectedRole)   ){
            this.userRoleText = 'User';
          }
        } 
      },
      error: (err) => {
        console.error('Error fetching user roles:', err);
        this.UserRole = [];
        this.userRoleText = '';
      }
    });
  }
 

  checkUserLogin() {
    const GetCookieData = this.cookieService.get('authData');
    var status=this.StoragesServices.isLoggedIn();
    if (GetCookieData && status==true) {
      return true;
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
} 