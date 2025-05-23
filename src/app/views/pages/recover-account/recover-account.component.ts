import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { StorageService } from 'src/app/_services/storage.service';
import swal from 'sweetalert2';
import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
import Swal from 'sweetalert2';
import { LoginSessionService } from 'src/app/_services/login-session.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {
  emailFormGroup: FormGroup;
  idProofFormGroup: FormGroup;
  resetPasswordFormGroup: FormGroup;
  BookId: any; name: any; JournalTitle:any; JournalId: any;
  idProofType: string = '';
  idProofNumber: string = '';
  errorMessage: string = '';
  userDetails: any = null; // User details fetched from API
  UserId: any;
  currentStep = 1;   
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private AuthSession: LoginSessionService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private journalWebApiService: LpujournalbookService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Step 1: Email form
    this.emailFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Step 2: ID Proof form
    this.idProofFormGroup = this.fb.group({
      idProofNumber: ['', Validators.required]
    });

    // Step 3: Password reset form
    this.resetPasswordFormGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  VisitUrl(Id: any, name: any, Sufix: any) {
    this.router.navigateByUrl(Id + '/' + name + '/' + Sufix).then(() => {
      window.location.reload();
    });;
  }


  ngOnInit() {
    var BookId = this.route.snapshot.params['Id'];
    var name = this.route.snapshot.params['name'];
    if (BookId != undefined && BookId != null) {
      this.BookId =this.JournalId= BookId;
      this.name = this.JournalTitle= name;
      this.JournalTitle = name.replace(/-/g, ' ');
    }
    this.currentStep = 1;   
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
 
  // Step 1: Check user email
  checkEmail() {
    this.errorMessage ='';
    const email = this.emailFormGroup.get('email')?.value;
  
    if (!email) {
      swal.fire({
        title: 'Please enter a valid email address',
        icon: 'warning'
      });
      return;
    }
  
    this.journalWebApiService.JournalGetUserDetails(email).subscribe(
      (response: any) => {
        if (response?.item1?.length > 0) {
          const user = response.item1[0];
          this.userDetails = response.item1;
          this.idProofType = 'Mobile Number';
          this.idProofNumber = user.mobileNumber;
  
          if (this.idProofNumber?.length > 0) {
            
            this.nextStep(); // Proceed to Step 2
            this.currentStep=2;
          } else {
            this.showUserNotFound();
          }
        } else {
          this.showUserNotFound();  
        }
      },
      (error) => {
        console.error('API error:', error);
        this.showUserNotFound(); // Handle API error
      }
    );
  }
  
  private showUserNotFound() {
    this.errorMessage = 'No user found or account is locked';
    swal.fire({
      title: this.errorMessage,
      icon: 'error'
    }).then(() => {
      this.emailFormGroup.reset();
      this.currentStep = 1;
    });
  }
  
  // Step 2: Verify ID proof number
  verifyIdProof() {
    const enteredIdProofNumber = this.idProofFormGroup.get('idProofNumber')?.value;
    if (this.idProofNumber == enteredIdProofNumber) {
      // this.showStep3 = true; 
      this.nextStep();
      this.currentStep = 3;  
    } else {
      this.errorMessage = 'ID Proof number does not match';
    }
  }

  // Step 3: Reset password
  resetPassword() {
    const { password, confirmPassword } = this.resetPasswordFormGroup.value;
    if (password === confirmPassword) {
      // alert('Password reset successful!');
        this.UserId = this.emailFormGroup.get('email')?.value;
      const formData = new FormData();
        formData.append('UserId', this.UserId);
        formData.append('Password', password);
        // formData.forEach((value, key) => {
        //   console.log(`${key}: ${value}`);
        // });
        this.journalWebApiService.JournalUpdatePasswordDetails(formData).subscribe({
          next: (data: any) => {
            const result = data.item1[0]['msg'];
            if (result === 'Success') {
              swal.fire({
                title: 'Details Updated Successfully!',
                text: 'You will be logeed out ',
                icon: 'success'
              }).then(() => {
                this.router.navigateByUrl(this.BookId + '/' + this.name + '/' + 'ExternalLogin');
              });
            } else if (result === 'Failed') {
              swal.fire({
                title: 'Unable to Update Details Try Again Later ',
                icon: 'error'
              }).then(() => {
                window.location.reload();
              });
            } else {
              swal.fire({
                title: 'Something Went Wrong, Try again later',
                icon: 'error'
              }).then(() => {
                window.location.reload();
              });
            }
          },
          error: (error: any) => {
            swal.fire({
              title: 'Error',
              text: 'Failed to Update.',
              icon: 'error'
            }).then(() => {
              window.location.reload();
            });
          },
          complete: () => {
          }
        });
      // this.currentStep = 1; 
      // this.clearContents();
    } else {
      this.errorMessage = 'Passwords do not match';
    }
  }
  clearContents(){    
    this.idProofFormGroup.reset();
    this.emailFormGroup.reset();
    this.resetPasswordFormGroup.reset();
  }
}
