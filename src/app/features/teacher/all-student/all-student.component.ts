import { StudentResData } from './../../../shared/interface';
import { CommonModule } from '@angular/common';

import { TeacherService } from './../../../core/services/teacher/teacher.service';
import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  viewChild,
} from '@angular/core';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  pluck,
  switchMap,
} from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-student',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './all-student.component.html',
  styleUrl: './all-student.component.scss',
})
export class AllStudentComponent {
  private teacherService = inject(TeacherService);

  @ViewChild('search') private search!: ElementRef;
  @ViewChild('filter') private filter!: ElementRef;

  public studentData!: StudentResData[];
  public filtredData!: StudentResData[];

  ngOnInit(): void {
    this.getStudentData();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // fromEvent(this.search.nativeElement, 'keyup')
    //   .pipe(pluck('target', 'value'), debounceTime(500), distinctUntilChanged())
    //   .subscribe((data: any) => {
    //     this.filtredData = this.studentData.pipe(
    //       map((i) => {
    //         return i.filter((res) => {
    //           res.name.includes(data);
    //         });
    //       })
    //     );
    //     //  this.filtredData=
    //     // this.filtredData.push(data);
    //   });
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(pluck('target', 'value'))
      .subscribe(
        (data: any) => {
          this.filtredData = this.studentData.filter((res) =>
            res.name.toLowerCase().includes(data)
          );
        },
        (err) => {
          console.log(err);
        }
      );
    this.activeStatusFilter();
  }

  public focus(): void {
    this.search.nativeElement.focus();
  }
  private activeStatusFilter(): void {
    fromEvent(this.filter.nativeElement, 'change')
      .pipe(pluck('target', 'value'))
      .subscribe((data) => {
        if (data == 'verified') {
          this.teacherService
            .getVarifiedStudent()
            .pipe(pluck('data'))
            .subscribe(
              (data) => {
                this.filtredData = data;
              },
              (err) => {
                console.log(err);
              }
            );
        } else {
          this.filtredData = this.studentData;
        }
      });
  }

  private getStudentData(): void {
    this.teacherService
      .getAllStudent()
      .pipe(pluck('data'))
      .subscribe(
        (data) => {
          this.studentData = data;
          this.filtredData = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
