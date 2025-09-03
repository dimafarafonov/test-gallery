import { createContext, useCallback, useEffect, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import { UserAuth, AuthParams } from "./types";

import { authBasicHandler } from "./utils/authErrorHandlers";

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

  const handleAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      setAuth(JSON.stringify(user));
    },
    [setAuth]
  );

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [handleAuthStateChanged]);

  const emailSignUp = useCallback(
    ({ email, password }: AuthParams) =>
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          console.log("User account created & signed in!");
        })
        .catch(authBasicHandler),
    []
  );

  const emailSignIn = useCallback(
    ({ email, password }: AuthParams) =>
      //https://rnfirebase.io/auth/usage#emailpassword-sign-in method can do both
      signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
          console.log("Signed in!");
        })
        .catch(authBasicHandler),
    []
  );

  const fbSignOut = useCallback(
    () => signOut(getAuth()).then(() => console.log("User signed out!")),
    []
  );

  return (
    <AuthContext
      value={{
        signIn: emailSignIn,
        signUp: emailSignUp,
        signOut: fbSignOut,
        session: JSON.parse(session as string),
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
