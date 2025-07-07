import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DevotionalEntry } from '@/types/devotional';
import Colors from '@/constants/colors';
import { formatDisplayDate } from '@/utils/date';
import { Heart } from 'lucide-react-native';
import { useDevotionalStore } from '@/store/devotionalStore';

interface FavoriteVerseCardProps {
  devotional: DevotionalEntry;
}

export default function FavoriteVerseCard({ devotional }: FavoriteVerseCardProps) {
  const { toggleFavorite } = useDevotionalStore();

  const handleToggleFavorite = () => {
    toggleFavorite(devotional);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDisplayDate(devotional.date)}</Text>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Heart 
            size={20} 
            color={Colors.light.timer}
            fill={Colors.light.timer}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.scriptureText}>{devotional.scriptureText}</Text>
      <Text style={styles.reference}>{devotional.scriptureReference}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
  scriptureText: {
    fontSize: 16,
    lineHeight: 24,
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
});