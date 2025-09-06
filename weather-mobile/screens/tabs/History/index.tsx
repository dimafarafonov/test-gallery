import { DeleteIcon } from "@/core/action-icons/Delete";
import LoadingIndicator from "@/core/ui/ActivityIndicator";
import { useForecastHistory } from "@/hooks/useForecastHistory";
import { useForecastApi } from "@/services/weather/hooks/useForecastApi";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export const HistoryScreen = () => {
  const { history } = useForecastHistory();
  const { getTodaysForecast, isLoading } = useForecastApi();

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

  const renderItem = useCallback(
    ({ item }: { item: (typeof history)[0] }) => {
      const { key, label } = item;
      return (
        <View style={styles.row}>
          <TouchableOpacity key={key} style={styles.item} onPress={() => findCity({ city: label })}>
            <Text style={styles.itemText}>{label}</Text>
          </TouchableOpacity>
          <DeleteIcon label={label} onDelete={() => null} />
        </View>
      );
    },
    [findCity]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView>
      <Animated.FlatList
        entering={FadeIn}
        style={styles.list}
        data={history}
        renderItem={renderItem}
        keyExtractor={({ key }) => key.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 55,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    flexGrow: 1,
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
  },
  itemText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
});
