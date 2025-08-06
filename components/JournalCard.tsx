import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JournalEntry } from '@/types/devotional';
import Colors from '@/constants/colors';
import { formatDisplayDate } from '@/utils/date';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface JournalCardProps {
  entry: JournalEntry;
}

export default function JournalCard({ entry }: JournalCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/journal/${entry.date}`);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.dateRow}>
          <Text style={styles.date}>{formatDisplayDate(entry.date)}</Text>
          {entry.isSample && (
            <View style={styles.sampleBadge}>
              <Text style={styles.sampleText}>Sample</Text>
            </View>
          )}
        </View>
        <Text style={styles.reference}>{entry.devotional.scriptureReference}</Text>
        <Text style={styles.preview} numberOfLines={2}>
          {entry.response}
        </Text>
      </View>
      <ChevronRight size={20} color={Colors.light.accent} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.light.accent,
  },
  sampleBadge: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  sampleText: {
    fontSize: 10,
    color: Colors.light.card,
    fontWeight: '500',
  },
  reference: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.8,
  },
});