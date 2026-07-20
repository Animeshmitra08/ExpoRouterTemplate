import { useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

type AppTheme = MD3Theme & {
  colors: MD3Theme['colors'] & {
    success: string;
    info: string;
    warning: string;

    appbarBackground: string;
    appbarText: string;

    drawerBackground: string;
    drawerText: string;
    drawerIcon: string;
  };
};

export const useAppTheme = () => useTheme<AppTheme>();