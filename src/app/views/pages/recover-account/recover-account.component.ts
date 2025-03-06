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
import { MouDocumentsService } from 'src/app/_services/mou-documents.service';
import { Console } from 'console';


@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.css']
})
export class RecoverAccountComponent implements OnInit {
  emailFormGroup: FormGroup;
  idProofFormGroup: FormGroup;
  resetPasswordFormGroup: FormGroup;

  idProofType: string = '';
  idProofNumber: string = '';
  errorMessage: string = '';
  userDetails: any = null; // User details fetched from API
  UserId: any;
  currentStep = 1;  // ✅ Use only currentStep

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

  ngOnInit() {
    console.log('Component Loaded!');
    this.currentStep = 1;  // ✅ Ensure step starts at 1
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
    const email = this.emailFormGroup.get('email')?.value;
      this.journalWebApiService.JournalGetUserDetails(email).subscribe(
      (response: any) => {
        if (response.item1 && response.item1.length > 0 ) {
          this.userDetails = response.item1;
          this.idProofType = this.userDetails[0].idProofType;
          this.idProofNumber = this.userDetails[0].idProofNumber;
          this.nextStep();  
          this.currentStep=2;
        } else {
          this.errorMessage = 'No user found or account is locked';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the user details';
      }
    );
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
                this.router.navigate(['/Login']);
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

// export class RecoverAccountComponent implements OnInit {

//   emailFormGroup: FormGroup;
//   idProofFormGroup: FormGroup;
//   resetPasswordFormGroup: FormGroup;
  
//   idProofType: string = '';
//   idProofNumber: string = '';
//   showStep2: boolean = false;
//   showStep3: boolean = false;
//   errorMessage: string = '';
//   UserId: any;

//   ngOnInit() {
//     this.step = 1;
//   }
//   step = 1;  // Track current step
//   emailForm: FormGroup | undefined;
//   idProofForm!: FormGroup;
//   resetPasswordForm!: FormGroup;
  
//   userDetails: any = null; // This will hold the user details fetched from the API
  
//   constructor(
//     private storageService: StorageService,
//     private authService: AuthService,
//     private AuthSession: LoginSessionService,
//     private router: Router,
//     private route: ActivatedRoute, private cookieService: CookieService,
//     private journalWebApiService: LpujournalbookService,
//     private fb: FormBuilder, private http: HttpClient) {
//     // Step 1: Email form
//     this.emailFormGroup = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });

//     // Step 2: ID Proof form
//     this.idProofFormGroup = this.fb.group({
//       idProofNumber: ['', Validators.required]
//     });

//     // Step 3: Password reset form
//     this.resetPasswordFormGroup = this.fb.group({
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
//     });
//   }
//   previousStep() {
//     this.currentStep--;
//   }
//   currentStep = 1;

//   // Step 1: Check user email
//   checkEmail() {
//     const email = this.emailFormGroup.get('email')?.value;
//       this.journalWebApiService.JournalGetUserDetails(email).subscribe(
//       (response: any) => {
//         if (response.item1 && response.item1.length > 0 ) {
//           this.userDetails = response.item1;
//           this.idProofType = this.userDetails[0].idProofType;
//           this.idProofNumber = this.userDetails[0].idProofNumber;
//           this.showStep2 = true;  
//           this.currentStep=2;
//         } else {
//           this.errorMessage = 'No user found or account is locked';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while fetching the user details';
//       }
//     );
//   }

//   // Step 2: Verify ID proof number
//   verifyIdProof() {
//     const enteredIdProofNumber = this.idProofFormGroup.get('idProofNumber')?.value;
//     if (this.idProofNumber == enteredIdProofNumber) {
//       this.showStep3 = true; 
//       this.currentStep = 3;  
//     } else {
//       this.errorMessage = 'ID Proof number does not match';
//     }
//   }

//   // Step 3: Reset password
//   resetPassword() {
//     const { password, confirmPassword } = this.resetPasswordFormGroup.value;
//     if (password === confirmPassword) {
//       // alert('Password reset successful!');
//         this.UserId = this.emailFormGroup.get('email')?.value;
//       const formData = new FormData();
//         formData.append('UserId', this.UserId);
//         formData.append('Password', password);
//         // formData.forEach((value, key) => {
//         //   console.log(`${key}: ${value}`);
//         // });
//         this.journalWebApiService.JournalUpdatePasswordDetails(formData).subscribe({
//           next: (data: any) => {
//             const result = data.item1[0]['msg'];
//             if (result === 'Success') {
//               swal.fire({
//                 title: 'Details Updated Successfully!',
//                 text: 'You will be logeed out ',
//                 icon: 'success'
//               }).then(() => {
//                 this.router.navigate(['/Login']);
//               });
//             } else if (result === 'Failed') {
//               swal.fire({
//                 title: 'Unable to Update Details Try Again Later ',
//                 icon: 'error'
//               }).then(() => {
//                 window.location.reload();
//               });
//             } else {
//               swal.fire({
//                 title: 'Something Went Wrong, Try again later',
//                 icon: 'error'
//               }).then(() => {
//                 window.location.reload();
//               });
//             }
//           },
//           error: (error: any) => {
//             swal.fire({
//               title: 'Error',
//               text: 'Failed to Update.',
//               icon: 'error'
//             }).then(() => {
//               window.location.reload();
//             });
//           },
//           complete: () => {
//           }
//         });
//       // this.currentStep = 1; 
//       // this.clearContents();
//     } else {
//       this.errorMessage = 'Passwords do not match';
//     }
//   }
//   clearContents(){
    
//     this.idProofFormGroup.reset();
//     this.emailFormGroup.reset();
//     this.resetPasswordFormGroup.reset();
//   }
// } 