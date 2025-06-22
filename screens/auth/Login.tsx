import { useAuth } from "@/providers/auth/hooks/useAuth";
import { useState, useCallback } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { FormContainer } from "./fractions/FormContent";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  const handleSignIn = useCallback(() => {
    signIn({ email, password });
  }, [email, password, signIn]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FormContainer
        redirectRoute={"/auth/sign-up"}
        redirectLabel="Sign up"
        email={email}
        password={password}
        setEmail={setEmail}
        onContinue={handleSignIn}
        setPassword={setPassword}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export { LoginScreen };
