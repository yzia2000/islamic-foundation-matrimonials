import { IslamicSchool } from './religion';
export enum Gender {
  male,
  female,
  other
}

export interface User {
  id?: number;
  handle: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  gender?: Gender;
  description?: string;
  school_of_thought?: IslamicSchool
}
