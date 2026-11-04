import { Subject } from './curriculum.models';

/**
 * OFFICIAL SYLLABUS CONTENT — Shakambhari University, BA.LLB.
 *
 * Transcribed from the scanned syllabus pages (paper codes 1078204, 1078205,
 * 1078206, 1078280). Wording follows the printed syllabus; only obvious
 * spelling slips were corrected. The semester these papers belong to is not
 * printed on the pages and must be confirmed.
 */

/** Paper III (optional) — Paper Code 1078204. */
export const PAPER_1078204: Subject = {
  code: '1078204',
  paper: 'Paper III',
  title: 'Law of Trust, Equity and Fiduciary Relation',
  category: 'Elective',
  source: 'official',
  optional: true,
  summary:
    'History, nature and principles of Equity; emergence of the law of trust from Equity; the making of the Indian Law of Trust and provisions of the law of Trust; Religious Trusts; principles of Equity and equitable remedies; equitable relief in different branches of law with special reference to property law.',
  units: [
    {
      title: 'Equity',
      topics: [
        'Nature of Equity',
        'History of Courts of Equity',
        'Relations of law of Equity',
        'The maxims of equity',
        'Different equitable remedies',
      ],
    },
    {
      title: 'Trust & Fiduciary Relations',
      topics: [
        'Essentials of Trust',
        'Fiduciary relationship — concept, kinds vis-à-vis Trusteeship',
        'Trust and contract, power, condition, charge and personal obligations — distinguished',
        'Classification of Trust and its importance',
        'Private Trusts',
        'Public Trusts',
        'Appointment, retirement and removal of Trustee',
        'Rights, powers, discretion and control of Trustees',
        'Duties of trustee in relation to (i) trust property and (ii) beneficiary',
        'The administration of Trust',
        'Liability for breach of Trust',
        'Rights and remedies of the beneficiary',
        'Constructive Trusts',
      ],
    },
  ],
  books: [
    { author: 'Ahmad Aquil', title: 'Equity, Trusts and Specific Relief' },
    { author: 'Desai S.T.', title: 'Equity, Trusts and Specific Relief' },
    { author: 'Hanbury & Maudsley', title: 'Modern Equity' },
    { author: 'Jhabvala N.H.', title: 'Elements of Equity, Trusts and Specific Relief' },
    { author: 'Rao G.C.V. Subba', title: 'Equity, Trust and Fiduciary Relation' },
    { author: 'Singh G.P.', title: 'Principles of Equity' },
    { author: 'Snell', title: 'Principles of Equity' },
    { author: 'Tondon M.P.', title: 'Principles of Equity and Trusts' },
  ],
};

/** Paper IV (optional) — Paper Code 1078205. */
export const PAPER_1078205: Subject = {
  code: '1078205',
  paper: 'Paper IV',
  title: 'Law Relating to Right to Information',
  category: 'Elective',
  source: 'official',
  optional: true,
  summary:
    'Concept, history and basic elements of the right to information, the Right to Information Act, 2005, and the judiciary’s role in developing the right.',
  statutes: ['Right to Information Act, 2005', 'Constitution of India (Article 12)'],
  units: [
    {
      title: 'Concept of the Right to Information',
      topics: [
        'Meaning and scope of Right to Information',
        'Historical background: Indian perspective, global perspective',
        'Media access to official information',
        'Right to Information and human rights violations',
        'Right to Information different from right to obtain information',
        'Basic elements of Right to Information law',
        'Factors restricting free flow of information',
      ],
    },
    {
      title: 'The Right to Information Act, 2005',
      topics: [
        'Preliminary (Sections 1 to 2)',
        'Right to Information and obligations of public authorities (Sections 3 to 11)',
        'The Central Information Commission (Sections 12 to 14)',
        'The State Information Commission (Sections 15 to 17)',
        'Powers & functions of the Information Commission, appeals & penalties (Sections 18 to 20)',
        'Miscellaneous (Sections 21 to 31)',
      ],
    },
    {
      title: 'Judiciary on Right to Information',
      topics: [
        'Free flow of information for public record',
        'Right to information: Fundamental Right',
        'Disclosure of information',
        'Right to know',
        'Right to acquire & disseminate information',
        'Direction on voter’s right to information',
        'Right to information and community participation',
        'Third party information',
        'Public authority under Article 12 of the Indian Constitution',
      ],
    },
  ],
  books: [
    { author: 'Das P.K.', title: 'The Right to Information Act' },
    { author: 'Jain N.K.', title: 'Right to Information: Concept, Law and Practice' },
    {
      author: 'Khandelwal Dheera & Khandelwal Krishna K.',
      title: 'The Right to Information Act, 2005',
    },
    { author: 'Niraj Kumar (Dr.)', title: 'Treatise on Right to Information Act, 2005' },
  ],
};

/** Paper IV (optional) — Paper Code 1078206. */
export const PAPER_1078206: Subject = {
  code: '1078206',
  paper: 'Paper IV',
  title: 'Information Technology and Cyber Laws',
  category: 'Elective',
  source: 'official',
  optional: true,
  summary:
    'Technology and law, electronic contracts, intellectual property in cyberspace, the Information Technology Act, 2000, cyber crimes and internet governance.',
  statutes: ['Information Technology Act, 2000'],
  units: [
    {
      title: 'Introduction',
      topics: [
        'Basic concept of technology and law: understanding the technology, scope of cyber laws, cyber jurisprudence',
        'Understanding electronic contracts: the Indian law of contract, types of electronic contracts, construction of electronic contracts',
      ],
    },
    {
      title: 'IPR in Cyber Space',
      topics: [
        'Copyright in information technology: copyright in internet, software piracy, multimedia and copyright issues',
        'Patents: Indian position on computer-related patents, international context of patents',
        'Trademarks: trade mark law in India, infringement and passing off',
      ],
    },
    {
      title: 'Information Technology Act, 2000',
      topics: [
        'Digital signature',
        'E-governance',
        'Regulation of certifying authorities',
        'Duties of subscribers',
        'Penalties and adjudication',
        'Offences under the Act',
        'Making of rules and regulations',
      ],
    },
    {
      title: 'Cyber Crimes',
      topics: [
        'Understanding cyber crimes: crime in context of internet, types of crime in internet',
        'Indian penal law & cyber crimes: fraud, hacking, mischief, trespass, defamation, stalking, spam',
        'Issues of internet governance: freedom of expression in internet, issues of censorship, hate speech, sedition, libel, subversion, privacy issues, international position on free speech in internet',
      ],
    },
  ],
  books: [
    { author: 'Gerald R. Ferrera', title: 'Cyber Law (Text & Cases)' },
    { author: 'Prof. S.R. Bhansali', title: 'Information Technology Act' },
    { author: 'Rodney D. Ryder', title: 'Guide to Cyber Law' },
    { author: 'Vakul Sharma', title: 'Cyber Crime' },
  ],
};

/** Paper V (practical training) — Paper Code 1078280. */
export const PAPER_1078280: Subject = {
  code: '1078280',
  paper: 'Paper V',
  title: 'Moot Court, Pre-Trial Preparations and Participation in Trial Proceedings',
  category: 'Clinical',
  source: 'official',
  practical: true,
  maxMarks: 100,
  summary:
    'Practical training paper covering moot courts, observation of civil and criminal trials, client interviewing, pre-trial preparation, and a final viva-voce.',
  units: [
    {
      title: '(A) Moot Court',
      topics: [
        'Each student does at least two moot courts in the semester on an assigned problem',
        'Groups of 8–10 students; cases involving several issues are assigned, drawing on court practice and paper books of decided cases',
        'Emphasis on court craft and decorum',
        'Dress code: male students — white pant-shirt and black tie; female students — white dress with black scarf (for moot courts and court / chamber visits)',
        'Practice moots are held routinely in class; three compulsory test moots are held near the end of the semester term',
        'Each student keeps a regular record of preparation for every moot court in the Sessional Diary',
      ],
    },
    {
      title: '(B) Court Assignments',
      topics: [
        'Observation of trial in four cases: two civil and two criminal',
        'Attend four trial courts during the semester term',
        'Record visits and the various steps observed in the Diary of Sessional Work',
      ],
    },
    {
      title: '(C) Interviewing Techniques and Pre-Trial Preparation',
      topics: [
        'Observe client interviewing sessions at a lawyer’s office / Legal Aid office and record them in the Diary of Sessional Work',
        'Observe the advocate’s preparation of documents and court papers, and the procedure for filing a suit / petition',
        'Exposure to civil, criminal, revenue and labour court practice, supervised by the subject teacher / tutor',
        'Academic visits to family court, revenue court, income tax & sales tax offices and other venues of judicial / administrative proceedings',
        'Visits may also include the Indian Law Institute, Parliament, Supreme Court, High Courts and tribunals',
      ],
    },
    {
      title: '(D) Viva-voce',
      topics: [
        'Viva-voce examination on the above three aspects by a Board of Practical / Viva-voce Examiners (internal & external)',
      ],
    },
  ],
  assessment: [
    {
      component: 'Moot Court (each)',
      marks: 10,
      details:
        'At least two moot courts in the semester, 10 marks each: 5 marks for written submissions (recorded in the Sessional Diary) and 5 marks for oral advocacy.',
    },
    {
      component: 'Sessional Diary (Moot Court)',
      marks: 15,
      details: '5 marks for each of the three test moots.',
    },
    {
      component: 'Court Assignments',
      marks: 25,
      details: 'Observation of four trials (two civil, two criminal) recorded in the diary.',
    },
    {
      component: 'Client Interviewing',
      marks: 10,
      details: 'Observation of client interviewing sessions recorded in the diary.',
    },
    {
      component: 'Pre-Trial Preparation',
      marks: 10,
      details: 'Observation of document preparation and filing procedure recorded in the diary.',
    },
    {
      component: 'Viva-voce',
      marks: 10,
      details: 'Conducted by internal and external examiners.',
    },
  ],
  assessmentNote:
    'Marks are shown as printed in the syllabus. Moot Court marks are awarded per moot court, so the rows above do not add up directly to the 100-mark maximum. Check the exact split with your faculty.',
  books: [
    {
      author: 'Rai Kailash (Dr.)',
      title: 'Moot Court, Pre-Trial Preparations & Participation in Trial Proceedings',
    },
    { author: 'Awasthi S.K. (Prof.)', title: 'Practical Training of Law, Moot Court & Viva-Voce' },
    {
      author: 'Myneni S.R.',
      title: 'Moot Court, Pre-Trial Preparations & Participation in Trial Proceedings',
    },
    {
      author: 'Sirohi J.P.S., Sirohi Sunil',
      title: 'Moot Court, Pre-Trial Preparations & Participation in Trial Proceedings',
    },
  ],
};

export const OFFICIAL_PAPERS: Subject[] = [
  PAPER_1078204,
  PAPER_1078205,
  PAPER_1078206,
  PAPER_1078280,
];
