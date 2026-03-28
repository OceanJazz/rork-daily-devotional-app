import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDevotionalStore } from '@/store/devotionalStore';
import { formatDisplayDate } from '@/utils/date';
import Colors from '@/constants/colors';
import EmptyState from '@/components/EmptyState';

export default function JournalDetailScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { getJournalEntryForDate } = useDevotionalStore();
  
  const entry = getJournalEntryForDate(date);
  
  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState message="Entry not found" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.date}>{formatDisplayDate(entry.date)}</Text>
          <Text style={styles.reference}>{entry.devotional.scriptureReference}</Text>
        </View>
        
        <View style={styles.scriptureContainer}>
          <Text style={styles.scriptureText}>{entry.devotional.scriptureText}</Text>
        </View>
        
        <View style={styles.promptContainer}>
          <Text style={styles.promptLabel}>Reflection Prompt:</Text>
          <Text style={styles.promptText}>{entry.devotional.questionPrompt}</Text>
        </View>
        
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Your Reflection:</Text>
          <Text style={styles.responseText}>{entry.response}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: Colors.light.accent,
    marginBottom: 4,
  },
  reference: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  scriptureContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  scriptureText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    fontStyle: 'italic',
  },
  promptContainer: {
    marginBottom: 20,
  },
  promptLabel: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 4,
  },
  promptText: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  responseContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  responseLabel: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
});