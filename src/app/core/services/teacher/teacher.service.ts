import { StudentDetailRes, StudentResData } from './../../../shared/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Response } from '../../../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private http = inject(HttpClient);
  private api = environment.apiHost + 'dashboard/Teachers/';

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

  public getAllExamDetails() {
    return this.http.get(this.api + 'viewExam');
  }
}
