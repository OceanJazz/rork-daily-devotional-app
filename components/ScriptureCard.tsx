import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DevotionalEntry } from '@/types/devotional';
import Colors, { responsive } from '@/constants/colors';
import { formatDisplayDate } from '@/utils/date';
import { Heart } from 'lucide-react-native';
import { useDevotionalStore } from '@/store/devotionalStore';

interface ScriptureCardProps {
  devotional: DevotionalEntry;
}

export default function ScriptureCard({ devotional }: ScriptureCardProps) {
  const { toggleFavorite, favoriteVerses } = useDevotionalStore();
  
  if (!devotional) return null;
  
  const isFavorite = favoriteVerses.some(fav => 
    fav.date === devotional.date && fav.scriptureReference === devotional.scriptureReference
  );

  const handleToggleFavorite = () => {
    toggleFavorite(devotional);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDisplayDate(devotional.date)}</Text>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Heart 
            size={24} 
            color={isFavorite ? Colors.light.timer : Colors.light.border}
            fill={isFavorite ? Colors.light.timer : 'none'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scriptureContainer}>
        <Text style={styles.scriptureText}>{devotional.scriptureText}</Text>
        <Text style={styles.reference}>{devotional.scriptureReference}</Text>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptTitle}>Today&apos;s Reflection</Text>
        <Text style={styles.promptText}>{devotional.questionPrompt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: responsive.cardPadding,
    marginVertical: responsive.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.spacing.md,
  },
  date: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.accent,
  },
  favoriteButton: {
    padding: responsive.spacing.xs,
  },
  scriptureContainer: {
    marginBottom: responsive.spacing.lg,
  },
  scriptureText: {
    fontSize: responsive.fontSize.large,
    lineHeight: responsive.fontSize.large * 1.4,
    color: Colors.light.text,
    marginBottom: responsive.spacing.sm,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: responsive.fontSize.medium,
    color: Colors.light.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  promptContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: responsive.spacing.md,
  },
  promptTitle: {
    fontSize: responsive.fontSize.medium,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: responsive.spacing.sm,
  },
  promptText: {
    fontSize: responsive.fontSize.medium,
    lineHeight: responsive.fontSize.medium * 1.5,
    color: Colors.light.text,
  },
});