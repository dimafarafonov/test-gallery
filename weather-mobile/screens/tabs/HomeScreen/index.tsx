import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { useForecastHistory } from "@/hooks/useForecastHistory";
import { useForecastApi } from "@/services/weather/hooks/useForecastApi";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  const router = useRouter();
  const [city, setCity] = useState("");

  const { getTodaysForecast, isLoading } = useForecastApi();
  const {} = useForecastHistory();

  const search = useCallback(() => {
    getTodaysForecast({ city }).then(({ forecast }) => {
      if (!forecast) {
        return;
      }

      router.navigate({ pathname: "/forecast-modal", params: { forecast: JSON.stringify(forecast) } });
    });
  }, [city, getTodaysForecast, router]);

  const searchDisabled = useMemo(() => {
    return isLoading || !city;
  }, [city, isLoading]);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/search-background.jpg")}
        style={styles.imageBackground}
      >
        <Image style={styles.logo} source={require("../../../assets/images/logo.png")} />
        <View style={styles.searchView}>
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder="Search city..."
            placeholderTextColor="rgba(44,44,44,0.6)"
            returnKeyType="search"
            onSubmitEditing={search}
          />
          <TouchableOpacity onPress={search} disabled={searchDisabled}>
            <Ionicons name="search-outline" size={22} color="#203b26ff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: { width: 150, height: 150, position: "absolute", top: 100 },
  imageBackground: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2c2c2c",
    borderWidth: 1,
    borderColor: "rgba(255, 183, 94, 0.5)",
    shadowColor: "#ff9e57",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    width: "100%",
    elevation: 24,
    flexShrink: 1,
  },
  searchView: { flexDirection: "row", alignItems: "center", width: "100%", gap: 10 },
});
