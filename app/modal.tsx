import { Platform, Pressable, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useAuth } from "@/providers/auth/hooks/useAuth";

export default function ModalScreen() {
  const { signOut, session } = useAuth();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={signOut}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <Text style={styles.title}>Logout</Text>
      </Pressable>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{JSON.stringify(session, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
