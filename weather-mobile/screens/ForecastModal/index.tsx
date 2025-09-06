import { type TodaysForecast } from "@/services/weather/hooks/useForecast";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherCardSkeleton } from "./components/WeatherCardSkeleton";

export function ForecastModal() {
  const params = useLocalSearchParams<{ forecast: string }>();

  const parsedForecast = useMemo(() => {
    return JSON.parse(params.forecast) as TodaysForecast["forecast"];
  }, [params.forecast]);

  const navigation = useNavigation();

  useEffect(() => {
    if (!parsedForecast) {
      return;
    }
    navigation.setOptions({ title: `${parsedForecast.name}/${parsedForecast.country}`, headerShown: true });
  }, [navigation, parsedForecast]);

  const isLoading = false;
  return (
    <View style={styles.container}>
      {isLoading ? (
        <WeatherCardSkeleton cardStyle={styles.card} />
      ) : (
        <WeatherCard cardStyle={styles.card} data={parsedForecast} />
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
    alignItems: "flex-start",
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
