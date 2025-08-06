export interface DevotionalEntry {
  date: string;
  scriptureText: string;
  scriptureReference: string;
  questionPrompt: string;
  isFavorite?: boolean;
  isSample?: boolean;
}

export interface JournalEntry {
  date: string;
  response: string;
  devotional: DevotionalEntry;
  isSample?: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastJournaledDate: string | null;
}