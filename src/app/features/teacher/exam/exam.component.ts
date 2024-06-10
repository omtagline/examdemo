import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateExamComponent } from '../create-exam/create-exam.component';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { Component, SimpleChanges, effect, inject } from '@angular/core';
import { ViewExamRes } from '../../../shared/interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ConfirmationAlertComponent } from '../../../shared/confirmation-alert/confirmation-alert.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CreateExamComponent, RouterLink],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent {
  private teacherService = inject(TeacherService);
  private modal = inject(NgbModal);
  private router = inject(Router);

  public examData!: ViewExamRes[];

  ngOnInit(): void {
    this.getAllExamData();
  }

  // if () {
  //   console.log('"object" :>> ', 'object');
  //   this.getAllExamData();
  //   this.teacherService.isDeleted.set(!this.teacherService.isDeleted());
  // }

  private getAllExamData(): void {
    this.teacherService.getAllExamDetails().subscribe(
      (data) => {
        if (data.data.length < 0) {
          this.modal.open(CreateExamComponent);
        }
        this.examData = data.data;
        console.log(this.examData);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public openExam(): void {
    this.router.navigate(['/create-exam']);
  }

  public deleteRec(id: string): void {
    let alert = this.modal.open(ConfirmationAlertComponent);
    alert.componentInstance.id = id;
    alert.closed.subscribe((id) => {
      if (id) {
        let index = this.examData.findIndex((data) => data._id == id);
        this.examData.splice(index, 1);
      }
    });
  }

  public editRecord(id: string, name: string): void {
    this.router.navigate(['/update-exam', id], {
      queryParams: { subjectName: name },
    });
  }
}
