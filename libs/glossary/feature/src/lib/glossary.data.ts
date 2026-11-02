export interface GlossaryTerm {
  term: string;
  meaning: string;
  /** Short note on where students typically meet the term. */
  context: string;
}

/** Common Latin maxims and legal terms taught across BA.LLB subjects. */
export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Actus non facit reum nisi mens sit rea',
    meaning: 'An act does not make a person guilty unless the mind is also guilty.',
    context: 'Law of Crimes — mens rea',
  },
  {
    term: 'Audi alteram partem',
    meaning: 'Hear the other side; no one should be condemned unheard.',
    context: 'Administrative Law — natural justice',
  },
  { term: 'Caveat emptor', meaning: 'Let the buyer beware.', context: 'Sale of Goods' },
  {
    term: 'Certiorari',
    meaning: 'A writ by which a higher court quashes an order of a lower court or tribunal.',
    context: 'Constitutional Law — writs',
  },
  {
    term: 'Damnum sine injuria',
    meaning: 'Actual damage without violation of a legal right; not actionable.',
    context: 'Law of Torts',
  },
  {
    term: 'Habeas corpus',
    meaning: 'Produce the body; a writ to secure release from unlawful detention.',
    context: 'Constitutional Law — writs',
  },
  {
    term: 'Ignorantia juris non excusat',
    meaning: 'Ignorance of the law is no excuse.',
    context: 'Law of Crimes, Jurisprudence',
  },
  {
    term: 'Injuria sine damno',
    meaning: 'Violation of a legal right without actual damage; actionable.',
    context: 'Law of Torts',
  },
  {
    term: 'Mandamus',
    meaning: 'We command; a writ directing a public authority to perform a public duty.',
    context: 'Constitutional Law — writs',
  },
  {
    term: 'Nemo judex in causa sua',
    meaning: 'No one should be a judge in their own cause (rule against bias).',
    context: 'Administrative Law — natural justice',
  },
  {
    term: 'Obiter dictum',
    meaning: 'A remark made by a judge in passing, not essential to the decision; persuasive only.',
    context: 'Legal Methods — precedent',
  },
  {
    term: 'Quo warranto',
    meaning: 'By what authority; a writ challenging a person’s right to hold a public office.',
    context: 'Constitutional Law — writs',
  },
  {
    term: 'Ratio decidendi',
    meaning: 'The reason or principle on which a case is decided; binding as precedent.',
    context: 'Legal Methods — precedent',
  },
  {
    term: 'Res ipsa loquitur',
    meaning: 'The thing speaks for itself; negligence may be inferred from the facts.',
    context: 'Law of Torts — negligence',
  },
  {
    term: 'Res judicata',
    meaning: 'A matter already finally decided cannot be litigated again between the same parties.',
    context: 'Civil Procedure',
  },
  {
    term: 'Stare decisis',
    meaning: 'To stand by decided cases; the doctrine of binding precedent.',
    context: 'Legal Methods, Jurisprudence',
  },
  {
    term: 'Ubi jus ibi remedium',
    meaning: 'Where there is a right, there is a remedy.',
    context: 'Law of Torts, Jurisprudence',
  },
  {
    term: 'Volenti non fit injuria',
    meaning: 'No injury is done to one who consents.',
    context: 'Law of Torts — defences',
  },
];
