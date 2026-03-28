import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDevotionalStore } from '@/store/devotionalStore';
import Colors, { responsive } from '@/constants/colors';
import { Flame } from 'lucide-react-native';

export default function StreakTracker() {
  const { streak, updateStreak } = useDevotionalStore();
  
  // Update streak when component mounts to ensure it's current
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);
  
  return (
    <View style={styles.container}>
      <View style={styles.streakBox}>
        <Flame size={24} color={Colors.light.timer} style={styles.icon} />
        <View>
          <Text style={styles.streakCount}>{streak.currentStreak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.bestStreakBox}>
        <Text style={styles.bestStreakLabel}>Best</Text>
        <Text style={styles.bestStreakCount}>{streak.longestStreak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: responsive.spacing.md,
    marginTop: responsive.spacing.lg,
    marginBottom: responsive.spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  streakBox: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: responsive.spacing.md,
  },
  streakCount: {
    fontSize: responsive.fontSize.xlarge,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  streakLabel: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.placeholder,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.light.border,
    marginHorizontal: responsive.spacing.md,
  },
  bestStreakBox: {
    flex: 1,
    alignItems: 'center',
  },
  bestStreakLabel: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.placeholder,
  },
  bestStreakCount: {
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});