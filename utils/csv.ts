import { DevotionalEntry } from '@/types/devotional';

export const parseCSV = (csv: string): DevotionalEntry[] => {
  try {
    // Split by newlines, handling different line endings
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      console.warn('CSV appears to be empty');
      return [];
    }
    
    const headers = lines[0].split(',');
    
    if (headers.length < 4) {
      console.warn('CSV does not have the expected format');
      return [];
    }
    
    const entries: DevotionalEntry[] = [];
    
    // Process each line after the header
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const values = parseCSVLine(line);
      
      if (values.length < 4) {
        console.warn(`Skipping malformed line: ${line}`);
        continue;
      }
      
      const date = values[0]?.trim() || '';
      const scriptureText = values[1]?.trim() || '';
      const scriptureReference = values[2]?.trim() || '';
      const questionPrompt = values[3]?.trim() || '';
      
      // Only add valid entries
      if (date && scriptureText) {
        entries.push({
          date,
          scriptureText,
          scriptureReference,
          questionPrompt
        });
      }
    }
    
    return entries;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};

// Helper function to handle CSV parsing with quoted fields
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current);
  
  return result;
}

export const findTodaysDevotional = (entries: DevotionalEntry[], date: string): DevotionalEntry | undefined => {
  return entries.find(entry => entry.date === date);
};