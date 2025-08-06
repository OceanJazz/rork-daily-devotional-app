import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevotionalEntry, JournalEntry, StreakData } from '@/types/devotional';
import { getTodayDate, hasJournaledToday, hasJournaledYesterday, getYesterdayDate } from '@/utils/date';

interface DevotionalState {
  devotionals: DevotionalEntry[];
  currentDevotional: DevotionalEntry | null;
  journalEntries: JournalEntry[];
  favoriteVerses: DevotionalEntry[];
  notificationTime: string;
  isLoading: boolean;
  error: string | null;
  streak: StreakData;
  isFirstTime: boolean;
  hasUserCreatedContent: boolean;
  setDevotionals: (devotionals: DevotionalEntry[]) => void;
  setCurrentDevotional: (devotional: DevotionalEntry | null) => void;
  addJournalEntry: (response: string) => void;
  toggleFavorite: (devotional: DevotionalEntry) => void;
  setNotificationTime: (time: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getJournalEntryForDate: (date: string) => JournalEntry | undefined;
  updateStreak: () => void;
  initializeFirstTimeData: () => void;
  cleanupSampleData: () => void;
  resetToFirstTime: () => void;
}

export const useDevotionalStore = create<DevotionalState>()(
  persist(
    (set, get) => ({
      devotionals: [],
      currentDevotional: null,
      journalEntries: [],
      favoriteVerses: [],
      notificationTime: '08:00',
      isLoading: false,
      error: null,
      isFirstTime: true,
      hasUserCreatedContent: false,
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastJournaledDate: null
      },
      
      setDevotionals: (devotionals) => set({ devotionals }),
      
      setCurrentDevotional: (devotional) => set({ currentDevotional: devotional }),
      
      addJournalEntry: (response) => {
        const { currentDevotional, journalEntries, hasUserCreatedContent } = get();
        if (!currentDevotional) return;
        
        const today = getTodayDate();
        const existingEntryIndex = journalEntries.findIndex(entry => entry.date === today);
        
        // Mark that user has created content and cleanup sample data if needed
        if (!hasUserCreatedContent) {
          get().cleanupSampleData();
          set({ hasUserCreatedContent: true });
        }
        
        if (existingEntryIndex >= 0) {
          // Update existing entry
          const updatedEntries = [...journalEntries];
          updatedEntries[existingEntryIndex] = {
            ...updatedEntries[existingEntryIndex],
            response
          };
          set({ journalEntries: updatedEntries });
        } else {
          // Add new entry
          set({
            journalEntries: [
              ...journalEntries,
              {
                date: today,
                response,
                devotional: currentDevotional
              }
            ]
          });
        }
        
        // Update streak after adding journal entry
        get().updateStreak();
      },
      
      toggleFavorite: (devotional) => {
        const { favoriteVerses, devotionals, currentDevotional } = get();
        
        // Check if the verse is already a favorite
        const isFavorite = favoriteVerses.some(fav => 
          fav.date === devotional.date && fav.scriptureReference === devotional.scriptureReference
        );
        
        let updatedFavorites;
        
        if (isFavorite) {
          // Remove from favorites
          updatedFavorites = favoriteVerses.filter(fav => 
            !(fav.date === devotional.date && fav.scriptureReference === devotional.scriptureReference)
          );
        } else {
          // Add to favorites
          updatedFavorites = [...favoriteVerses, { ...devotional, isFavorite: true }];
        }
        
        // Update devotionals list to reflect favorite status
        const updatedDevotionals = devotionals.map(dev => {
          if (dev.date === devotional.date && dev.scriptureReference === devotional.scriptureReference) {
            return { ...dev, isFavorite: !isFavorite };
          }
          return dev;
        });
        
        // Update current devotional if it's the one being toggled
        let updatedCurrentDevotional = currentDevotional;
        if (currentDevotional && 
            currentDevotional.date === devotional.date && 
            currentDevotional.scriptureReference === devotional.scriptureReference) {
          updatedCurrentDevotional = { ...currentDevotional, isFavorite: !isFavorite };
        }
        
        set({ 
          favoriteVerses: updatedFavorites,
          devotionals: updatedDevotionals,
          currentDevotional: updatedCurrentDevotional
        });
      },
      
      setNotificationTime: (time) => set({ notificationTime: time }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      getJournalEntryForDate: (date) => {
        return get().journalEntries.find(entry => entry.date === date);
      },
      
      updateStreak: () => {
        const { streak, journalEntries } = get();
        const today = getTodayDate();
        const yesterday = getYesterdayDate();
        
        // Filter out sample entries when calculating streak
        const userJournalEntries = journalEntries.filter(entry => !entry.isSample);
        
        // Check if user has journaled today
        const hasJournaledTodayBool = userJournalEntries.some(entry => entry.date === today);
        
        // Check if user journaled yesterday
        const hasJournaledYesterdayBool = userJournalEntries.some(entry => entry.date === yesterday);
        
        let newCurrentStreak = streak.currentStreak;
        let newLongestStreak = streak.longestStreak;
        let newLastJournaledDate = streak.lastJournaledDate;
        
        if (hasJournaledTodayBool) {
          // User journaled today
          if (streak.lastJournaledDate !== today) {
            // This is a new journal entry for today
            if (hasJournaledYesterdayBool || streak.lastJournaledDate === yesterday) {
              // Continue streak
              newCurrentStreak = streak.currentStreak + 1;
            } else {
              // Start new streak
              newCurrentStreak = 1;
            }
            newLastJournaledDate = today;
          }
        } else {
          // User hasn't journaled today
          // Check if streak should be broken (if it's past today and they haven't journaled)
          if (streak.lastJournaledDate && streak.lastJournaledDate !== today && streak.lastJournaledDate !== yesterday) {
            // Streak is broken
            newCurrentStreak = 0;
          }
        }
        
        // Update longest streak if current streak is longer
        if (newCurrentStreak > newLongestStreak) {
          newLongestStreak = newCurrentStreak;
        }
        
        // Only update if something changed
        if (newCurrentStreak !== streak.currentStreak || 
            newLongestStreak !== streak.longestStreak || 
            newLastJournaledDate !== streak.lastJournaledDate) {
          
          set({
            streak: {
              currentStreak: newCurrentStreak,
              longestStreak: newLongestStreak,
              lastJournaledDate: newLastJournaledDate
            }
          });
          
          console.log(`Streak updated: Current=${newCurrentStreak}, Longest=${newLongestStreak}, Last=${newLastJournaledDate}`);
        }
      },
      
      initializeFirstTimeData: () => {
        const { isFirstTime } = get();
        if (!isFirstTime) return;
        
        console.log('Initializing first-time sample data');
        
        // Create sample journal entries for the past few days to show app functionality
        const sampleJournalEntries: JournalEntry[] = [
          {
            date: getYesterdayDate(),
            response: "I've been struggling with trusting God in my career decisions lately. This verse reminds me that I don't have to figure everything out on my own. I want to surrender my plans to Him and trust that He will guide my path.",
            devotional: {
              date: getYesterdayDate(),
              scriptureText: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
              scriptureReference: "Proverbs 3:5-6",
              questionPrompt: "In what area of your life do you find it most difficult to trust God? What would it look like to fully surrender that area to Him today?"
            },
            isSample: true
          },
          {
            date: (() => {
              const date = new Date();
              date.setDate(date.getDate() - 2);
              return date.toISOString().split('T')[0];
            })(),
            response: "God's love has completely transformed how I see myself and others. Recently, when I was feeling discouraged about my mistakes, I remembered that His love isn't based on my performance. This gives me hope and helps me extend grace to others too.",
            devotional: {
              date: (() => {
                const date = new Date();
                date.setDate(date.getDate() - 2);
                return date.toISOString().split('T')[0];
              })(),
              scriptureText: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
              scriptureReference: "John 3:16",
              questionPrompt: "How has God's love transformed your life? Share a specific example of how you've experienced His love recently."
            },
            isSample: true
          }
        ];
        
        // Add sample favorite verse
        const sampleFavorite: DevotionalEntry = {
          date: getYesterdayDate(),
          scriptureText: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
          scriptureReference: "Proverbs 3:5-6",
          questionPrompt: "In what area of your life do you find it most difficult to trust God? What would it look like to fully surrender that area to Him today?",
          isFavorite: true,
          isSample: true
        };
        
        set({
          journalEntries: sampleJournalEntries,
          favoriteVerses: [sampleFavorite],
          streak: {
            currentStreak: 2,
            longestStreak: 2,
            lastJournaledDate: getYesterdayDate()
          },
          isFirstTime: false
        });
      },
      
      cleanupSampleData: () => {
        const { journalEntries, favoriteVerses } = get();
        
        console.log('Cleaning up sample data as user has created their own content');
        
        // Remove all sample entries
        const userJournalEntries = journalEntries.filter(entry => !entry.isSample);
        const userFavoriteVerses = favoriteVerses.filter(verse => !verse.isSample);
        
        set({
          journalEntries: userJournalEntries,
          favoriteVerses: userFavoriteVerses,
          // Reset streak to start fresh with user's actual entries
          streak: {
            currentStreak: 0,
            longestStreak: 0,
            lastJournaledDate: null
          }
        });
      },
      
      resetToFirstTime: () => {
        console.log('Resetting app to first-time state for testing');
        set({
          journalEntries: [],
          favoriteVerses: [],
          isFirstTime: true,
          hasUserCreatedContent: false,
          streak: {
            currentStreak: 0,
            longestStreak: 0,
            lastJournaledDate: null
          }
        });
      }
    }),
    {
      name: 'devotional-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        journalEntries: state.journalEntries,
        notificationTime: state.notificationTime,
        favoriteVerses: state.favoriteVerses,
        streak: state.streak,
        isFirstTime: state.isFirstTime,
        hasUserCreatedContent: state.hasUserCreatedContent
      })
    }
  )
);