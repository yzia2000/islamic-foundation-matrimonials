import { Education } from './education';
import { Employment } from './employment';
import { IslamicSchool } from './religion';
import { Gender } from './user';

export interface BioData {
  gender?: Gender;
  educationHistory: Education[];
  employmentHistory: Employment[];
  religion: IslamicSchool;
  description: string
}
