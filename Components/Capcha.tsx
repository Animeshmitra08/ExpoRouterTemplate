// components/Captcha.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GenerateCaptcha from "@/src/utils/GenerateCaptcha";

interface CaptchaProps {
  onChange?: (value: string) => void;
  captchaValue?: (captcha: string) => void;
}

export default function Captcha({ onChange, captchaValue }: CaptchaProps) {
  const [captcha, setCaptcha] = useState(GenerateCaptcha());
  const [input, setInput] = useState("");

  const refreshCaptcha = () => {
    const newCaptcha = GenerateCaptcha(captcha.raw);
    setCaptcha(newCaptcha);
    setInput("");
    onChange?.("");
    captchaValue?.(newCaptcha.raw);
  };

  useEffect(() => {
    captchaValue?.(captcha.raw); // send raw captcha to parent on mount
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Captcha + Refresh */}
      <View style={styles.captchaRow}>
        <View style={styles.captchaBox}>
          <Text style={styles.captchaText}>{captcha.styled}</Text>
        </View>

        <TouchableOpacity style={styles.refreshBtn} onPress={refreshCaptcha}>
          <Ionicons name="refresh" size={22} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Input Field */}
      <TextInput
        value={input}
        onChangeText={(txt) => {
          setInput(txt);
          onChange?.(txt);
        }}
        placeholder="Enter captcha"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 12,
  },
  captchaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  captchaBox: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f3f6ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d0d7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  captchaText: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#2a2a72",
  },
  refreshBtn: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 17,
  },
});