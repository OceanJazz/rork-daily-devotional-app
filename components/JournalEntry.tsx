import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDevotionalStore } from '@/store/devotionalStore';
import Colors, { responsive } from '@/constants/colors';
import { getTodayDate } from '@/utils/date';
import { Save } from 'lucide-react-native';

export default function JournalEntry() {
  const { addJournalEntry, getJournalEntryForDate } = useDevotionalStore();
  const [response, setResponse] = useState('');
  
  useEffect(() => {
    const today = getTodayDate();
    const savedEntry = getJournalEntryForDate(today);
    if (savedEntry) {
      setResponse(savedEntry.response);
    }
  }, [getJournalEntryForDate]);

  const handleSave = () => {
    addJournalEntry(response);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reflection</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your thoughts here..."
        placeholderTextColor={Colors.light.placeholder}
        value={response}
        onChangeText={setResponse}
        textAlignVertical="top"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Save size={20} color="#FFF" />
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: responsive.spacing.sm,
  },
  title: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: responsive.spacing.sm,
  },
  input: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: responsive.spacing.md,
    minHeight: 150,
    fontSize: responsive.fontSize.medium,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: responsive.spacing.md,
    paddingHorizontal: responsive.spacing.lg,
    alignSelf: 'flex-end',
    marginTop: responsive.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: responsive.spacing.sm,
    fontSize: responsive.fontSize.medium,
  },
});