import { Component, inject } from '@angular/core';
import { StudentService } from '../../../core/services/student/student.service';

import { AsyncPipe } from '@angular/common';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ExamModalComponent } from '../../../shared/exam-modal/exam-modal.component';
import { Allexams } from '../../../shared/interface';

@Component({
  selector: 'app-allexams',
  standalone: true,
  imports: [NgbPagination, AsyncPipe],
  templateUrl: './allexams.component.html',
  styleUrl: './allexams.component.scss',
})
export class AllexamsComponent {
  private modal = inject(NgbModal);
  private student = inject(StudentService);

  public examData!: Allexams[];

  public loading!: boolean;

  public page: number = 0;
  public data$ = this.student.getAllExam();

  ngOnInit(): void {
    // this.giveAllexam();
  }

  private giveAllexam(): void {
    this.loading = true;
    this.student.getAllExam().subscribe((data) => {
      this.loading = false;
      this.examData = data.data;
    });
  }

  public openModal(data: Allexams): void {
    let ref = this.modal.open(ExamModalComponent);
    ref.componentInstance.data = data;
  }
}
