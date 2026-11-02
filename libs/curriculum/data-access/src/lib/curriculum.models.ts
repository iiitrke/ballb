/** Broad grouping used to colour/badge subjects in the UI. */
export type SubjectCategory = 'Law' | 'Arts' | 'Language' | 'Clinical' | 'Elective';

/**
 * Where a subject's content comes from.
 * - `official`: transcribed from the Shakambhari University syllabus document.
 * - `sample`: illustrative placeholder content, to be replaced.
 */
export type ContentSource = 'official' | 'sample';

export interface StudyUnit {
  title: string;
  topics: string[];
}

export interface RecommendedBook {
  author: string;
  title: string;
}

/** One component of a paper's marking scheme (mainly for practical papers). */
export interface AssessmentComponent {
  component: string;
  marks: number;
  details: string;
}

export interface Subject {
  /**
   * Unique, URL-safe code used in /semesters/:semester/:code.
   * For official papers this is the university paper code, e.g. "1078204".
   */
  code: string;
  title: string;
  category: SubjectCategory;
  source: ContentSource;
  summary: string;
  /** Unit-wise outline. May be empty until syllabus content is added. */
  units: StudyUnit[];
  /** Paper number as printed in the syllabus, e.g. "Paper III". */
  paper?: string;
  /** True for optional papers, where students choose one paper for the same slot. */
  optional?: boolean;
  /** True for practical-training papers (moot court, internships, etc.). */
  practical?: boolean;
  credits?: number;
  maxMarks?: number;
  /** Key statutes / bare acts students should read alongside this subject. */
  statutes?: string[];
  books?: RecommendedBook[];
  assessment?: AssessmentComponent[];
  /** Clarification shown under the marking scheme table. */
  assessmentNote?: string;
}

export interface Semester {
  /** 1–10 for the five-year integrated BA.LLB programme. */
  number: number;
  /** Academic year of study, 1–5. */
  year: number;
  /** Optional notice shown at the top of the semester page. */
  note?: string;
  subjects: Subject[];
}

export interface StudyYear {
  year: number;
  semesters: Semester[];
}
