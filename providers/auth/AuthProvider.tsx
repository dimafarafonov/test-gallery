import { createContext, useCallback, useEffect, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  type FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import { UserAuth, AuthParams } from "./types";
import { AuthErrorCodeEnum } from "./enums";

export const AuthContext = createContext<{
  signIn: UserAuth;
  signUp: UserAuth;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setAuth] = useStorageState("userState");

  const handleAuthStateChanged = useCallback((user: FirebaseAuthTypes.User | null) => {
    setAuth(JSON.stringify(user));
  }, []);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const fbSignAuth = useCallback(
    ({ email, password }: AuthParams) =>
      //https://rnfirebase.io/auth/usage#emailpassword-sign-in method can do both
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          console.log("User account created & signed in!");
        })
        .catch((error) => {
          if (error.code === AuthErrorCodeEnum.EMAIL_ALREADY_IN_USE) {
            console.log("That email address is already in use!");
          }

          if (error.code === AuthErrorCodeEnum.INVALID_EMAIL) {
            console.log("That email address is invalid!");
          }

          console.error(error);
        }),
    []
  );

  const fbSignOut = useCallback(
    () => signOut(getAuth()).then(() => console.log("User signed out!")),
    []
  );

  return (
    <AuthContext
      value={{
        signIn: fbSignAuth,
        signUp: fbSignAuth,
        signOut: fbSignOut,
        session: JSON.parse(session as string),
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
