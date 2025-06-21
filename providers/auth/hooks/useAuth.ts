import { use } from "react";
import { AuthContext } from "../AuthProvider";

// This hook can be used to access the user info.
export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}
