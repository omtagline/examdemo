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
}

export type PassswordRes = Omit<CommonResData, 'role'>;

export interface singUpRes {
  email: string;
  password: string;
  name: string;
  role: string;
}

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
}
