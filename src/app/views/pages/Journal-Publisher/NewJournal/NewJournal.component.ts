import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LpujournalbookService } from 'src/app/_services/lpujournalbook.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-journal-form',
    templateUrl: './NewJournal.component.html',
    styleUrls: ['./NewJournal.component.scss']
})
export class JournalFormComponent implements OnInit {
    step = 1;
    journalForm1!: FormGroup;
    journalForm2!: FormGroup;
    editorForm!: FormGroup;
    isForm1Submitted = false;
    isForm2Submitted = false;
    isEditorSubmitted = false;
    fileNames: any = '';
    fileDataX!: File;
  
    editorTypes: string[] = ['Editor-in-Chief', 'Co-Editor', 'Associate Editor', 'Guest Editor'];
  
    stepTitles: string[] = [
      'Journal Basic Information',
      'Journal Basic Property Details',
      'Journal Editor Details'
    ];
  
    constructor(
      private fb: FormBuilder,
      private journalService: LpujournalbookService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.journalForm1 = this.fb.group({
        journalTitle: ['', Validators.required],
        subTitle: ['', Validators.required],
        Volume: ['', Validators.required],
        publishDate: ['', Validators.required],
        Introduction: ['', Validators.required],
        scopeofjournals: ['', Validators.required],
        thrustArea: ['', Validators.required],
        ArticleType: ['', Validators.required],
        file: ['', Validators.required]
      });
  
      this.journalForm2 = this.fb.group({
        ISSNNo: ['', Validators.required],
        RegNo: ['', Validators.required],
        Periodicity: ['', Validators.required],
        Language: ['', Validators.required],
        Scope: ['', Validators.required],
        ArticleProcessCharges: ['', Validators.required],
        OpenAccess: ['', Validators.required],
        Print: ['', Validators.required],
        Online: ['', Validators.required],
        ReviewProcess: ['', Validators.required]
      });
  
      this.editorForm = this.fb.group({
        EditorinChief: this.fb.array([])
      });
      this.addEditor();
    }
  
    get form1() {
      return this.journalForm1.controls;
    }
    get form2() {
      return this.journalForm2.controls;
    }
    get editorArray() {
      return this.editorForm.get('EditorinChief') as FormArray;
    }
  
    addEditor() {
      this.editorArray.push(this.fb.group({
        EditorType: ['', Validators.required],
        EditorName: ['', Validators.required],
        Designation: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        EditorAddress: ['', Validators.required]
      }));
    }
  
    removeEditor(index: number) {
      this.editorArray.removeAt(index);
    }
  
    nextStep() {
      this.isForm1Submitted = true;
      if (this.journalForm1.valid) {
        this.step = 2;
      }
    }
  
    previousStep() {
      if (this.step > 1) this.step--;
    }
  
    nextStep2() {
      this.isForm2Submitted = true;
      if (this.journalForm2.valid) {
        this.step = 3;
      }
    }
  
    finishFunction() {
      this.isEditorSubmitted = true;
      if (this.journalForm1.valid && this.journalForm2.valid && this.editorForm.valid) {
        const formData = new FormData();
  
        formData.append('journalTitle', this.journalForm1.value.journalTitle);
        formData.append('subTitle', this.journalForm1.value.subTitle);
        formData.append('Volume', this.journalForm1.value.Volume);
        formData.append('publishDate', this.journalForm1.value.publishDate);
        formData.append('Introduction', this.journalForm1.value.Introduction);
        formData.append('scopeofjournals', this.journalForm1.value.scopeofjournals);
        formData.append('thrustArea', this.journalForm1.value.thrustArea);
        formData.append('ArticleType', this.journalForm1.value.ArticleType);
        formData.append('file', this.fileDataX);
  
        formData.append('ISSNNo', this.journalForm2.value.ISSNNo);
        formData.append('RegNo', this.journalForm2.value.RegNo);
        formData.append('Periodicity', this.journalForm2.value.Periodicity);
        formData.append('Language', this.journalForm2.value.Language);
        formData.append('Scope', this.journalForm2.value.Scope);
        formData.append('ArticleProcessCharges', this.journalForm2.value.ArticleProcessCharges);
        formData.append('OpenAccess', this.journalForm2.value.OpenAccess);
        formData.append('Print', this.journalForm2.value.Print);
        formData.append('Online', this.journalForm2.value.Online);
        formData.append('ReviewProcess', this.journalForm2.value.ReviewProcess);
  
        formData.append('editors', JSON.stringify(this.editorForm.value.EditorinChief));
        console.log("Form Data")
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        // this.journalService.saveJournalWithFile(formData).subscribe({
        //   next: () => Swal.fire('Success', 'Journal saved successfully', 'success'),
        //   error: () => Swal.fire('Error', 'Failed to save journal', 'error')
        // });
      }
    }
  
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file && file.size <= 3148576 && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        const validFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        this.fileDataX = new File([file], validFileName, { type: file.type });
        this.fileNames = validFileName;
        this.journalForm1.patchValue({ file: validFileName });
      } else {
        Swal.fire('Invalid File', 'File should be png/jpg and less than 3MB', 'warning');
      }
    }
  }
  
   
      
  
//   step = 1;
//   validationForm1!: FormGroup;
//   validationForm2!: FormGroup;
//   editorForm!: FormGroup;
//   isForm1Submitted = false;

//   // Model bindings (optional)
//   JournalTitle = '';
//   SubTitle = '';
//   Volume = '';
//   PublishDate = '';
//   Introduction = '';
//   ScopeOfJournal = '';
//   ThrustArea = '';
//   ArticleType = '';
//   fileNames = '';
//   ISSNNo = '';
//   RegNo = '';
//   Periodicity = '';
//   Language = '';
//   Scope = '';
//   ArticleProcessCharges = '';
//   OpenAccess = '';
//   Print = '';
//   Online = '';
//   ReviewProcess = '';

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.validationForm1 = this.fb.group({
//       journalTitle: ['', Validators.required],
//       subTitle: ['', Validators.required],
//       Volume: ['', Validators.required],
//       publishDate: ['', Validators.required],
//       Introduction: ['', Validators.required],
//       scopeofjournals: ['', Validators.required],
//       thrustArea: ['', Validators.required],
//       ArticleType: ['', Validators.required],
//       file: ['', Validators.required]
//     });

//     this.validationForm2 = this.fb.group({
//       ISSNNo: ['', Validators.required],
//       RegNo: ['', Validators.required],
//       Periodicity: ['', Validators.required],
//       Language: ['', Validators.required],
//       Scope: ['', Validators.required],
//       ArticleProcessCharges: ['', Validators.required],
//       OpenAccess: ['', Validators.required],
//       Print: ['', Validators.required],
//       Online: ['', Validators.required],
//       ReviewProcess: ['', Validators.required],
//     });

//     this.editorForm = this.fb.group({
//       EditorinChief: this.fb.array([this.createEditor()])
//     });
//   }

//   goToStep(stepNum: number): void {
//     this.step = stepNum;
//   }

//   form1Submit(): void {
//     this.isForm1Submitted = true;
//     if (this.validationForm1.valid) {
//       this.goToStep(2);
//     }
//   }

//   form2Submit(): void {
//     if (this.validationForm2.valid) {
//       this.goToStep(3);
//     }
//   }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.fileNames = file.name;
//       this.validationForm1.patchValue({ file: file.name });
//     }
//   }

//   get EditorinChief(): FormArray {
//     return this.editorForm.get('EditorinChief') as FormArray;
//   }

//   createEditor(): FormGroup {
//     return this.fb.group({
//       EditorType: ['', Validators.required],
//       EditorName: ['', Validators.required],
//       Designation: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       EditorAddress: ['', Validators.required]
//     });
//   }

//   addQuantity(): void {
//     this.EditorinChief.push(this.createEditor());
//   }

//   removeQuantity(index: number): void {
//     this.EditorinChief.removeAt(index);
//   }

//   onSubmitFinal(): void {
//     if (this.editorForm.valid) {
//       console.log('Editor Data:', this.editorForm.value);
//     }
//   }

//   finishFunction(): void {
//     // Final form submission or navigation
//     console.log('All forms submitted');
//     console.log('Form 1:', this.validationForm1.value);
//     console.log('Form 2:', this.validationForm2.value);
//     console.log('Editors:', this.editorForm.value);
//   }
// }

