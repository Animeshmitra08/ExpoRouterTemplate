import { AlertProvider } from '@/src/services/AlertContext';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {

  return (
    <>
    <AlertProvider>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }} edges={['bottom', 'left', 'right']}> */}
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      {/* </SafeAreaView> */}
    </AlertProvider>
    </>
  );
}
