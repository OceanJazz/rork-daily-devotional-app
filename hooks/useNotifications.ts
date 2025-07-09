import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const useNotifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    if (Platform.OS === 'web') {
      setNotificationsEnabled(false);
      return;
    }

    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === 'granted');
  };

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    const granted = finalStatus === 'granted';
    setNotificationsEnabled(granted);
    return granted;
  };

  const scheduleNotification = async (time: string) => {
    if (Platform.OS === 'web') {
      return;
    }

    try {
      // Cancel any existing notifications first
      await Notifications.cancelAllScheduledNotificationsAsync();

      const [hours, minutes] = time.split(':').map(Number);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time for Your Daily Devotional',
          body: 'Take a moment to reflect on today\'s scripture and journal your thoughts.',
          sound: true,
        },
        trigger: {
          type: 'calendar',
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      });

      console.log(`Daily notification scheduled for ${time}`);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const cancelNotification = async () => {
    if (Platform.OS === 'web') {
      return;
    }

    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  };

  return {
    notificationsEnabled,
    requestPermission,
    scheduleNotification,
    cancelNotification,
  };
};