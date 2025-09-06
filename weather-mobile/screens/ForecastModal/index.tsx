import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherCardSkeleton } from "./components/WeatherCardSkeleton";

export function ForecastModal() {
  const params = useLocalSearchParams<{ city?: string }>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: params?.city, headerShown: true });
  }, [navigation, params.city]);

  const mockWeatherData = {
    temp: "27",
    min: "22",
    description: "Partly Cloudy",
    max: "30",
    wind: "3.5",
  };
  const isLoading = true;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <WeatherCardSkeleton cardStyle={styles.card} />
      ) : (
        <WeatherCard cardStyle={styles.card} data={mockWeatherData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 183, 94, 0.15)",
    borderRadius: 20,
    padding: 20,
    margin: 15,
    alignItems: "center",
    shadowColor: "#ff9e57",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2c2c2c",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: "#444",
    marginLeft: 6,
  },
  minmax: {
    fontSize: 16,
    color: "#555",
    marginLeft: 6,
  },
  wind: {
    fontSize: 16,
    color: "#555",
    marginLeft: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
});
