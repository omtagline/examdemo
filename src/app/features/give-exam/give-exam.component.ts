import { LoaderComponent } from '../../shared/loader/loader.component';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { StudentService } from '../../core/services/student/student.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-give-exam',
  standalone: true,
  imports: [LoaderComponent, FormsModule],
  templateUrl: './give-exam.component.html',
  styleUrl: './give-exam.component.scss',
})
export class GiveExamComponent {
  private student = inject(StudentService);
  private router = inject(Router);

  @Input() id: any;

  public examData: any;
  public asnArr: any[] = [];

  public isLoading!: boolean;

  constructor() {
    this.isLoading = true;
  }

  public ngOnInit(): void {
    this.student.giveExam(this.id).subscribe((data) => {
      if (data.message == 'You can not give exam again') {
        alert('You can not give exam again');
        this.router.navigate(['/all-exams']);
      }
      this.examData = data;
      console.log(data);

      this.isLoading = false;
    });
  }

  public examSubmit($event: SubmitEvent, form: any) {
    $event.preventDefault();

    for (let key in form.value) {
      this.asnArr.push({ question: key, answer: form.value[key] });
    }
    console.log(this.asnArr);
  }
}
