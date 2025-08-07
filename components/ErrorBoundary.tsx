import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors, { responsive } from '@/constants/colors';
import { RefreshCw } from 'lucide-react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to crash reporting service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          We&apos;re sorry, but something unexpected happened. Please try again.
        </Text>
        {__DEV__ && error && (
          <Text style={styles.errorDetails}>{error.message}</Text>
        )}
        <TouchableOpacity style={styles.retryButton} onPress={retry}>
          <RefreshCw size={20} color={Colors.light.background} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.horizontalPadding,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: responsive.fontSize.large,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: responsive.spacing.md,
    textAlign: 'center',
  },
  message: {
    fontSize: responsive.fontSize.medium,
    color: Colors.light.placeholder,
    textAlign: 'center',
    marginBottom: responsive.spacing.xl,
    lineHeight: 22,
  },
  errorDetails: {
    fontSize: responsive.fontSize.small,
    color: Colors.light.timer,
    textAlign: 'center',
    marginBottom: responsive.spacing.lg,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: responsive.spacing.xl,
    paddingVertical: responsive.spacing.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsive.spacing.sm,
  },
  retryText: {
    color: Colors.light.background,
    fontSize: responsive.fontSize.medium,
    fontWeight: '600',
  },
});

export default ErrorBoundary;