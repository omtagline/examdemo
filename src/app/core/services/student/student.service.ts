import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AllexamData } from '../../../inter';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  private api = 'https://examination.onrender.com/student/';

  public getAllExam(): Observable<AllexamData> {
    return this.http.get<AllexamData>(this.api + 'studentExam');
  }

  public giveExam(id: string): Observable<AllexamData> {
    return this.http.get<AllexamData>(this.api + `examPaper?id=${id}`);
  }
}
