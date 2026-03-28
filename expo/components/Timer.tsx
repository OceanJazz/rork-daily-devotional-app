import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import Colors, { responsive } from '@/constants/colors';

interface TimerProps {
  initialMinutes?: number;
}

export default function Timer({ initialMinutes = 5 }: TimerProps) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialMinutes * 60);
  };

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime()}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleTimer} style={styles.button}>
          {isActive ? (
            <Pause size={24} color={Colors.light.text} />
          ) : (
            <Play size={24} color={Colors.light.text} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={styles.button}>
          <RotateCcw size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: responsive.spacing.lg,
  },
  timerText: {
    fontSize: Platform.OS === 'web' ? responsive.fontSize.timer * 0.75 : responsive.fontSize.timer,
    fontWeight: 'bold',
    color: Colors.light.timer,
    marginBottom: responsive.spacing.sm,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.light.border,
    padding: responsive.spacing.md,
    borderRadius: 30,
    marginHorizontal: responsive.spacing.sm,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
});