import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, useColorScheme, View } from 'react-native';
import { ActivityIndicator, Icon, PaperProvider } from 'react-native-paper';
import DrawerNavigator from '../(drawer)/DrawerNavigator';
import { CustomDarkTheme, CustomLightTheme } from '@/src/theme/colorsTheme';
import LoginComponent from '@/Components/Authentication/LoginComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TabsLayout() {
  const colorScheme = useColorScheme();

  const colorTheme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  const handleLogin = async (username: string, password: string) => {
    // Simulate an API call for authentication
    return new Promise<{ userID: string | null }>((resolve) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          resolve({ userID: '12345' });
        } else {
          resolve({ userID: null });
        }
      }, 1000);
    });
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={colorTheme}>
        {/* <LoginComponent onLogin={handleLogin} showCaptcha={false} logoSource={require("@/assets/images/icon.png")}/> */}
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }} edges={['bottom', 'left', 'right']}>
          <DrawerNavigator />
        </SafeAreaView>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}