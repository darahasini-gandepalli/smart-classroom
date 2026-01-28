
export interface UserData {
  rollNumber: string;
  classSection: string;
}

export enum AppView {
  LOGIN = 'LOGIN',
  PORTAL = 'PORTAL',
  LEARNING_MODULE = 'LEARNING_MODULE',
  SMART_NOTES = 'SMART_NOTES'
}

export enum LearningLevel {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ADVANCED = 'ADVANCED'
}

export interface LearningContent {
  level: LearningLevel;
  explanation: string;
  example: string;
  practiceQuestion: string;
}

export interface SmartNotesResult {
  summary: string;
  keyPoints: string[];
}
