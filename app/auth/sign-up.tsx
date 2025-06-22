import { useAuth } from "@/providers/auth/hooks/useAuth";
import { FormContainer } from "@/screens/auth/fractions/FormContent";
import { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const SignUpRoute = () => {
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
        redirectLabel="Sign in"
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

export default SignUpRoute;
