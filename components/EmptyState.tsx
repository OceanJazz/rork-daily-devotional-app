import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { BookOpen, Info } from 'lucide-react-native';

interface EmptyStateProps {
  message: string;
  showWelcome?: boolean;
}

export default function EmptyState({ message, showWelcome = false }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {showWelcome && (
        <View style={styles.welcomeContainer}>
          <Info size={24} color={Colors.light.primary} style={styles.icon} />
          <Text style={styles.welcomeTitle}>Welcome to Cultivate!</Text>
          <Text style={styles.welcomeText}>
            We've added some sample journal entries and favorites to help you get started. 
            Once you create your first journal entry, the sample data will be automatically removed.
          </Text>
        </View>
      )}
      <BookOpen size={60} color={Colors.light.border} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    width: '100%',
  },
  icon: {
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.placeholder,
    textAlign: 'center',
  },
});