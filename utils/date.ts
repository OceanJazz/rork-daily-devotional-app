export const formatDate = (date: Date): string => {
  // Get local date components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  // Format as YYYY-MM-DD using local components
  return `${year}-${month}-${day}`;
};

// Parses a YYYY-MM-DD string as a local Date object
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // JS months are 0-based
};

// UPDATED: Format a date string from the CSV for display
export const formatDisplayDate = (dateString: string): string => {
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Utility: Get today's date in YYYY-MM-DD format using local time
export const getTodayDate = (): string => {
  const now = new Date();
  const localDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  
  return formatDate(localDate);
};

// Check if the user has journaled today
export const hasJournaledToday = (lastJournaledDate: string | null): boolean => {
  if (!lastJournaledDate) return false;
  return lastJournaledDate === getTodayDate();
};

// Check if the user journaled yesterday
export const hasJournaledYesterday = (lastJournaledDate: string | null): boolean => {
  if (!lastJournaledDate) return false;
  
  const now = new Date();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yesterdayFormatted = formatDate(yesterday);
  
  return lastJournaledDate === yesterdayFormatted;
};