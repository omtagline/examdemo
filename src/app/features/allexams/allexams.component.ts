import { Component, inject } from '@angular/core';
import { StudentService } from '../../core/services/student/student.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamModalComponent } from '../../shared/exam-modal/exam-modal.component';
import { AllexamData, Allexams } from '../../inter';

@Component({
  selector: 'app-allexams',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './allexams.component.html',
  styleUrl: './allexams.component.scss',
})
export class AllexamsComponent {
  private modal = inject(NgbModal);
  private student = inject(StudentService);

  public examData!: Allexams[];

  public loading!: boolean;

  constructor() {
    this.loading = true;
    this.student.getAllExam().subscribe((data) => {
      console.log(data.data);
      this.loading = false;
      this.examData = data.data;
    });
  }

  public openModal(data: Allexams) {
    let ref = this.modal.open(ExamModalComponent);
    ref.componentInstance.data = data;
  }
}
