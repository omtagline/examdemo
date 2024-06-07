import {
  Exam,
  StudentDetailRes,
  StudentResData,
  ViewExamRes,
} from './../../../shared/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private http = inject(HttpClient);
  private api = environment.apiHost + 'dashboard/Teachers/';

  public isDeleted = signal(false);

  public getAllStudent(): Observable<Required<Response<StudentResData[]>>> {
    return this.http.get<Required<Response<StudentResData[]>>>(this.api);
  }

  public getVarifiedStudent(): Observable<
    Required<Response<StudentResData[]>>
  > {
    return this.http.get<Required<Response<StudentResData[]>>>(
      this.api + 'StudentForExam'
    );
  }

  public getStudentDetails(
    id: string
  ): Observable<Response<Required<StudentDetailRes[]>>> {
    return this.http.get<Response<Required<StudentDetailRes[]>>>(
      this.api + `viewStudentDetail?id=${id}`
    );
  }

  public getAllExamDetails(): Observable<Response<Required<ViewExamRes[]>>> {
    return this.http.get<Response<Required<ViewExamRes[]>>>(
      this.api + 'viewExam'
    );
  }

  public getExamDetails(id: string): Observable<Response<Exam[]>> {
    return this.http.get<Response<Exam[]>>(this.api + `examDetail?id=${id}`);
  }

  public createExam(value: Exam): Observable<Response<Required<Exam[]>>> {
    return this.http.post<Response<Required<Exam[]>>>(this.api + 'Exam', value);
  }

  public deleteExam(id: string): Observable<Response<null>> {
    return this.http.delete<Response<null>>(this.api + `deleteExam?id=${id}`);
  }

  public updateExam(
    id: string,
    data: Response<Required<Exam[]>>
  ): Observable<Response<Exam[]>> {
    return this.http.put<Response<Exam[]>>(
      this.api + `editExam?id=${id}`,
      data
    );
  }
}
