import { Alert } from "react-native";
import { AuthErrorCodeEnum } from "../enums";

export const authBasicHandler = (error: Record<string, unknown>) => {
  if (error.code === AuthErrorCodeEnum.EMAIL_ALREADY_IN_USE) {
    Alert.alert("That email address is already in use!");
  }

  if (error.code === AuthErrorCodeEnum.INVALID_EMAIL) {
    Alert.alert("That email address is invalid!");
  }
  Alert.alert(String(error?.message));
};
