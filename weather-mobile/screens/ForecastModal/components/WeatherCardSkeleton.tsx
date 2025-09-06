import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { WeatherCardBase } from "./types";

export const WeatherCardSkeleton = ({ cardStyle }: WeatherCardBase) => {
  return (
    <SkeletonPlaceholder
      borderRadius={8}
      speed={2000}
      highlightColor="rgba(255,183,94,0.5)"
      backgroundColor="rgba(0,0,0,0.6)"
    >
      <View style={cardStyle}>
        <View style={styles.skeletonTemp} />
        <View style={styles.skeletonRow}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonTextLarge} />
        </View>
        <View style={styles.skeletonRowSmall}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonTextSmall} />
        </View>
        <View style={styles.skeletonRowSmall}>
          <View style={styles.skeletonIcon} />
          <View style={styles.skeletonTextSmall} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  skeletonTemp: {
    width: 120,
    height: 50,
    borderRadius: 8,
  },
  skeletonRow: {
    flexDirection: "row",
    marginTop: 15,
  },
  skeletonRowSmall: {
    flexDirection: "row",
    marginTop: 10,
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  skeletonTextLarge: {
    width: 100,
    height: 20,
    marginLeft: 10,
  },
  skeletonTextSmall: {
    width: 80,
    height: 20,
    marginLeft: 10,
  },
});
