import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

//fast trick to make size = "large" as "large" not complain
const BasicLoader = ({ size = "large" as "large", color = "blue" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export { BasicLoader };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
