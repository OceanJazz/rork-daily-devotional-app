import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDevotionalStore } from '@/store/devotionalStore';
import Colors from '@/constants/colors';
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
    marginHorizontal: 16,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: 16,
    minHeight: 150,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});