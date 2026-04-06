import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  useWindowDimensions,
  Animated,
  View,
  UIManager,
  Keyboard,
  LayoutAnimation,
  TouchableWithoutFeedback,
  ImageSourcePropType
} from 'react-native';

import {
  Button,
  Card,
  Text,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';
import AlertMessage, { AlertType } from '@/Components/AlertMessage';
import RNInput from '../RNInput';
import Captcha from '../Capcha';

interface LoginComponentProps {
  showCaptcha?: boolean;
  logoSource?: ImageSourcePropType;
  onLogin?: (username: string, password: string) => Promise<any>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ showCaptcha = true, logoSource, onLogin }) => {
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    visible: boolean;
    message: string;
    type?: AlertType;
  }>({
    visible: false,
    message: '',
    type: undefined,
  });
  const [error, setError] = useState<string | null>(null);

  const [typedCaptcha, setTypedCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  const { height, width } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= 768;

  const transitionAnim = useRef(new Animated.Value(isLandscape ? 1 : 0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.timing(transitionAnim, {
      toValue: isLandscape ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isLandscape]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 400,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isLandscape]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const imageSize = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 200],
  });

  const headingSize = width < 360 ? 26 : width > 768 ? 34 : 30;
  const subtitleSize = width < 360 ? 14 : width > 768 ? 18 : 16;

  const login = async (user: string, pass: string) => {
    if (!user.trim()) {
      setAlert({
        visible: true,
        message: "Please enter a username.",
        type: "error"
      });
      setError("Please enter a username.");
      return;
    }
    if (!pass.trim()) {
      setAlert({
        visible: true,
        message: "Please enter a password.",
        type: "error"
      });
      setError("Please enter a password.");
      return;
    }

    if (showCaptcha && typedCaptcha.trim() !== generatedCaptcha.trim()) {
      setAlert({
        visible: true,
        message: "Invalid Captcha",
        type: "error"
      });
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const res = onLogin ? await onLogin(user, pass) : null;

      if (res.userID != null) {
        setAlert({
          visible: true,
          message: "Login Success",
          type: "success"
        });
      } else {
        setAlert({
          visible: true,
          message: "Invalid Credential",
          type: "error"
        })
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: '#fff' }]}>
        <ActivityIndicator animating size="large" color={colors.primary} />
        <Text variant="titleMedium" style={{ marginTop: 10, color: '#000' }}>
          Logging in...
        </Text>
      </View>
    );
  }

  const buttonTextColor = '#fff';

  return (
    <>
    <AlertMessage
      visible={alert.visible}
      message={alert.message}
      type={alert.type}
      onDismiss={() =>
        setAlert({
          visible: false,
          message: '',
          type: undefined,
        })
      }
    />
      {isLandscape ? (
        <View style={[styles.container, styles.containerLandscape, { backgroundColor: '#F2F2F2' }]}>
          <Card
            style={[
              styles.card,
              styles.shadow,
              styles.cardLandscape,
              isTablet && styles.cardTablet,
              { backgroundColor: '#fff' },
            ]}
            mode="elevated"
          >
            <View style={[styles.landscapeRow]}>
              <View style={styles.logoContainerLandscape}>
                {logoSource && (
                  <Image
                    source={logoSource}
                    style={{
                      width: imageSize,
                      height: imageSize,
                      alignSelf: 'center',
                      marginBottom: 20,
                    }}
                    resizeMode="contain"
                  />
                )}
              </View>

              <View style={{ flex: 1, justifyContent: 'center', opacity: formOpacity, transform: [{ translateY: formTranslateY }] }}>
                <Text style={[styles.title, { color: colors.primary, fontSize: headingSize }]}>Welcome</Text>
                <Text style={[styles.subtitle, { fontSize: subtitleSize, color: '#757575' }]}>Please login to your account</Text>

                <RNInput
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  icon="account"
                  error={error || undefined}
                />

                <RNInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  icon="lock"
                  variant='password'
                  error={error || undefined}
                />

                {showCaptcha && (
                  <Captcha
                    onChange={(v) => setTypedCaptcha(v)}
                    captchaValue={(c) => setGeneratedCaptcha(c)}
                  />
                )}

                <Button
                  mode="contained"
                  onPress={() => login(username, password)}
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  contentStyle={styles.buttonContent}
                  textColor={buttonTextColor}
                >
                  Login
                </Button>
              </View>
            </View>
          </Card>
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <Card style={[styles.card, styles.shadow, isTablet && styles.cardTablet, { backgroundColor: '#fff' }]} mode="elevated">
                  <Card.Content>
                    <View style={styles.logoContainerPortrait}>
                      {logoSource && (
                        <Image
                          source={logoSource}
                          style={{ width: 200, height: 100, marginBottom: 5 }}
                          resizeMode="contain"
                        />
                      )}
                    </View>

                    <Text style={[styles.title, { color: colors.primary, fontSize: headingSize }]}>Welcome</Text>
                    <Text style={[styles.subtitle, { fontSize: subtitleSize, color: '#757575' }]}>Please login to your account</Text>

                    <RNInput
                      label="Username"
                      value={username}
                      onChangeText={setUsername}
                      icon="account"
                      error={error || undefined}
                    />

                    <RNInput
                      label="Password"
                      value={password}
                      onChangeText={setPassword}
                      icon="lock"
                      variant="password"
                      error={error || undefined}
                    />

                    {showCaptcha && (
                      <Captcha
                        onChange={(v) => setTypedCaptcha(v)}
                        captchaValue={(c) => setGeneratedCaptcha(c)}
                      />
                    )}

                    <Button
                      mode="contained"
                      onPress={() => login(username, password)}
                      style={[styles.button, { backgroundColor: colors.primary }]}
                      contentStyle={styles.buttonContent}
                      textColor={buttonTextColor}
                    >
                      Login
                    </Button>
                  </Card.Content>
                </Card>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  containerLandscape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 20,
    padding: 15,
  },
  cardLandscape: {
    width: '90%',
    maxWidth: 800,
  },
  cardTablet: {
    alignSelf: 'center',
    minWidth: 600,
  },
  landscapeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  logoContainerPortrait: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logoContainerLandscape: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    borderRadius: 12,
  },
  button: {
    marginTop: 4,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  shadow: {
    ...Platform.select({
      android: { elevation: 6 },
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6 },
    }),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginComponent;