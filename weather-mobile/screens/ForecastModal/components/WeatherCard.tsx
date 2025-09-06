import { TodaysForecast } from "@/services/weather/hooks/useForecastApiApi";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { WeatherCardBase } from "./types";

type Props = {
  data: TodaysForecast["forecast"];
};

export const WeatherCard = ({ cardStyle, data }: WeatherCardBase & Props) => {
  return (
    <View style={cardStyle}>
      <Text style={styles.temperature}>{data?.temp_c}°C</Text>

      <View style={styles.row}>
        <Image source={`https:${data?.condition.icon}`} style={{ height: 22, width: 22 }} />
        <Text style={styles.description}>{data?.condition.text}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="thermometer-outline" size={20} color="#ff9e57" />
        <Text style={styles.minmax}>
          {data?.mintemp_c}° / {data?.maxtemp_c}°
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="leaf-outline" size={20} color="#ff9e57" />
        <Text style={styles.wind}>{data?.wind_kph} kph</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
