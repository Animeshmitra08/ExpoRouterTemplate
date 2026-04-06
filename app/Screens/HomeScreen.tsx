import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import DialogComponent from "@/Components/DialogComponent";

const HomeScreen = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.dark ? "light" : "dark"} />

      <Text style={[styles.title, { color: theme.colors.primary }]}>
        HOME SCREEN
      </Text>

      <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>
        Make changes to this screen from app/Screens/HomeScreen.tsx
      </Text>

      <Button mode="contained" onPress={() => setOpenDialog(true)} style={{ marginTop: 20 }}>
        Open Dialog
      </Button>


      <DialogComponent
        visible={openDialog}
        title="Welcome to the Home Screen"
        onDismiss={() => setOpenDialog(false)}
        dismissable={false}
        actions={[
          { label: "OK", onPress: () => setOpenDialog(false) }
        ]}
      >
        <Text>This is a dialog component. You can customize it as needed.</Text>
      </DialogComponent>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
