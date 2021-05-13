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
  minor?: string;
  subjects?: string[];
  awards?: string[];
  from_date?: Date;
  to_date?: Date;
}
