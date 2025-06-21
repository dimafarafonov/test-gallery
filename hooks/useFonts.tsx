import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect } from "react";

export function useFontsLoader() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return { loaded };
}
