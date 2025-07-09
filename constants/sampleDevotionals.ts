import { DevotionalEntry } from '@/types/devotional';
import { getTodayDate } from '@/utils/date';

// Get current date and create dates for the next few days
const today = new Date();
const getDateString = (daysOffset: number = 0) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Sample devotionals to use as fallback when network fetch fails
export const sampleDevotionals: DevotionalEntry[] = [
  {
    date: getTodayDate(),
    scriptureText: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    scriptureReference: "Proverbs 3:5-6",
    questionPrompt: "In what area of your life do you find it most difficult to trust God? What would it look like to fully surrender that area to Him today?"
  },
  {
    date: getDateString(-1), // Yesterday
    scriptureText: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    scriptureReference: "John 3:16",
    questionPrompt: "How has God's love transformed your life? Share a specific example of how you've experienced His love recently."
  },
  {
    date: getDateString(1), // Tomorrow
    scriptureText: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    scriptureReference: "Joshua 1:9",
    questionPrompt: "What situation are you facing that requires courage? How does knowing God is with you change your perspective?"
  },
  {
    date: getDateString(-2), // 2 days ago
    scriptureText: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    scriptureReference: "Romans 8:28",
    questionPrompt: "Think of a difficult situation you've faced. How might God be working it for good in your life or the lives of others?"
  },
  {
    date: getDateString(2), // 2 days from now
    scriptureText: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    scriptureReference: "Zephaniah 3:17",
    questionPrompt: "How does it feel to know that God delights in you and rejoices over you? How might this truth change how you see yourself today?"
  },
  {
    date: getDateString(-3), // 3 days ago
    scriptureText: "Cast all your anxiety on him because he cares for you.",
    scriptureReference: "1 Peter 5:7",
    questionPrompt: "What anxieties are you carrying today? Take a moment to specifically cast each one on God, trusting in His care for you."
  },
  {
    date: getDateString(3), // 3 days from now
    scriptureText: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    scriptureReference: "Isaiah 40:31",
    questionPrompt: "In what areas of your life do you feel weary or faint? How can you place your hope more fully in the Lord today?"
  }
];