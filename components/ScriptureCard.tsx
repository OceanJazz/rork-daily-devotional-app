import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DevotionalEntry } from '@/types/devotional';
import Colors from '@/constants/colors';
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
        <Text style={styles.promptTitle}>Today's Reflection</Text>
        <Text style={styles.promptText}>{devotional.questionPrompt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
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
    marginBottom: 12,
  },
  date: {
    fontSize: 14,
    color: Colors.light.accent,
  },
  favoriteButton: {
    padding: 4,
  },
  scriptureContainer: {
    marginBottom: 20,
  },
  scriptureText: {
    fontSize: 18,
    lineHeight: 26,
    color: Colors.light.text,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  promptContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 16,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
});