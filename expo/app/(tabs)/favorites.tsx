import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDevotionalStore } from '@/store/devotionalStore';
import EmptyState from '@/components/EmptyState';
import Colors, { responsive } from '@/constants/colors';
import FavoriteVerseCard from '@/components/FavoriteVerseCard';

export default function FavoritesScreen() {
  const { favoriteVerses, hasUserCreatedContent } = useDevotionalStore();
  
  // Sort favorites by date (newest first)
  const sortedFavorites = [...favoriteVerses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedFavorites.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState 
          message="You haven't saved any favorite verses yet. Tap the heart icon on a verse to add it to your favorites." 
          showWelcome={!hasUserCreatedContent}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={sortedFavorites}
        keyExtractor={(item, index) => `${item.date}-${item.scriptureReference}-${index}`}
        renderItem={({ item }) => <FavoriteVerseCard devotional={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.header}>Your Favorite Verses</Text>
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
    paddingVertical: responsive.spacing.md,
    paddingHorizontal: responsive.horizontalPadding,
    maxWidth: responsive.maxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: responsive.spacing.md,
  },
});