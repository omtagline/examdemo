import { TeacherService } from './../../core/services/teacher/teacher.service';
import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';

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

  @Input() public id!: string;

  ngOnInit(): void {
    console.log(this.id);
  }

  public deleteRecord(): void {
    this.teacherService.deleteExam(this.id).subscribe((data) => {
      if (data.statusCode == 200) {
        this.tost.success('Deleted');
        this.teacherService.isDeleted.set(true);
        this.modal.close(this.id);
      }
    });
  }
}
