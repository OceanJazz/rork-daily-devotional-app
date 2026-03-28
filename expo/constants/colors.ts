import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const isTablet = screenWidth >= 768;
export const isLargeTablet = screenWidth >= 1024;

export const responsive = {
  // Responsive padding based on screen size
  horizontalPadding: isTablet ? 40 : 16,
  verticalPadding: isTablet ? 30 : 20,
  cardPadding: isTablet ? 24 : 20,
  
  // Responsive font sizes
  fontSize: {
    small: isTablet ? 16 : 14,
    medium: isTablet ? 18 : 16,
    large: isTablet ? 22 : 18,
    xlarge: isTablet ? 28 : 24,
    timer: isTablet ? 56 : 48,
  },
  
  // Responsive spacing
  spacing: {
    xs: isTablet ? 6 : 4,
    sm: isTablet ? 12 : 8,
    md: isTablet ? 18 : 12,
    lg: isTablet ? 24 : 16,
    xl: isTablet ? 36 : 24,
  },
  
  // Maximum content width for tablets
  maxContentWidth: isLargeTablet ? 800 : screenWidth,
};

export default {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#8EAED9', // Soft blue
    secondary: '#F8C4B4', // Soft peach
    accent: '#5D7CA6',
    border: '#E5E5E5',
    timer: '#FF6B6B',
    placeholder: '#AAAAAA',
    card: '#F9F9F9',
  }
};