import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDevotionalStore } from '@/store/devotionalStore';
import { getTodayDate } from '@/utils/date';
import { parseCSV, findTodaysDevotional } from '@/utils/csv';
import { sampleDevotionals } from '@/constants/sampleDevotionals';
import ScriptureCard from '@/components/ScriptureCard';
import Timer from '@/components/Timer';
import JournalEntry from '@/components/JournalEntry';
import EmptyState from '@/components/EmptyState';
import StreakTracker from '@/components/StreakTracker';
import Colors from '@/constants/colors';

export default function TodayScreen() {
  const { 
    devotionals, 
    currentDevotional, 
    setDevotionals, 
    setCurrentDevotional,
    setLoading,
    isLoading,
    error,
    setError
  } = useDevotionalStore();
  const [refreshing, setRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDevotionals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRv2lIEVfxZEwAePL2selhzplDSII7bH7H0UkzZGNZTRbn_i76eos4rcmsgTNOKms6kgIz0un-EONHs/pub?output=csv', {
        method: 'GET',
        headers: {
          'Accept': 'text/csv,text/plain,*/*',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      
      if (!text || text.trim() === '') {
        throw new Error('Received empty response from Google Sheets');
      }
      
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        throw new Error('No valid devotional entries found in the CSV');
      }
      
      setDevotionals(parsedData);
      
      const today = getTodayDate();
      const todaysDevotional = findTodaysDevotional(parsedData, today);
      
      setCurrentDevotional(todaysDevotional || parsedData[0]); // Use first entry if today's not found
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error('Error fetching devotionals:', err);
      
      let errorMessage = 'Failed to load devotional.';
      
      if (err.name === 'AbortError') {
        errorMessage = 'Request timed out. Check your internet connection.';
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (err.message.includes('HTTP')) {
        errorMessage = 'Server error. The devotional service may be temporarily unavailable.';
      }
      
      // Use sample data as fallback after first failure or if retry count is high
      if (retryCount >= 1 || devotionals.length === 0) {
        console.log('Using sample devotionals as fallback');
        setDevotionals(sampleDevotionals);
        
        const today = getTodayDate();
        const todaysDevotional = findTodaysDevotional(sampleDevotionals, today);
        
        setCurrentDevotional(todaysDevotional || sampleDevotionals[0]);
        setError('Using offline content. Pull down to retry loading online devotionals.');
      } else {
        setError(`${errorMessage} Pull down to retry.`);
        setRetryCount(prev => prev + 1);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Only fetch if we don't have devotionals or current devotional
    if (devotionals.length === 0 || !currentDevotional) {
      fetchDevotionals();
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setRetryCount(0); // Reset retry count on manual refresh
    fetchDevotionals();
  };

  if (isLoading && !refreshing && !currentDevotional) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Loading today's devotional...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {currentDevotional ? (
          <>
            <ScriptureCard devotional={currentDevotional} />
            <Timer initialMinutes={5} />
            <JournalEntry />
            <StreakTracker />
          </>
        ) : (
          <EmptyState 
            message="No devotional available. Pull down to refresh or check your internet connection." 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.timer,
  },
  errorText: {
    color: Colors.light.text,
    fontSize: 14,
  },
});