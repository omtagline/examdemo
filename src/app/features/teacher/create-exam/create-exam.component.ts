import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.scss',
})
export class CreateExamComponent {
  private teacherService = inject(TeacherService);
  private fb = inject(FormBuilder);

  public ExamForm!: FormGroup;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createForm(this.controlCreator());
  }

  private createForm(val: FormGroup): void {
    this.ExamForm = this.fb.group({
      subjectName: ['', [Validators.required]],
      question: this.fb.array([val]),
    });
  }

  private controlCreator(): FormGroup {
    return this.fb.group({
      question: ['', [Validators.required]],
      answer: ['', Validators.required],
      options: this.fb.array(['', '', '', '']),
      notes: this.fb.array(['', '']),
    });
  }

  public add(): void {
    this.getQuestionArray.push(this.controlCreator());
  }

  public get getQuestionArray(): FormArray {
    return (<FormArray>this.ExamForm.get('question')) as FormArray;
  }

  public getOptionArray(index: number): FormArray {
    return <FormArray>this.getQuestionArray.controls[index]?.get('options');
  }

  public getNotesArray(index: number): FormArray {
    return <FormArray>this.getQuestionArray.controls[index]?.get('notes');
  }
}
