import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDevotionalStore } from '@/store/devotionalStore';
import Colors from '@/constants/colors';
import { Flame } from 'lucide-react-native';

export default function StreakTracker() {
  const { streak } = useDevotionalStore();
  
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
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
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
    marginRight: 12,
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  streakLabel: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.light.border,
    marginHorizontal: 16,
  },
  bestStreakBox: {
    flex: 1,
    alignItems: 'center',
  },
  bestStreakLabel: {
    fontSize: 14,
    color: Colors.light.placeholder,
  },
  bestStreakCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
});