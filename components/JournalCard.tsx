import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JournalEntry } from '@/types/devotional';
import Colors, { responsive } from '@/constants/colors';
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
    padding: responsive.spacing.md,
    marginVertical: responsive.spacing.sm,
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
    marginBottom: responsive.spacing.xs,
  },
  date: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.accent,
  },
  sampleBadge: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: responsive.spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: responsive.spacing.sm,
  },
  sampleText: {
    fontSize: 10,
    color: Colors.light.card,
    fontWeight: '500',
  },
  reference: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: responsive.spacing.sm,
  },
  preview: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.text,
    opacity: 0.8,
  },
});