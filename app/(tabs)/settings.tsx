import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDevotionalStore } from '@/store/devotionalStore';
import Colors from '@/constants/colors';
import { Bell, Flame } from 'lucide-react-native';

export default function SettingsScreen() {
  const { notificationTime, setNotificationTime, streak } = useDevotionalStore();
  const [isEnabled, setIsEnabled] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Parse the HH:MM time string to Date object
  const getTimeAsDate = () => {
    const [hours, minutes] = notificationTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setNotificationTime(`${hours}:${minutes}`);
    }
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const formatTimeForDisplay = () => {
    const date = getTimeAsDate();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Bell size={20} color={Colors.light.text} style={styles.icon} />
            <Text style={styles.settingText}>Daily Reminder</Text>
          </View>
          <Switch
            trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={Colors.light.border}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        
        {isEnabled && (
          <TouchableOpacity 
            style={styles.timeSelector}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.timeLabel}>Notification Time</Text>
            <Text style={styles.timeValue}>{formatTimeForDisplay()}</Text>
          </TouchableOpacity>
        )}
        
        {showTimePicker && (
          <DateTimePicker
            value={getTimeAsDate()}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.streakRow}>
          <View style={styles.streakInfo}>
            <Flame size={20} color={Colors.light.timer} style={styles.icon} />
            <Text style={styles.settingText}>Current Streak</Text>
          </View>
          <Text style={styles.streakValue}>{streak.currentStreak} days</Text>
        </View>
        <View style={styles.streakRow}>
          <View style={styles.streakInfo}>
            <Flame size={20} color={Colors.light.primary} style={styles.icon} />
            <Text style={styles.settingText}>Longest Streak</Text>
          </View>
          <Text style={styles.streakValue}>{streak.longestStreak} days</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Daily Devotional App v1.1.0
        </Text>
        <Text style={styles.aboutDescription}>
          This app provides daily scripture readings and reflection prompts to help you grow in your faith journey.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  timeSelector: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  timeLabel: {
    fontSize: 14,
    color: Colors.light.placeholder,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  aboutText: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.8,
    lineHeight: 20,
  },
});