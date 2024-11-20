import { View, type ViewProps } from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

export function ThemedView({ style, ...otherProps }: ViewProps) {
  const { theme } = useTheme();

  return <View style={[{ backgroundColor: theme.background }, style]} {...otherProps} />;
}
