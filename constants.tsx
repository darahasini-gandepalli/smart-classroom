
export const SUBJECTS = [
  'DLCO',
  'P&S',
  'ML',
  'AI',
  'MEFA',
  'DBMS',
  'PYTHON'
] as const;

export type Subject = typeof SUBJECTS[number];
