/** Broad grouping used to colour/badge subjects in the UI. */
export type SubjectCategory = 'Law' | 'Arts' | 'Language' | 'Clinical' | 'Elective';

export interface StudyUnit {
  title: string;
  topics: string[];
}

export interface Subject {
  /** Unique, URL-safe code, e.g. "BL-101". Used in /semesters/:semester/:code. */
  code: string;
  title: string;
  category: SubjectCategory;
  credits: number;
  summary: string;
  /** Unit-wise outline. May be empty until syllabus content is added. */
  units: StudyUnit[];
  /** Key statutes / bare acts students should read alongside this subject. */
  statutes?: string[];
}

export interface Semester {
  /** 1–10 for the five-year integrated BA.LLB programme. */
  number: number;
  /** Academic year of study, 1–5. */
  year: number;
  subjects: Subject[];
}

export interface StudyYear {
  year: number;
  semesters: Semester[];
}
