import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, Platform, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDevotionalStore } from '@/store/devotionalStore';
import { useNotifications } from '@/hooks/useNotifications';
import Colors, { responsive } from '@/constants/colors';
import { Bell, Flame } from 'lucide-react-native';

// Conditionally import DateTimePicker only for mobile
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

export default function SettingsScreen() {
  const { notificationTime, setNotificationTime, streak } = useDevotionalStore();
  const { 
    notificationsEnabled, 
    requestPermission, 
    scheduleNotification, 
    cancelNotification 
  } = useNotifications();
  
  const [isEnabled, setIsEnabled] = useState(notificationsEnabled);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    setIsEnabled(notificationsEnabled);
  }, [notificationsEnabled]);

  // Parse the HH:MM time string to Date object
  const getTimeAsDate = () => {
    const [hours, minutes] = notificationTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleTimeChange = async (event: any, selectedDate?: Date) => {
    // For Android, hide picker immediately
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      const newTime = `${hours}:${minutes}`;
      setNotificationTime(newTime);
      
      // Reschedule notification with new time
      if (isEnabled) {
        await cancelNotification();
        await scheduleNotification(newTime);
      }
    }
  };

  const handleTimePickerDone = () => {
    setShowTimePicker(false);
  };

  const toggleSwitch = async () => {
    if (!isEnabled) {
      // Turning on notifications
      const hasPermission = await requestPermission();
      if (hasPermission) {
        await scheduleNotification(notificationTime);
        setIsEnabled(true);
        Alert.alert(
          'Notifications Enabled',
          `You'll receive daily reminders at ${formatTimeForDisplay()}`
        );
      } else {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive daily reminders.'
        );
      }
    } else {
      // Turning off notifications
      await cancelNotification();
      setIsEnabled(false);
      Alert.alert('Notifications Disabled', 'Daily reminders have been turned off.');
    }
  };

  const formatTimeForDisplay = () => {
    const date = getTimeAsDate();
    return date.toLocaleTimeString([], { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleTimePress = async () => {
    if (Platform.OS === 'web') {
      // For web, show a simple input
      const newTime = prompt('Enter time (HH:MM format, 24-hour):', notificationTime);
      if (newTime && /^\d{1,2}:\d{2}$/.test(newTime)) {
        const [hours, minutes] = newTime.split(':').map(Number);
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          setNotificationTime(formattedTime);
          if (isEnabled) {
            await cancelNotification();
            await scheduleNotification(formattedTime);
          }
        }
      }
    } else {
      setShowTimePicker(true);
    }
  };

  const renderTimePicker = () => {
    if (!DateTimePicker || Platform.OS === 'web') return null;

    if (Platform.OS === 'ios') {
      return (
        <Modal
          visible={showTimePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity 
                  onPress={() => setShowTimePicker(false)}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Set Reminder Time</Text>
                <TouchableOpacity 
                  onPress={handleTimePickerDone}
                  style={styles.modalButton}
                >
                  <Text style={[styles.modalButtonText, styles.doneButton]}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={getTimeAsDate()}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={handleTimeChange}
                  style={styles.timePicker}
                  textColor={Colors.light.text}
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    } else {
      // Android - shows native picker
      return showTimePicker ? (
        <DateTimePicker
          value={getTimeAsDate()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      ) : null;
    }
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
            onPress={handleTimePress}
            activeOpacity={0.7}
          >
            <Text style={styles.timeLabel}>Notification Time</Text>
            <Text style={styles.timeValue}>{formatTimeForDisplay()}</Text>
          </TouchableOpacity>
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
          Cultivate v1.1.0
        </Text>
        <Text style={styles.aboutDescription}>
          Cultivate provides daily scripture readings and reflection prompts to help you grow in your faith journey.
        </Text>
      </View>

      {renderTimePicker()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: responsive.horizontalPadding,
    maxWidth: responsive.maxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  section: {
    marginBottom: responsive.spacing.xl,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: responsive.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: responsive.spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsive.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakValue: {
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
    color: Colors.light.text,
  },
  icon: {
    marginRight: responsive.spacing.md,
  },
  settingText: {
    fontSize: responsive.fontSize.medium,
    color: Colors.light.text,
  },
  timeSelector: {
    marginTop: responsive.spacing.md,
    paddingVertical: responsive.spacing.md,
    paddingHorizontal: responsive.spacing.md,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  timeLabel: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.placeholder,
    marginBottom: responsive.spacing.xs,
  },
  timeValue: {
    fontSize: responsive.fontSize.large,
    color: Colors.light.text,
    fontWeight: '600',
  },
  aboutText: {
    fontSize: responsive.fontSize.medium,
    color: Colors.light.text,
    marginBottom: responsive.spacing.sm,
  },
  aboutDescription: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.text,
    opacity: 0.8,
    lineHeight: responsive.fontSize.small * 1.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.spacing.lg,
    paddingVertical: responsive.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  modalTitle: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: Colors.light.text,
  },
  modalButton: {
    paddingVertical: responsive.spacing.sm,
    paddingHorizontal: responsive.spacing.md,
  },
  modalButtonText: {
    fontSize: responsive.fontSize.medium,
    color: Colors.light.primary,
  },
  doneButton: {
    fontWeight: '600',
  },
  pickerContainer: {
    paddingVertical: responsive.spacing.lg,
    paddingBottom: 34, // Safe area padding for iOS
  },
  timePicker: {
    height: 200,
    backgroundColor: 'transparent',
  },
});