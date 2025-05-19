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
    
    this.router.navigateByUrl(`${this.BookId}/${this.name}/${'RolewiseLogin'}`).then(() => {
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
    this.getUserRolesforId();
   
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


  
  // getUserRolesforId(): void {
  //   const roleMapping: Record<string, string> = {
  //     '0': 'Editor',
  //     '1': 'Author',
  //     '2': 'Reviewer',
  //     '3': 'Publisher'
  //   };

  //   this.journalWebApiService.GetUserRolesforUser(this.userId).subscribe({
  //     next: (response) => {
  //       if (response?.item1?.length > 0) {
  //         this.UserRolesData = response.item1[0];

  //         // Ensure userRole exists before processing
  //         const roles = this.UserRolesData?.userRole ? this.UserRolesData.userRole.split(',') : [];
  //         this.UserRolesArray = roles.map((role: any) => {
  //           const roleKey = String(role); // Ensure role is a string
  //           const label = roleMapping[roleKey] || roleKey; // Use mapped label or fallback to role itself

  //           // Set role variables based on user role
  //           if (roleKey === '0') this.userRoleText = 'Editor';
  //           if (roleKey === '1') this.userRoleText = 'Author';
  //           if (roleKey === '2') this.userRoleText = 'Reviewer';
  //           if (roleKey === '3') this.userRoleText = 'Publisher';

  //           return {
  //             value: roleKey,
  //             label,
  //             id: label.replace(/\s+/g, '') // Safe to call replace() now
  //           };
  //         });
  //       } else {
  //         this.UserRolesArray = []; // Reset array if no roles found
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching user roles:', err);
  //       this.UserRolesArray = []; // Reset array on error
  //     }
  //   });
  // }


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
  
          // Check for Super Admin first (most privileged)
          // if (sortedRoles === '0,1,2,3' || sortedRoles === '0,2,3') {
          //   this.userRoleText = 'Super Admin';
          // }
          // // Editor
          // else 
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
  
} 