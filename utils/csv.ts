import { DevotionalEntry } from '@/types/devotional';

export const parseCSV = (csv: string): DevotionalEntry[] => {
  try {
    // Split by newlines, handling different line endings
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      console.warn('CSV appears to be empty');
      return [];
    }
    
    // Skip header row and process data
    const dataLines = lines.slice(1);
    const entries: DevotionalEntry[] = [];
    
    // Process each line after the header
    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i];
      const values = parseCSVLine(line);
      
      if (values.length < 4) {
        console.warn(`Skipping malformed line ${i + 2}: ${line}`);
        continue;
      }
      
      const date = values[0]?.trim() || '';
      const scriptureText = values[1]?.trim() || '';
      const scriptureReference = values[2]?.trim() || '';
      const questionPrompt = values[3]?.trim() || '';
      
      // Validate date format (should be YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        console.warn(`Skipping entry with invalid date format: ${date}`);
        continue;
      }
      
      // Only add valid entries
      if (date && scriptureText && scriptureReference) {
        entries.push({
          date,
          scriptureText,
          scriptureReference,
          questionPrompt: questionPrompt || 'Reflect on how this verse applies to your life today.'
        });
      }
    }
    
    console.log(`Successfully parsed ${entries.length} devotional entries`);
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
      // Handle escaped quotes
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  return result;
}

export const findTodaysDevotional = (entries: DevotionalEntry[], date: string): DevotionalEntry | undefined => {
  const found = entries.find(entry => entry.date === date);
  if (found) {
    console.log(`Found devotional for ${date}: ${found.scriptureReference}`);
  } else {
    console.log(`No devotional found for ${date}, available dates:`, entries.map(e => e.date).slice(0, 5));
  }
  return found;
};