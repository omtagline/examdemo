import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { Component, Input, inject } from '@angular/core';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { CharTostrPipe } from '../../../core/pipes/char-tostr.pipe';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [ReactiveFormsModule, NgToastModule, CharTostrPipe, CommonModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss',
})
export class CreateExamComponent {
  private teacherService = inject(TeacherService);
  private fb = inject(FormBuilder);
  private tost = inject(NgToastService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);

  public examForm!: FormGroup;

  @Input() public id!: string;

  ngOnInit(): void {
    this.createForm(this.controlCreator());
    console.log('this.id :>> ', this.id);

    if (this.id) {
      let subjectname =
        this.activeRouter.snapshot.queryParamMap.get('subjectName') || '';

      this.fillExamData(subjectname);
      console.log('object :>> ', this.activeRouter.snapshot.queryParams);
    }
  }

  ngAfterViewInit(): void {
    console.log('object :>> ', this.getQuestionArray.controls[0]);
  }

  private fillExamData(subjectName: string): void {
    let i = 1;
    while (i < 15) {
      this.add(i);
      i++;
    }
    this.teacherService.getExamDetails(this.id).subscribe(
      (data) => {
        this.examForm.patchValue({ ...data.data, subjectName: subjectName });
        console.log(this.examForm.value);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private createForm(val: FormGroup): void {
    this.examForm = this.fb.group({
      subjectName: ['', [Validators.required]],
      questions: this.fb.array([val]),
      notes: this.fb.array([['', Validators.required]]),
    });
  }

  private controlCreator(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      options: this.fb.array([
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required],
      ]),
    });
  }

  public add(i: number): void {
    if (!this.id) {
      console.log('object :>> ', this.getQuestionArray.controls[i].value);
      if (this.getQuestionArray.controls[i].invalid && !this.id) {
        this.getQuestionArray.controls[i].markAllAsTouched();
        return;
      }
    }
    if (this.getQuestionArray.length < 15)
      this.getQuestionArray.push(this.controlCreator());
  }
  public remove(index: number): void {
    this.getQuestionArray.removeAt(index);
  }

  public get getQuestionArray(): any {
    return this.examForm.get('questions') as FormArray;
  }

  get getNotesArray(): FormArray {
    return <FormArray>this.examForm.get('notes');
  }
  public addNotes(): void {
    this.getNotesArray.push(this.fb.control(''));
  }

  public removeNotes(index: number): void {
    this.getNotesArray.removeAt(index);
  }

  public examFormSubmit(): void {
    if (this.getQuestionArray.controls.length !== 15) {
      this.tost.danger('Qestion Should Be 15', '', 5000);
    } else {
      let service: Observable<any>;
      let examData = this.examForm.value;
      service = this.id
        ? this.teacherService.updateExam(this.id, examData)
        : this.teacherService.createExam(examData);

      service.subscribe({
        next: (data) => {
          if (data.statusCode == 200) {
            this.tost.success('Exam Detail Updated', '', 3000);
            setTimeout(() => {
              this.router.navigate(['exams']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // public radioChange(option: number, question: number) {
  //   let questionArray = this.getQuestionArray.controls;
  //   questionArray[question]
  //     .get('answer')
  //     ?.patchValue(questionArray[question].controls[option].value);
  // }
  public getOptionArray(index: number): FormArray {
    return <FormArray>this.getQuestionArray.controls[index]?.get('options');
  }
  public radioChange(option: number, question: number) {
    let arrControl = this.getQuestionArray.controls[question];
    arrControl
      .get('answer')
      ?.patchValue(this.getOptionArray(question).controls[option].value);
  }
}
