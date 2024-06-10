import { RouterLink } from '@angular/router';
import { Response, StudentDetailRes } from '../../../shared/interface';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { Component, Input, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultdetailModalComponent } from '../../../shared/resultdetail-modal/resultdetail-modal.component';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent {
  private teacherService = inject(TeacherService);
  private modal = inject(NgbModal);

  @Input() private id!: string;

  public studentDetail!: Required<StudentDetailRes[]>;
  ngOnInit(): void {
    this.getStudentDetails();
  }

  private getStudentDetails(): void {
    this.teacherService.getStudentDetails(this.id).subscribe(
      (data) => {
        console.log('data.data :>> ', data);
        this.studentDetail = data.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public showResult(index: number): void {
    let result = this.modal.open(ResultdetailModalComponent);
    result.componentInstance.data =
      this.studentDetail[0].Result[index].studentAnswer;
  }
}
