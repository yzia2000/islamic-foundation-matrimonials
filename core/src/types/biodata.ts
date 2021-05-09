import { Education } from './education';
import { Employment } from './employment';
import { Religion } from './religion';

export interface BioData {
  gender: boolean;
  educationHistory: Education[];
  employmentHistroy: Employment[];
  religion: Religion;
  description: string
}
