import { SplashScreen } from "expo-router";
import { useAuth } from "@/providers/auth/hooks/useAuth";

export function SplashScreenController() {
  const { isLoading } = useAuth();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
