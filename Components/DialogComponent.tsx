// components/DialogBox.tsx
import React from "react";
import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Button, Surface, Text } from "react-native-paper";

type DialogPosition = "top" | "bottom" | "center";
type DialogAction = {
  label: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained";
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  loading?: boolean;
};

interface DialogBoxProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  actions?: DialogAction[];
  position?: DialogPosition;
  dismissable?: boolean;
  animationDuration?: number;
  contentContainerStyle?: any;
  backgroundColor?: string;
  cornerRadius?: number;
  loading?: boolean;
}

const AnimatedView: any = Animated.View;

export default function DialogComponent({
  visible,
  title,
  children,
  onDismiss,
  actions,
  position = "center",
  dismissable = true,
  animationDuration = 300,
  contentContainerStyle,
  backgroundColor = "#fff",
  cornerRadius = 12,
  loading = false,
}: DialogBoxProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, animationDuration, scaleAnim, opacityAnim]);

  const getPositionStyle = () => {
    switch (position) {
      case "top":
        return styles.topPosition;
      case "bottom":
        return styles.bottomPosition;
      case "center":
      default:
        return styles.centerPosition;
    }
  };

  const getDialogStyle = () => {
    const baseStyle = {
      transform: [{ scale: scaleAnim }],
      opacity: opacityAnim,
    };

    return [baseStyle, getPositionStyle(), contentContainerStyle];
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Backdrop */}
        <TouchableWithoutFeedback
          onPress={dismissable ? onDismiss : undefined}
        >
          <AnimatedView
            style={[
              styles.backdrop,
              { opacity: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }) },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Dialog Content */}
        <AnimatedView style={getDialogStyle()}>
          <Surface
            style={[
              styles.dialogContent,
              {
                backgroundColor,
                borderRadius: cornerRadius,
              },
            ]}
          >
            {/* Header */}
            {title && (
              <View style={styles.header}>
                <Button labelStyle={styles.titleText}>{title}</Button>
              </View>
            )}

            {/* Body - Custom Content */}
            {loading ? (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Saving…</Text>
              </View>
            ) : (
              <ScrollView style={styles.scrollBody} contentContainerStyle={styles.body}>
                {children}
              </ScrollView>
            )}

            {/* Actions */}
            <View style={styles.actions}>
              {(actions && actions.length > 0
                ? actions
                : [
                    {
                      label: "OK",
                      onPress: onDismiss,
                      mode: "text",
                      color: undefined,
                      backgroundColor: undefined,
                      disabled: false,
                      loading: false,
                    },
                  ]
              ).map((a, idx) => (
                <Button
                  key={idx}
                  mode={a.mode === "contained" ? "contained" : "text"}
                  onPress={a.onPress}
                  disabled={a.disabled}
                  textColor={a.color}
                  buttonColor={a.mode === "contained" ? a.backgroundColor : undefined}
                  style={styles.actionBtn}
                  loading={a.loading}
                >
                  {a.label}
                </Button>
              ))}
            </View>
          </Surface>
        </AnimatedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  topPosition: {
    position: "absolute",
    top: 60,
    left: 8,
    right: 8,
    maxHeight: "80%"
  },
  bottomPosition: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "80%"
  },
  centerPosition: {
    width: "95%",
    maxWidth: 400,
    maxHeight: "80%", 
    justifyContent: "center",
    },
  dialogContent: {
    overflow: "hidden",
    flexShrink: 1,
    flexGrow: 0,
    maxHeight: "100%",
    },

    scrollBody: {
    maxHeight: "100%",
    },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 60,
    flexGrow: 1,
    },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 8,
    marginBottom: 8
  },
  actionBtn: {
    minWidth: 60,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(255,255,255,0.75)', // dim content
    zIndex: 1000,

    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    opacity: 0.8,
  },
});