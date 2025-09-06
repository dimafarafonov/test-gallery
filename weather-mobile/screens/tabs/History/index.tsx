import LoadingIndicator from "@/core/ui/ActivityIndicator";
import { useForecastHistory } from "@/hooks/useForecastHistory";
import { useForecast } from "@/services/weather/hooks/useForecast";
import { router } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export const HistoryScreen = () => {
  const { history } = useForecastHistory();
  const { getTodaysForecast, isLoading } = useForecast();

  const findCity = useCallback(
    ({ city }: { city: string }) => {
      getTodaysForecast({ city }).then(({ forecast }) => {
        if (!forecast) {
          return;
        }

        router.navigate({ pathname: "/forecast-modal", params: { forecast: JSON.stringify(forecast) } });
      });
    },
    [getTodaysForecast]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView>
      <Animated.FlatList
        entering={FadeIn}
        style={{ paddingBottom: 55 }}
        data={history}
        renderItem={({ item }) => {
          const { key, label } = item;
          return (
            <TouchableOpacity
              key={key}
              style={{
                backgroundColor: "#f5f5f5",
                padding: 16,
                marginVertical: 6,
                marginHorizontal: 16,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
              onPress={() => findCity({ city: label })}
            >
              <Text style={{ fontSize: 18, fontWeight: "500", color: "#333" }}>{label}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};
