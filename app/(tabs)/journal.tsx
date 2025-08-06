import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDevotionalStore } from '@/store/devotionalStore';
import JournalCard from '@/components/JournalCard';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';

export default function JournalScreen() {
  const { journalEntries, hasUserCreatedContent } = useDevotionalStore();
  
  // Sort entries by date (newest first)
  const sortedEntries = [...journalEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedEntries.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState 
          message="Your journal is empty. Start reflecting on today's devotional to see entries here." 
          showWelcome={!hasUserCreatedContent}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={sortedEntries}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <JournalCard entry={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.header}>Your Reflection Journal</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingVertical: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});