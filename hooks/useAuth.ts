import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail("");
        setPassword("");
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    Keyboard.dismiss();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      Alert.alert("signin error", error.message);
    });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return {
    user,
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn,
    handleSignOut,
  };
}
