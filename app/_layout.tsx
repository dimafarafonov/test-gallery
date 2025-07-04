import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { useFontsLoader } from "@/hooks/useFonts";
import { AuthProvider } from "@/providers/auth/AuthProvider";
import { SplashScreenController } from "@/controllers/SplashScreenController";
import { useAuth } from "@/providers/auth/hooks/useAuth";
import { store } from "@/lib/storage/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loaded } = useFontsLoader();
  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <SplashScreenController />
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const { session, isLoading } = useAuth();

  //Without this, we would see login screen if logged in while transitioning
  if (isLoading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerTitle: "Profile" }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="auth/sign-in" options={{ headerTitle: "Sign in" }} />
        <Stack.Screen name="auth/sign-up" options={{ headerTitle: "Sign up" }} />
      </Stack.Protected>
    </Stack>
  );
}
