export interface DevotionalEntry {
  date: string;
  scriptureText: string;
  scriptureReference: string;
  questionPrompt: string;
  isFavorite?: boolean;
}

export interface JournalEntry {
  date: string;
  response: string;
  devotional: DevotionalEntry;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastJournaledDate: string | null;
}