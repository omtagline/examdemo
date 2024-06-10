import { TeacherService } from './../../core/services/teacher/teacher.service';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { exhaustMap, fromEvent } from 'rxjs';

@Component({
  selector: 'app-confirmation-alert',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-alert.component.html',
  styleUrl: './confirmation-alert.component.scss',
})
export class ConfirmationAlertComponent {
  public modal = inject(NgbActiveModal);
  private teacherService = inject(TeacherService);
  private tost = inject(NgToastService);
  @ViewChild('delete') private deletBtn!: ElementRef;

  @Input() public id!: string;

  ngOnInit(): void {
    console.log(this.id);
  }

  public deleteRecord(): void {
    fromEvent(this.deletBtn.nativeElement, 'click')
      .pipe(exhaustMap((data) => this.teacherService.deleteExam(this.id)))

      .subscribe(
        (data) => {
          if (data.statusCode == 200) {
            this.tost.success('Deleted');
            this.teacherService.isDeleted.set(true);
            this.modal.close(this.id);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
