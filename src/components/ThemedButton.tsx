import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import React from 'react';
import { ThemedText } from './ThemedText';
import { useTheme } from '../providers/ThemeProvider';

export type ThemedIconButtonProps = TouchableOpacityProps & {
    cancelBtn?: boolean;
    children?: React.ReactNode;
};

export function ThemedButton({ style, cancelBtn, children, ...otherProps }: ThemedIconButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity 
            style={[
                { 
                    backgroundColor: theme.background,
                    justifyContent: 'center',
                    alignItems: 'center'
                }, 
                style
            ]} 
            {...otherProps}
        >
            <ThemedText style={{color: theme.text}} >{children}</ThemedText>
        </TouchableOpacity>
    );
}
