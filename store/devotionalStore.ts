import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevotionalEntry, JournalEntry, StreakData } from '@/types/devotional';
import { getTodayDate, hasJournaledToday, hasJournaledYesterday } from '@/utils/date';

interface DevotionalState {
  devotionals: DevotionalEntry[];
  currentDevotional: DevotionalEntry | null;
  journalEntries: JournalEntry[];
  favoriteVerses: DevotionalEntry[];
  notificationTime: string;
  isLoading: boolean;
  error: string | null;
  streak: StreakData;
  setDevotionals: (devotionals: DevotionalEntry[]) => void;
  setCurrentDevotional: (devotional: DevotionalEntry | null) => void;
  addJournalEntry: (response: string) => void;
  toggleFavorite: (devotional: DevotionalEntry) => void;
  setNotificationTime: (time: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getJournalEntryForDate: (date: string) => JournalEntry | undefined;
  updateStreak: () => void;
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
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastJournaledDate: null
      },
      
      setDevotionals: (devotionals) => set({ devotionals }),
      
      setCurrentDevotional: (devotional) => set({ currentDevotional: devotional }),
      
      addJournalEntry: (response) => {
        const { currentDevotional, journalEntries } = get();
        if (!currentDevotional) return;
        
        const today = getTodayDate();
        const existingEntryIndex = journalEntries.findIndex(entry => entry.date === today);
        
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
        
        // Sort entries by date (newest first)
        const sortedEntries = [...journalEntries].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        // Get the most recent journal entry date
        const lastJournaledDate = sortedEntries.length > 0 ? sortedEntries[0].date : null;
        
        let { currentStreak, longestStreak } = streak;
        
        // Check if user journaled today
        if (hasJournaledToday(lastJournaledDate)) {
          // Already counted in streak, no change needed
        } 
        // Check if user journaled yesterday (maintain streak)
        else if (hasJournaledYesterday(streak.lastJournaledDate)) {
          currentStreak += 1;
        } 
        // No recent entries, reset streak
        else if (lastJournaledDate !== streak.lastJournaledDate) {
          currentStreak = 1; // Starting a new streak
        }
        
        // Update longest streak if current streak is longer
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        
        set({
          streak: {
            currentStreak,
            longestStreak,
            lastJournaledDate: today
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
        streak: state.streak
      })
    }
  )
);