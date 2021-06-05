import { Education } from './education';
import { Employment } from './employment';
import { IslamicSchools } from './religion';
import { Gender } from './user';

export interface Contact {
  country: string;
  state: string;
  city: string;
  address?: string;
  phone?: string;
}

export interface BioData {
  id?: number
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  educationHistory: Education[];
  employmentHistory: Employment[];
  religion: IslamicSchools;
  description: string;
  contact?: Contact;
}
