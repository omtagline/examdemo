export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
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
