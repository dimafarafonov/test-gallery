import { Alert, Linking } from "react-native";
export const showSettingsAlert = () => {
  Alert.alert(
    "Permission Required",
    "This feature needs permission. Please enable it in app settings.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
    { cancelable: true }
  );
};
