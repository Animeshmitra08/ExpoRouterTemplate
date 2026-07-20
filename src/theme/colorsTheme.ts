import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

const brand = {
  primary: "#035283ff",
  secondary: "#6cbb3d",
  tertiary: "#6cbb3d",

  success: "#6cbb3d",
  info: "#016099",
  warning: "#ffa500",
  error: "#ff0000",

  background: "#f4f4f4",
  surface: "#3c8516ff",

  appbarBackground: "#6cbb3d",
  appbarText: "#ffffff",

  drawerBackground: "#016099",
  drawerText: "#ffffff",
  drawerIcon: "#ffffff",

  textPrimary: "#212121",
  textSecondary: "#757575",

  actionDisabled: "#d3d3d3",
  actionDisabledBackground: "#f4f4f4",
};


export const CustomLightTheme = {
  ...MD3LightTheme,
  roundness: 8,
  colors: {
    ...MD3LightTheme.colors,

    // PRIMARY
    primary: brand.primary,
    onPrimary: "#ffffff",
    primaryContainer: "#cce3f1",
    onPrimaryContainer: "#00344f",

    // SECONDARY
    secondary: brand.secondary,
    onSecondary: "#ffffff",
    secondaryContainer: "#daf0c9",
    onSecondaryContainer: "#1f3d0f",

    // TERTIARY
    tertiary: brand.tertiary,
    onTertiary: "#ffffff",
    tertiaryContainer: "#daf0c9",
    onTertiaryContainer: "#1f3d0f",

    // BACKGROUND & SURFACE
    background: brand.background,
    onBackground: brand.textPrimary,

    surface: brand.surface,
    onSurface: brand.textPrimary,
    surfaceVariant: "#e0e0e0",
    onSurfaceVariant: brand.textSecondary,

    // OUTLINE
    outline: "#bdbdbd",
    outlineVariant: "#e0e0e0",

    // ERROR
    error: brand.error,
    onError: "#ffffff",
    errorContainer: "#ffd6d6",
    onErrorContainer: "#7a0000",

    // DISABLED STATES
    surfaceDisabled: brand.actionDisabledBackground,
    onSurfaceDisabled: brand.actionDisabled,

    // INVERSE
    inverseSurface: "#212121",
    inverseOnSurface: "#ffffff",
    inversePrimary: "#8cc9ff",

    shadow: "rgba(0,0,0,0.2)",

    // CUSTOM (non-MD3 but useful)
    success: brand.success,
    info: brand.info,
    warning: brand.warning,

    appbarBackground: brand.appbarBackground,
    appbarText: brand.appbarText,

    drawerBackground: brand.drawerBackground,
    drawerText: brand.drawerText,
    drawerIcon: brand.drawerIcon,
  },
};


export const CustomDarkTheme = {
  ...MD3DarkTheme,
  roundness: 10,
  colors: {
    ...MD3DarkTheme.colors,

    // PRIMARY (Cool Blue)
    primary: "#5ab4f8",
    onPrimary: "#00344f",
    primaryContainer: "#004b73",
    onPrimaryContainer: "#cfe9ff",

    // SECONDARY (Fresh Green)
    secondary: "#7ed957",
    onSecondary: "#163d0a",
    secondaryContainer: "#245c12",
    onSecondaryContainer: "#d6f5c9",

    // TERTIARY (Purple Accent for contrast)
    tertiary: "#c58af9",
    onTertiary: "#3b0a57",
    tertiaryContainer: "#5a1c7d",
    onTertiaryContainer: "#f2d9ff",

    // BACKGROUND & SURFACE (Layered Dark)
    background: "#0f1115",
    onBackground: "#e6e6e6",

    surface: "#161a20",
    onSurface: "#ffffff",
    surfaceVariant: "#222831",
    onSurfaceVariant: "#aab2bf",

    // OUTLINE
    outline: "#6b7280",
    outlineVariant: "#3a3f47",

    // ERROR
    error: "#ff6b6b",
    onError: "#3a0000",
    errorContainer: "#7a0000",
    onErrorContainer: "#ffd6d6",

    // DISABLED
    surfaceDisabled: "#1f242c",
    onSurfaceDisabled: "#6b7280",

    // INVERSE
    inverseSurface: "#e6e6e6",
    inverseOnSurface: "#1a1a1a",
    inversePrimary: "#0066cc",

    shadow: "rgba(0,0,0,0.8)",

    // CUSTOM (keep your brand)
    success: brand.success,
    info: brand.info,
    warning: brand.warning,

    // APPBAR (use primary container for consistency)
    appbarBackground: "#004b73",
    appbarText: "#ffffff",

    // DRAWER (deep blue for identity)
    drawerBackground: "#313131",
    drawerText: "#e6e6e6",
    drawerIcon: "#9ad1ff",
  },
};