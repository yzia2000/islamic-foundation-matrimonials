enum EducationLevel {
  Primary,
  Secondary,
  Undergraduate,
  Postgraduate
}

export interface Education {
  level: EducationLevel;
  institution: string;
  major?: string;
  subjects?: string[];
  awards?: string[];
  extraCurriculur?: string[];
  toPostgres (prepareValue: (value: any) => any): any;
}
