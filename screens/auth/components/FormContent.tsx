import { Href, useRouter } from "expo-router";
import { View, TextInput, Button, StyleSheet, Pressable, Text } from "react-native";

type Props = {
  email: string;
  password: string;
  onContinue: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  redirectRoute: Href;
  redirectLabel: string;
};

const FormContainer = ({
  email,
  password,
  redirectRoute,
  redirectLabel,
  setEmail,
  setPassword,
  onContinue,
}: Props) => {
  const router = useRouter();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Continue" onPress={onContinue} />

      <Pressable
        onPress={() => {
          //https://github.com/expo/expo/issues/37213
          //Replace is just the last stronhold, cause expo-router 5 is messed up
          // with screen navigation, particularly with navigate method
          // more details explanation https://github.com/expo/expo/issues/37469
          //at first <Link/> comp was used (proved broken)
          router.replace(redirectRoute);
        }}
        style={styles.signUp}
      >
        <Text style={{ color: styles.signUp.color }}>{redirectLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "stretch",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  signUp: {
    alignSelf: "center",
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export { FormContainer };
