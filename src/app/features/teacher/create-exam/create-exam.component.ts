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

      this.getExamData(subjectname);
      console.log('object :>> ', this.activeRouter.snapshot.queryParams);
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('object :>> ', this.getQuestionArray.controls[0]  );
  }
  private getExamData(subjectName: string): void {
    this.teacherService.getExamDetails(this.id).subscribe((data) => {
      this.examForm.patchValue({ ...data.data, subjectName: subjectName });
      console.log(this.examForm.value);
    });
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
      answer: ['', Validators.required],
      options: this.fb.array([
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required],
        ['', Validators.required],
      ]),
    });
  }

  public add(): void {
    if (this.examForm.invalid) {
      this.examForm.get('question')?.markAsTouched();
      return;
    }
    if (this.getQuestionArray.length < 15)
      this.getQuestionArray.push(this.controlCreator());
  }
  public remove(index: number): void {
    this.getQuestionArray.removeAt(index);
  }

  public get getQuestionArray() {
    return this.examForm.get('questions') as FormArray;
  }

  public getOptionArray(index: number): FormArray {
    console.log('object :>> ', this.getQuestionArray);
    return <FormArray>this.getQuestionArray.controls[index]?.get('options');
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
    console.log('object :>> ', this.examForm.value);
    if (this.getQuestionArray.controls.length !== 15) {
      this.tost.danger('Qestion Should Be 15', '', 5000);
    } else {
      this.teacherService.createExam(this.examForm.value).subscribe((data) => {
        if (data.statusCode == 200) {
          this.tost.success('Exam Created', '', 5000);
          setTimeout(() => {
            this.router.navigate(['exams']);
          }, 400);
        } else if (data.statusCode == 500) {
          this.tost.warning('Exam Alredy Created', '', 5000);
        }
      });
    }
  }
  public examUpdate(): void {
    this.teacherService.updateExam(this.id, this.examForm.value).subscribe(
      (data) => {
        console.log('data :>> ', data);
        if (data.statusCode == 200) {
          this.tost.success('Exam Detail Updated', '', 3000);
          setTimeout(() => {
            this.router.navigate(['exams']);
          }, 3000);
        }
      },
      (er) => {
        console.log(er);
      }
    );
  }

  public radioChange(option: number, question: number) {
    let arrControl = this.getQuestionArray.controls[question];
    arrControl
      .get('answer')
      ?.patchValue(this.getOptionArray(question).controls[option].value);
  }
}
