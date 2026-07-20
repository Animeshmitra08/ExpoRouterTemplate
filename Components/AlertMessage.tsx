import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  type?: AlertType;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

const getAlertStyle = (type: AlertType | string) => {
  switch (type) {
    case 'success':
      return {
        icon: 'check-circle',
        backgroundColor: '#e6f4ea',
        borderColor: '#2e7d32',
        iconColor: '#2e7d32',
      };
    case 'error':
      return {
        icon: 'alert-circle',
        backgroundColor: '#fdecea',
        borderColor: '#d32f2f',
        iconColor: '#d32f2f',
      };
    case 'warning':
      return {
        icon: 'alert',
        backgroundColor: '#fff8e1',
        borderColor: '#f9a825',
        iconColor: '#f9a825',
      };
    case 'info':
    default:
      return {
        icon: 'information',
        backgroundColor: '#e3f2fd',
        borderColor: '#1976d2',
        iconColor: '#1976d2',
      };
  }
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  visible,
  message,
  onDismiss,
  type = 'info',
  duration = 2000,
  style,
}) => {
  const alertStyle = getAlertStyle(type);
  const insets = useSafeAreaInsets();

  const slideAnim = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(onDismiss);
    }, duration);

    return () => clearTimeout(timeout);
  }, [visible, duration, onDismiss]);


  if (!visible) return null;

  return (
    <Animated.View
      style={StyleSheet.flatten([
        styles.container,
        {
          top: insets.top + 8, // 🔥 safe-area offset
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
        style,
      ])}
    >
      <Card
        style={[
          styles.card,
          {
            borderLeftColor: alertStyle.borderColor,
            backgroundColor: alertStyle.backgroundColor,
          },
        ]}
        mode="elevated"
      >
        <Card.Content style={styles.content}>
          <IconButton
            icon={alertStyle.icon}
            iconColor={alertStyle.iconColor}
            size={24}
            style={styles.icon}
          />
          <Text style={styles.message}>{message}</Text>
          <IconButton
            icon="close"
            size={20}
            iconColor="#555"
            onPress={onDismiss}
            style={styles.closeIcon}
          />
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  card: {
    borderLeftWidth: 5,
    borderRadius: 12,
    // height: 65,
    elevation: 4,
  },
  content: {
    // minHeight: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 4,
  },
  message: {
    flex: 1,
    fontSize: 14,
    flexWrap: 'wrap',
  },
  closeIcon: {
    marginLeft: 4,
  },
});

export default AlertMessage;