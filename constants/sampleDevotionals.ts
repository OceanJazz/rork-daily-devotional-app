import { DevotionalEntry } from '@/types/devotional';
import { getTodayDate } from '@/utils/date';

// Sample devotionals to use as fallback when network fetch fails
export const sampleDevotionals: DevotionalEntry[] = [
  {
    date: getTodayDate(),
    scriptureText: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    scriptureReference: "Proverbs 3:5-6",
    questionPrompt: "In what area of your life do you find it most difficult to trust God? What would it look like to fully surrender that area to Him today?"
  },
  {
    date: "2025-06-01",
    scriptureText: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    scriptureReference: "John 3:16",
    questionPrompt: "How has God's love transformed your life? Share a specific example of how you've experienced His love recently."
  },
  {
    date: "2025-06-03",
    scriptureText: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    scriptureReference: "Joshua 1:9",
    questionPrompt: "What situation are you facing that requires courage? How does knowing God is with you change your perspective?"
  }
];