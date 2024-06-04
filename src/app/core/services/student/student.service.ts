import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AllexamData,
  CommonResData,
  GetExamRes,
  Response,
} from '../../../shared/interface';

type submitPaperData = { subjectName: string; answer: string };

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  private api = 'https://examination.onrender.com/student/';

  public getAllExam(): Observable<AllexamData> {
    return this.http.get<AllexamData>(this.api + 'studentExam');
  }

  public getExamPaper(id: string): Observable<Response<GetExamRes[]>> {
    return this.http.get<Response<GetExamRes[]>>(
      this.api + `examPaper?id=${id}`
    );
  }

  public submitPaper(
    data: submitPaperData[],
    id: string
  ): Observable<Response<null>> {
    return this.http.post<Response<null>>(this.api + `giveExam?id=${id}`, data);
  }

  public getProfile(): Observable<Response<CommonResData>> {
    return this.http.get<Response<CommonResData>>(
      this.api + 'getStudentDetail'
    );
  }

  public UpdateProfile(data: {
    name: string;
  }): Observable<Response<CommonResData>> {
    return this.http.put<Response<CommonResData>>(
      this.api + 'studentProfile',
      data
    );
  }
}
