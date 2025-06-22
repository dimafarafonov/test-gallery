import { useAuth } from "@/providers/auth/hooks/useAuth";
import { useState, useCallback } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { FormContainer } from "./fractions/FormContent";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuth();

  const handleSignUp = useCallback(() => {
    signUp({ email, password });
  }, [email, password, signUp]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FormContainer
        redirectRoute={"/auth/sign-in"}
        redirectLabel="Sign up"
        email={email}
        password={password}
        setEmail={setEmail}
        onContinue={handleSignUp}
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

export { SignUpScreen };
