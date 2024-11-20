import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { lightTheme, darkTheme, Theme, ThemeName } from '../constants/Themes'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: (newTheme: ThemeName) => void;
    currentTheme: ThemeName;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('system');

    const systemTheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? darkTheme : lightTheme);

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = (await AsyncStorage.getItem('theme')) as ThemeName | null;

            if (savedTheme) {
                setCurrentTheme(savedTheme);
                applyTheme(savedTheme, systemTheme);
            } else {
                applyTheme('system', systemTheme);
            }
        };

        loadTheme();

        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            if (currentTheme === 'system') {
                applyTheme('system', colorScheme);
            }
        });

        return () => listener.remove();
    }, [currentTheme]);

    const applyTheme = (themeType: ThemeName, systemTheme: ColorSchemeName | null) => {
        switch (themeType) {
            case 'dark':
                setTheme(darkTheme);
                break;
            case 'light':
                setTheme(lightTheme);
                break;
            case 'system':
                setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
                break;
        }
    };

    const toggleTheme = async (newTheme: ThemeName) => {
        const systemTheme = Appearance.getColorScheme();
        setCurrentTheme(newTheme);
        applyTheme(newTheme, systemTheme);
        await AsyncStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
