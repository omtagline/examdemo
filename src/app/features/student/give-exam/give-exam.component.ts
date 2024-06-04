import { Component, Input, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pluck } from 'rxjs';
import { StudentService } from '../../../core/services/student/student.service';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { Allexams, GetExamRes } from '../../../shared/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-give-exam',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './give-exam.component.html',
  styleUrl: './give-exam.component.scss',
})
export class GiveExamComponent {
  private student = inject(StudentService);
  private router = inject(Router);
  private modal = inject(NgbModal);
  private fb = inject(FormBuilder);

  @Input() public id!: string;

  public examFormGroup!: FormGroup;

  public examData!: GetExamRes[];
  // public answerArray: any[] = [];

  public isLoading!: boolean;

  public ngOnInit(): void {
    this.createForm();
    this.getExamPaper();
  }

  private createForm(): void {
    this.examFormGroup = this.fb.group({
      answerArray: this.fb.array([]),
    });
  }

  public getExamPaper(): void {
    this.student.getExamPaper(this.id).subscribe((data) => {
      console.log(data);
      if (data.message == 'You can not give exam again') {
        alert('You can not give exam again');
        this.router.navigate(['/all-exams']);
      }
      this.examData = data.data;

      this.examData.forEach((p: GetExamRes) => {
        (this.examFormGroup.get('answerArray') as FormArray).push(
          this.FormArrayCreate(p)
        );
      });
    });
  }

  private FormArrayCreate(p: GetExamRes): FormControl {
    return this.fb.control({
      question: p._id,
      answer: '',
    });
  }

  public examSubmit($event: SubmitEvent, form: string): void {
    console.log('this.examFormGrop :>> ', this.examFormGroup.value);
    $event.preventDefault();

    // for (let key in form.value) {
    //   this.answerArray.push({ question: key, answer: form.value[key] });
    // }

    // this.student
    //   .submitPaper(this.answerArray, this.id)
    //   .pipe(pluck('message'))
    //   .subscribe((data) => {
    //     if (data == 'Exam finish') {
    //       this.isLoading = false;
    //       let alertRef = this.modal.open(AlertComponent);
    //       alertRef.componentInstance.message = 'Exam Finished';

    //       this.router.navigate(['/all-exams']);
    //     }
    //   });
  }

  public get getAnswerArray(): FormArray {
    return (<FormArray>this.examFormGroup.get('answerArray')) as FormArray;
  }
}
