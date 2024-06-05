import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CreateExamComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent {
  private teacherService = inject(TeacherService);
  private modal = inject(NgbModal);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllExamData();
  }
  private getAllExamData(): void {
    this.teacherService.getAllExamDetails().subscribe((data) => {
      console.log(data);
    });
  }
}
