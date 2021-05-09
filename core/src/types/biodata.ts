import { Education } from './education';
import { Employment } from './employment';

export default interface BioData {
  gender: boolean;
  educationHistory: Education[];
  employmentHistroy: Employment[];
}
