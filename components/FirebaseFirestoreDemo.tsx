import { styles } from "@/app/styles";
import useAuth from "@/hooks/useAuth";
import { firestore } from "@/utils/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  doc,
  setDoc,
  serverTimestamp as firebaseServerTimestamp,
  getDoc,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { formatDistance } from "date-fns";
import VerticalGap from "./VerticalGap";

export default function FirebaseFirestoreDemo() {
  const { user, email, setEmail, setPassword, handleSignIn, handleSignOut } =
    useAuth();

  const [serverTimestamp, setServerTimestamp] = useState("");
  const [storedTimestamp, setStoredTimestamp] = useState("");
  const differenceRelativeTime = useMemo(() => {
    if (!serverTimestamp || !storedTimestamp) return "";
    return formatDistance(new Date(serverTimestamp), new Date(storedTimestamp));
  }, [serverTimestamp, storedTimestamp]);

  const syncServerTimestamp = async () => {
    if (!user || !user?.email) return;
    const storedTimestamp = await AsyncStorage.getItem(
      `storedTimestampFs_${user.email}`
    );
    const docRef = doc(firestore, "user-timestamps", user.email);
    await setDoc(docRef, { timestamp: firebaseServerTimestamp() });
    await getDoc(docRef).then((doc) => {
      if (doc?.data()) {
        const timestamp = doc?.data()?.timestamp;
        const serverTimestamp = !!timestamp
          ? new Date(timestamp?.seconds * 1000).toISOString()
          : "";
        AsyncStorage.setItem(
          `storedTimestampFs_${user.email}`,
          serverTimestamp
        );
        setServerTimestamp(serverTimestamp);
      }
      setStoredTimestamp(storedTimestamp || "");
    });
  };

  useEffect(() => {
    if (!user) {
      setServerTimestamp("");
      setStoredTimestamp("");
    }
    !!user && !!user?.email && syncServerTimestamp();
  }, [user]);

  return (
    <>
      {!user && (
        <SignInForm
          email={email}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
        />
      )}
      {!!user && (
        <>
          <Text>uid:</Text>
          <Text>{user?.uid || "N/A"}</Text>
          <Text>email: {user?.email || "N/A"}</Text>
          <VerticalGap height={5} />
          <Text>server timestamp:</Text>
          <Text>{serverTimestamp || "N/A"}</Text>
          <VerticalGap height={5} />
          <Text>previously stored timestamp:</Text>
          <Text>{storedTimestamp || "N/A"}</Text>
          <VerticalGap height={5} />
          <Text>relative time: {differenceRelativeTime || "N/A"}</Text>
          <VerticalGap height={10} />
          <Button title="Sync Timestamp" onPress={syncServerTimestamp} />
          <VerticalGap height={40} />
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      )}
    </>
  );
}

const SignInForm = ({
  email,
  setEmail,
  setPassword,
  handleSignIn,
}: {
  email: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSignIn: () => void;
}) => (
  <>
    <Text style={styles.label}>Email</Text>
    <TextInput
      value={email}
      onChangeText={(email) => {
        if (email[email.length - 1] === "@") email += "gmail.com";
        setEmail(email);
      }}
      style={styles.input}
    ></TextInput>
    <Text style={styles.label}>Password</Text>
    <TextInput
      secureTextEntry={true}
      onChangeText={setPassword}
      style={styles.input}
    ></TextInput>
    <Button title="Sign In" onPress={handleSignIn} />
  </>
);
