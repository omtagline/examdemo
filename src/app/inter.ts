export interface Login {
  statusCode: number;
  message: string;
  data: LoginData;
}
interface LoginData {
  token: string;
  name: string;
  email: string;
  role: string;
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

interface LoginData {
  token: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginRes {
  statusCode: number;
  message: string;
  data: LoginData;
}


export interface  singUpRes{
email:string,
password:string,
name:string,
role:string
}

