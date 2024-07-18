import { Suspense, useEffect, useState } from "react";
import SuspenseActivityIndicator from "./SuspenseActivityIndicator";
import { Button, Text } from "react-native";
import { getTimestamp } from "@/utils/firebase";
import { HttpsCallableResult } from "firebase/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ServerTimestampType = {
  client: {
    unix: number;
    iso: string;
  };
  server: {
    unix: number;
    iso: string;
  };
  difference: number;
  differenceRelativeTime: string;
};

export default function FirebaseFunctionDemo() {
  const [loading, setLoading] = useState({ storage: true, server: true });
  const [serverTimestamp, setServerTimestamp] =
    useState<ServerTimestampType | null>(null);
  const [storedTimestamp, setStoredTimestamp] = useState<string | null>(null);

  const loadStoredTimestamp = async () => {
    loading.storage && setLoading({ ...loading, storage: true });
    const timestamp = await AsyncStorage.getItem("storedTimestamp");
    setStoredTimestamp(timestamp || null);
    setLoading({ ...loading, storage: false });
  };

  const syncServerTimestamp = async () => {
    loading.server && setLoading({ ...loading, server: true });
    // getTimestamp({ query: { timestamp: storedTimestamp } }).then(
    //   (response: HttpsCallableResult) => {
    //     console.log("🚀 ~ syncServerTimestamp ~ response:", response);
    //     setLoading({ ...loading, server: false });
    //   }
    // );
  };

  useEffect(() => {
    loadStoredTimestamp();
    syncServerTimestamp();
  }, []);

  return (
    <Suspense fallback={<SuspenseActivityIndicator />}>
      {serverTimestamp && serverTimestamp?.server && (
        <>
          <Text>server time: {serverTimestamp?.server?.iso}</Text>
          <Text>previously stored timestamp: {storedTimestamp || "N/A"}</Text>
          <Text>duration: {serverTimestamp?.differenceRelativeTime}</Text>
        </>
      )}
      <Button title="sync timestamps" onPress={syncServerTimestamp} />
    </Suspense>
  );
}
