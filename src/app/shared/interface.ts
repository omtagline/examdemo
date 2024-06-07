export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  count?: number;
}

export interface Allexams {
  _id: string;
  notes: string[];
  subjectName: string;
  email: string;
  Result: ResultData[];
}

interface ResultData {
  _id: string;
  rank: number;
  subjectName: string;
  score: number;
  resultStatus: string;
}

export type AllexamData = {
  statusCode: number;
  message: string;
  data: Allexams[];
  userId?: string;
};

export interface CommonResData {
  token: string;
  name: string;
  email: string;
  role: string;
  password?: string;
  _id?: string;
}

export type PassswordRes = Omit<CommonResData, 'role'>;

export type singUpRes = Required<Omit<CommonResData, 'token' | '_id'>>;

export type GetExamRes = {
  options: string[];
  _id: string;
  question: string;
};

export interface StudentResData {
  email: string;
  name: string;
  status: String;
  _id: String;
  Result?: Result[];
}

export type StudentDetailRes = Required<Omit<StudentResData, 'status'>>;

export interface Result {
  _id: string;
  studentAnswer: Required<StudentAnswer[]>;
  rank: number;
  subjectName: string;
  score: number;
  studentId: string;
  resultStatus: string;
  __v: number;
}

export interface StudentAnswer {
  question: string;
  answer: string;
  option: string[];
}

export type Exam = {
  subjectname?: string;
  questions: Required<StudentAnswer>;
  notes?: string[];
  status?: string;
  _id?: string;
  email?: string;
  __v?: number;
  subjectName?: string;
};

export type ViewExamRes = Required<
  Omit<Exam, 'questions' | 'status' | 'subjectname'>
>;
