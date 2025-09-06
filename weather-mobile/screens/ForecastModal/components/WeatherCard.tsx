import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { WeatherCardBase } from "./types";

type Props = {
  data: {
    temp: string;
    description: string;
    min: string;
    max: string;
    wind: string;
  };
};

export const WeatherCard = ({ cardStyle, data }: WeatherCardBase & Props) => {
  return (
    <View style={cardStyle}>
      <Text style={styles.temperature}>{data.temp}°C</Text>

      <View style={styles.row}>
        <Ionicons name="partly-sunny-outline" size={22} color="#ff9e57" />
        <Text style={styles.description}>{data.description}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="thermometer-outline" size={20} color="#ff9e57" />
        <Text style={styles.minmax}>
          {data.min}° / {data.max}°
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="leaf-outline" size={20} color="#ff9e57" />
        <Text style={styles.wind}>{data.wind} m/s</Text>
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
