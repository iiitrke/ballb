import { Semester } from './curriculum.models';
import { OFFICIAL_PAPERS } from './official-papers.data';

/**
 * CURRICULUM DATA.
 *
 * Semesters 1–9 are SAMPLE PLACEHOLDER DATA (source: 'sample'). Official
 * syllabus papers (source: 'official') live in official-papers.data.ts.
 *
 * The sample entries are an illustrative BA.LLB structure based on subjects
 * commonly taught in five-year integrated law programmes in India. They are NOT
 * the official Shakambhari University syllabus. Replace them with official
 * papers (see official-papers.data.ts) as syllabus pages become available.
 */
export const CURRICULUM: Semester[] = [
  {
    number: 1,
    year: 1,
    subjects: [
      {
        code: 'BL-101',
        title: 'General English I',
        category: 'Language',
        source: 'sample',
        credits: 4,
        summary:
          'Grammar, comprehension and writing skills with an introduction to legal language.',
        units: [
          {
            title: 'Tenses',
            topics: [
              {
                en: 'Tense expresses the time of an action (past, present, future) and its aspect (simple, continuous, perfect, perfect continuous), giving 12 forms in all.',
                hi: 'काल (Tense) किसी क्रिया का समय (भूत, वर्तमान, भविष्य) और उसकी अवस्था (सामान्य, अपूर्ण, पूर्ण, पूर्ण-निरंतर) बताता है, जिससे कुल 12 रूप बनते हैं।',
              },
              {
                en: 'Present Simple — habits, general truths and fixed facts: "The court sits at 10 a.m."',
                hi: 'सामान्य वर्तमान काल (Present Simple) — आदतें, सामान्य सत्य और निश्चित तथ्य: "न्यायालय सुबह 10 बजे बैठता है।"',
              },
              {
                en: 'Present Continuous (am/is/are + -ing) — actions happening now or around now: "The counsel is arguing the appeal."',
                hi: 'अपूर्ण वर्तमान काल (am/is/are + -ing) — अभी या इन्हीं दिनों हो रही क्रिया: "अधिवक्ता अपील पर बहस कर रहे हैं।"',
              },
              {
                en: 'Present Perfect (have/has + past participle) — past action with present relevance; the result matters more than the time: "Parliament has passed the Bill."',
                hi: 'पूर्ण वर्तमान काल (have/has + past participle) — भूतकाल की क्रिया जिसका वर्तमान से संबंध हो; समय से अधिक परिणाम महत्वपूर्ण: "संसद ने विधेयक पारित कर दिया है।"',
              },
              {
                en: 'Present Perfect Continuous (have/has been + -ing) — action that began in the past and still continues: "She has been practising law for ten years."',
                hi: 'पूर्ण-निरंतर वर्तमान काल (have/has been + -ing) — जो क्रिया भूतकाल में शुरू हुई और अब भी जारी है: "वह दस वर्षों से वकालत कर रही हैं।"',
              },
              {
                en: 'Past Simple — a completed action at a definite past time: "The judge delivered the verdict yesterday."',
                hi: 'सामान्य भूतकाल (Past Simple) — किसी निश्चित भूत समय में पूरी हुई क्रिया: "न्यायाधीश ने कल निर्णय सुनाया।"',
              },
              {
                en: 'Past Continuous (was/were + -ing) — an action in progress at a past moment, often interrupted: "He was drafting the petition when the clerk called."',
                hi: 'अपूर्ण भूतकाल (was/were + -ing) — भूतकाल के किसी क्षण में चल रही क्रिया, जो प्रायः बीच में रुक जाती है: "जब क्लर्क ने बुलाया तब वह याचिका का प्रारूप बना रहे थे।"',
              },
              {
                en: 'Past Perfect (had + past participle) — the earlier of two past actions: "The witness had left before the trial resumed."',
                hi: 'पूर्ण भूतकाल (had + past participle) — दो भूत क्रियाओं में पहले होने वाली: "सुनवाई पुनः आरंभ होने से पहले गवाह जा चुका था।"',
              },
              {
                en: 'Past Perfect Continuous (had been + -ing) — duration of an action up to a point in the past: "They had been waiting for the hearing for two hours."',
                hi: 'पूर्ण-निरंतर भूतकाल (had been + -ing) — भूतकाल के किसी बिंदु तक किसी क्रिया की अवधि: "वे दो घंटे से सुनवाई की प्रतीक्षा कर रहे थे।"',
              },
              {
                en: 'Future Simple (will/shall + base verb) — a decision, prediction or promise: "The Bench will pronounce judgment next week."',
                hi: 'सामान्य भविष्य काल (will/shall + base verb) — निर्णय, भविष्यवाणी या वादा: "न्यायपीठ अगले सप्ताह निर्णय सुनाएगी।"',
              },
              {
                en: 'Future Continuous (will be + -ing) — an action in progress at a future time: "This time tomorrow we will be filing the reply."',
                hi: 'अपूर्ण भविष्य काल (will be + -ing) — भविष्य के किसी समय चल रही क्रिया: "कल इसी समय हम प्रत्युत्तर दाखिल कर रहे होंगे।"',
              },
              {
                en: 'Future Perfect (will have + past participle) — an action to be completed before a future point: "By March the case will have concluded."',
                hi: 'पूर्ण भविष्य काल (will have + past participle) — भविष्य के किसी बिंदु से पहले पूरी होने वाली क्रिया: "मार्च तक मामला समाप्त हो चुका होगा।"',
              },
              {
                en: 'Future Perfect Continuous (will have been + -ing) — duration up to a future point: "By May she will have been interning for six months."',
                hi: 'पूर्ण-निरंतर भविष्य काल (will have been + -ing) — भविष्य के किसी बिंदु तक अवधि: "मई तक वह छह महीने से इंटर्नशिप कर रही होगी।"',
              },
              {
                en: 'Sequence of tenses: when the main verb is past, subordinate verbs usually shift to past too — "He said that he was ready" (except for universal truths).',
                hi: 'कालों का क्रम: जब मुख्य क्रिया भूतकाल में हो, तो आश्रित क्रियाएँ भी प्रायः भूतकाल में बदल जाती हैं — "उसने कहा कि वह तैयार था" (सार्वभौमिक सत्य को छोड़कर)।',
              },
              {
                en: 'Common errors: mixing tenses in one sentence, using Present Perfect with a finished past time ("I have seen him yesterday" ✗), and "since/for" confusion.',
                hi: 'सामान्य भूलें: एक ही वाक्य में काल मिला देना, समाप्त भूत समय के साथ Present Perfect का प्रयोग ("I have seen him yesterday" ✗), और "since/for" का भ्रम।',
              },
            ],
          },
          {
            title: 'Active and Passive Voice',
            topics: [
              {
                en: 'Voice shows whether the subject does the action (active) or receives it (passive). Active: "The court dismissed the appeal." Passive: "The appeal was dismissed by the court."',
                hi: 'वाच्य (Voice) दर्शाता है कि कर्ता क्रिया करता है (कर्तृवाच्य) या क्रिया को ग्रहण करता है (कर्मवाच्य)। कर्तृवाच्य: "न्यायालय ने अपील खारिज कर दी।" कर्मवाच्य: "अपील न्यायालय द्वारा खारिज कर दी गई।"',
              },
              {
                en: 'To change active to passive: make the object the new subject, use the correct form of "be" + past participle of the main verb, and add "by + agent" (often omitted when obvious).',
                hi: 'कर्तृवाच्य से कर्मवाच्य बनाने के लिए: कर्म को नया कर्ता बनाएँ, "be" का उचित रूप + मुख्य क्रिया का past participle लगाएँ, और "by + कर्ता" जोड़ें (स्पष्ट होने पर प्रायः छोड़ दिया जाता है)।',
              },
              {
                en: 'The tense of the active verb is kept in the passive through the form of "be": Present Simple → is/am/are + V3; Past Simple → was/were + V3; Future Simple → will be + V3.',
                hi: 'कर्मवाच्य में क्रिया का काल "be" के रूप से बना रहता है: Present Simple → is/am/are + V3; Past Simple → was/were + V3; Future Simple → will be + V3।',
              },
              {
                en: 'Continuous tenses: is/was being + V3 — "The file is being examined." Perfect tenses: has/had been + V3 — "The judgment has been reserved."',
                hi: 'निरंतर काल: is/was being + V3 — "फ़ाइल की जाँच की जा रही है।" पूर्ण काल: has/had been + V3 — "निर्णय सुरक्षित रख लिया गया है।"',
              },
              {
                en: 'Modals become modal + be + V3 — "The notice must be served within 30 days."',
                hi: 'सहायक क्रियाएँ (modals) बनती हैं modal + be + V3 — "नोटिस 30 दिनों के भीतर तामील किया जाना चाहिए।"',
              },
              {
                en: 'Sentences with two objects can form two passives — Active: "The Registrar sent the parties a notice." → "The parties were sent a notice." / "A notice was sent to the parties."',
                hi: 'दो कर्म वाले वाक्यों के दो कर्मवाच्य बन सकते हैं — कर्तृवाच्य: "रजिस्ट्रार ने पक्षकारों को नोटिस भेजा।" → "पक्षकारों को एक नोटिस भेजा गया।" / "एक नोटिस पक्षकारों को भेजा गया।"',
              },
              {
                en: 'Questions and imperatives: "Did he sign the deed?" → "Was the deed signed by him?"; "Close the file." → "Let the file be closed."',
                hi: 'प्रश्न और आज्ञा: "Did he sign the deed?" → "Was the deed signed by him?"; "फ़ाइल बंद करो।" → "फ़ाइल बंद की जाए।"',
              },
              {
                en: 'The agent ("by ...") is dropped when it is unknown, general or unimportant: "The accused was arrested" / "Taxes are collected annually."',
                hi: 'कर्ता ("by ...") तब छोड़ दिया जाता है जब वह अज्ञात, सामान्य या महत्वहीन हो: "अभियुक्त को गिरफ्तार किया गया।" / "कर प्रतिवर्ष वसूला जाता है।"',
              },
              {
                en: 'Use the passive when the doer is unknown or irrelevant, or to keep a formal, impersonal tone — common in legal, scientific and official writing.',
                hi: 'कर्मवाच्य का प्रयोग तब करें जब कर्ता अज्ञात या महत्वहीन हो, या औपचारिक एवं निर्वैयक्तिक शैली रखनी हो — विधिक, वैज्ञानिक और सरकारी लेखन में सामान्य।',
              },
              {
                en: 'Prefer the active voice for clarity and directness in most legal drafting; use the passive deliberately, not by habit.',
                hi: 'अधिकांश विधिक प्रारूपण में स्पष्टता और सीधेपन के लिए कर्तृवाच्य को प्राथमिकता दें; कर्मवाच्य का प्रयोग सोच-समझकर करें, आदतन नहीं।',
              },
              {
                en: 'Verbs with no object (intransitive verbs, e.g. "arrive", "sleep") cannot be made passive.',
                hi: 'अकर्मक क्रियाओं (जिनका कोई कर्म नहीं होता, जैसे "arrive", "sleep") का कर्मवाच्य नहीं बनाया जा सकता।',
              },
            ],
          },
          {
            title: 'Grammar and Usage',
            topics: ['Reported (indirect) speech', 'Subject–verb agreement', 'Common errors'],
          },
          {
            title: 'Comprehension and Précis',
            topics: ['Reading passages', 'Précis writing', 'Summarising'],
          },
          {
            title: 'Introduction to Legal Language',
            topics: ['Legal maxims', 'Legal terminology', 'Plain-English drafting'],
          },
        ],
      },
      {
        code: 'BL-102',
        title: 'Political Science I (Political Theory)',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary:
          'Nature and scope of political science, the State, sovereignty, liberty, equality and justice.',
        units: [
          {
            title: 'Nature of Political Science',
            topics: ['Meaning and scope', 'Relationship with law'],
          },
          {
            title: 'The State',
            topics: ['Elements of the State', 'Theories of origin', 'Sovereignty'],
          },
          { title: 'Political Concepts', topics: ['Liberty', 'Equality', 'Rights', 'Justice'] },
        ],
      },
      {
        code: 'BL-103',
        title: 'Sociology I',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Basic sociological concepts and the relationship between society and law.',
        units: [
          { title: 'Introduction to Sociology', topics: ['Society', 'Community', 'Institutions'] },
          { title: 'Social Control', topics: ['Norms', 'Customs', 'Law as social control'] },
        ],
      },
      {
        code: 'BL-104',
        title: 'Law of Contract I',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary:
          'General principles of contract: formation, capacity, free consent, consideration and void agreements.',
        statutes: ['Indian Contract Act, 1872'],
        units: [
          {
            title: 'Formation of Contract',
            topics: [
              'Offer and acceptance',
              'Communication and revocation',
              'Intention to create legal relations',
            ],
          },
          {
            title: 'Consideration and Capacity',
            topics: ['Consideration', 'Privity of contract', 'Minors and persons of unsound mind'],
          },
          {
            title: 'Free Consent',
            topics: ['Coercion', 'Undue influence', 'Fraud', 'Misrepresentation', 'Mistake'],
          },
          {
            title: 'Void and Voidable Agreements',
            topics: ['Unlawful object', 'Restraint of trade', 'Wagering agreements'],
          },
        ],
      },
      {
        code: 'BL-105',
        title: 'Legal Methods',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Sources of law, legal reasoning, reading judgments and basic legal research.',
        units: [
          { title: 'Sources of Law', topics: ['Legislation', 'Precedent', 'Custom'] },
          { title: 'Reading Case Law', topics: ['Ratio decidendi', 'Obiter dicta', 'Case briefs'] },
          { title: 'Legal Research', topics: ['Law reports', 'Citations', 'Online databases'] },
        ],
      },
    ],
  },
  {
    number: 2,
    year: 1,
    subjects: [
      {
        code: 'BL-201',
        title: 'General English II',
        category: 'Language',
        source: 'sample',
        credits: 4,
        summary: 'Advanced writing, legal correspondence and presentation skills.',
        units: [],
      },
      {
        code: 'BL-202',
        title: 'Political Science II (Indian Government and Politics)',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Structure and working of Indian political institutions.',
        units: [],
      },
      {
        code: 'BL-203',
        title: 'History I',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Indian history with emphasis on legal and administrative developments.',
        units: [],
      },
      {
        code: 'BL-204',
        title: 'Law of Contract II (Specific Contracts)',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Indemnity, guarantee, bailment, pledge, agency, sale of goods and partnership.',
        statutes: [
          'Indian Contract Act, 1872',
          'Sale of Goods Act, 1930',
          'Indian Partnership Act, 1932',
        ],
        units: [
          {
            title: 'Indemnity and Guarantee',
            topics: ['Contract of indemnity', 'Contract of guarantee', 'Rights of surety'],
          },
          { title: 'Bailment and Pledge', topics: ['Duties of bailor and bailee', 'Pledge'] },
          {
            title: 'Agency',
            topics: ['Creation of agency', 'Rights and duties of agents', 'Termination'],
          },
        ],
      },
      {
        code: 'BL-205',
        title: 'Law of Torts',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary:
          'General principles of tortious liability, specific torts and consumer protection.',
        statutes: ['Consumer Protection Act, 2019', 'Motor Vehicles Act, 1988'],
        units: [
          {
            title: 'General Principles',
            topics: ['Definition of tort', 'Damnum sine injuria', 'Injuria sine damno'],
          },
          { title: 'Defences', topics: ['Volenti non fit injuria', 'Act of God', 'Necessity'] },
          { title: 'Specific Torts', topics: ['Negligence', 'Nuisance', 'Defamation', 'Trespass'] },
          {
            title: 'Strict and Absolute Liability',
            topics: ['Rylands v Fletcher', 'M.C. Mehta v Union of India'],
          },
        ],
      },
    ],
  },
  {
    number: 3,
    year: 2,
    subjects: [
      {
        code: 'BL-301',
        title: 'Economics I',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Principles of micro-economics relevant to law.',
        units: [],
      },
      {
        code: 'BL-302',
        title: 'History II',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Constitutional and legal history of India.',
        units: [],
      },
      {
        code: 'BL-303',
        title: 'Constitutional Law I',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Preamble, citizenship, fundamental rights and directive principles.',
        statutes: ['Constitution of India'],
        units: [
          {
            title: 'Nature of the Constitution',
            topics: ['Preamble', 'Federalism', 'Basic structure doctrine'],
          },
          {
            title: 'Fundamental Rights',
            topics: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
          },
          {
            title: 'Directive Principles and Fundamental Duties',
            topics: ['Part IV', 'Part IVA', 'Relationship with Part III'],
          },
        ],
      },
      {
        code: 'BL-304',
        title: 'Family Law I',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Marriage, divorce, maintenance and adoption under Hindu law.',
        statutes: ['Hindu Marriage Act, 1955', 'Hindu Adoptions and Maintenance Act, 1956'],
        units: [],
      },
      {
        code: 'BL-305',
        title: 'Law of Crimes I',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'General principles of criminal liability and offences against the human body.',
        statutes: ['Bharatiya Nyaya Sanhita, 2023'],
        units: [],
      },
    ],
  },
  {
    number: 4,
    year: 2,
    subjects: [
      {
        code: 'BL-401',
        title: 'Economics II',
        category: 'Arts',
        source: 'sample',
        credits: 4,
        summary: 'Indian economy and public finance.',
        units: [],
      },
      {
        code: 'BL-402',
        title: 'Constitutional Law II',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Union and State executive, legislature, judiciary and centre–state relations.',
        statutes: ['Constitution of India'],
        units: [],
      },
      {
        code: 'BL-403',
        title: 'Family Law II',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Muslim law and succession.',
        units: [],
      },
      {
        code: 'BL-404',
        title: 'Law of Crimes II',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Offences against property, the State and public order.',
        statutes: ['Bharatiya Nyaya Sanhita, 2023'],
        units: [],
      },
      {
        code: 'BL-405',
        title: 'Jurisprudence',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Schools of jurisprudence, legal concepts, rights and duties.',
        units: [],
      },
    ],
  },
  {
    number: 5,
    year: 3,
    subjects: [
      {
        code: 'BL-501',
        title: 'Administrative Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary:
          'Delegated legislation, natural justice and judicial review of administrative action.',
        units: [],
      },
      {
        code: 'BL-502',
        title: 'Property Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Transfer of property, sale, mortgage, lease and easements.',
        statutes: ['Transfer of Property Act, 1882'],
        units: [],
      },
      {
        code: 'BL-503',
        title: 'Criminal Procedure',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Investigation, trial, bail and appeals.',
        statutes: ['Bharatiya Nagarik Suraksha Sanhita, 2023'],
        units: [],
      },
      {
        code: 'BL-504',
        title: 'Environmental Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Constitutional and statutory framework for environmental protection.',
        units: [],
      },
    ],
  },
  {
    number: 6,
    year: 3,
    subjects: [
      {
        code: 'BL-601',
        title: 'Law of Evidence',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Relevancy, admissibility, burden of proof and witnesses.',
        statutes: ['Bharatiya Sakshya Adhiniyam, 2023'],
        units: [],
      },
      {
        code: 'BL-602',
        title: 'Labour and Industrial Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Industrial relations, wages and social security.',
        units: [],
      },
      {
        code: 'BL-603',
        title: 'Public International Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Sources, subjects, state recognition and treaties.',
        units: [],
      },
      {
        code: 'BL-604',
        title: 'Company Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Incorporation, management and winding up of companies.',
        statutes: ['Companies Act, 2013'],
        units: [],
      },
    ],
  },
  {
    number: 7,
    year: 4,
    subjects: [
      {
        code: 'BL-701',
        title: 'Civil Procedure and Limitation',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Suits, pleadings, decrees, execution and limitation periods.',
        statutes: ['Code of Civil Procedure, 1908', 'Limitation Act, 1963'],
        units: [],
      },
      {
        code: 'BL-702',
        title: 'Taxation Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Direct and indirect taxation.',
        units: [],
      },
      {
        code: 'BL-703',
        title: 'Interpretation of Statutes',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Rules and aids to interpretation.',
        units: [],
      },
      {
        code: 'BL-704',
        title: 'Elective I',
        category: 'Elective',
        source: 'sample',
        credits: 4,
        summary: 'Optional paper chosen as per university offerings.',
        units: [],
      },
    ],
  },
  {
    number: 8,
    year: 4,
    subjects: [
      {
        code: 'BL-801',
        title: 'Alternative Dispute Resolution',
        category: 'Clinical',
        source: 'sample',
        credits: 4,
        summary: 'Arbitration, conciliation, mediation and negotiation.',
        statutes: ['Arbitration and Conciliation Act, 1996'],
        units: [],
      },
      {
        code: 'BL-802',
        title: 'Intellectual Property Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'Copyright, patents, trademarks and designs.',
        units: [],
      },
      {
        code: 'BL-803',
        title: 'Human Rights Law',
        category: 'Law',
        source: 'sample',
        credits: 4,
        summary: 'International and national human rights framework.',
        units: [],
      },
      {
        code: 'BL-804',
        title: 'Elective II',
        category: 'Elective',
        source: 'sample',
        credits: 4,
        summary: 'Optional paper chosen as per university offerings.',
        units: [],
      },
    ],
  },
  {
    number: 9,
    year: 5,
    subjects: [
      {
        code: 'BL-901',
        title: 'Professional Ethics and Professional Accounting System',
        category: 'Clinical',
        source: 'sample',
        credits: 4,
        summary: 'Advocates’ duties, Bar Council rules and contempt of court.',
        statutes: ['Advocates Act, 1961'],
        units: [],
      },
      {
        code: 'BL-902',
        title: 'Drafting, Pleading and Conveyancing',
        category: 'Clinical',
        source: 'sample',
        credits: 4,
        summary: 'Drafting of civil and criminal pleadings and conveyancing deeds.',
        units: [],
      },
      {
        code: 'BL-903',
        title: 'Elective III',
        category: 'Elective',
        source: 'sample',
        credits: 4,
        summary: 'Optional paper chosen as per university offerings.',
        units: [],
      },
    ],
  },
  {
    number: 10,
    year: 5,
    note: 'Papers III–V below are from the official Shakambhari University syllabus. The semester they belong to is not printed on the syllabus pages, so their placement in Semester 10 still needs to be confirmed. Papers I and II have not been added yet.',
    subjects: OFFICIAL_PAPERS,
  },
];
