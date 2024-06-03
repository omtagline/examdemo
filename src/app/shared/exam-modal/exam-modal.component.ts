import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../core/services/student/student.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { exhaustMap, fromEvent, pipe } from 'rxjs';
import { Allexams } from '../../inter';

@Component({
  selector: 'app-exam-modal',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss',
})
export class ExamModalComponent {
  private active = inject(NgbActiveModal);
  private student = inject(StudentService);

  private router = inject(Router);

  public isLoading: boolean = false;

  @ViewChild('giveexam') giveexam!: ElementRef;

  @Input() data!: Allexams;

  giveExam(id: string) {
    this.router.navigate(['/give-exam', id]);
    this.active.close();
  }
}
