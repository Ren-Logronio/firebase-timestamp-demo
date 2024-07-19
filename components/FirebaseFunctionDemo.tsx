import { Suspense, useEffect, useState } from "react";
import SuspenseActivityIndicator from "./SuspenseActivityIndicator";
import { Button, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerticalGap from "./VerticalGap";

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
  const [serverTimestamp, setServerTimestamp] =
    useState<ServerTimestampType | null>(null);

  const syncServerTimestamp = async () => {
    const storedTimestamp = await AsyncStorage.getItem("storedTimestampFn");
    const response = await axios.get(
      `https://timestamp-6ntz5wqtla-uc.a.run.app/timestamp${
        storedTimestamp ? `?timestamp=${storedTimestamp}` : ""
      }`
    );
    const { server, client } = response.data.timestamp;
    const { difference, differenceRelativeTime } = response.data;
    setServerTimestamp({
      server,
      client,
      difference,
      differenceRelativeTime,
    });
    AsyncStorage.setItem("storedTimestampFn", server?.iso);
  };

  useEffect(() => {
    syncServerTimestamp();
  }, []);

  return (
    <>
      {serverTimestamp && serverTimestamp?.server && (
        <>
          <Text>server timestamp: </Text>
          <Text>{serverTimestamp?.server?.iso}</Text>
          <VerticalGap height={5} />
          <Text>previously stored timestamp:</Text>
          <Text>{serverTimestamp?.client?.iso || "N/A"}</Text>
          <VerticalGap height={5} />
          <Text>relative time: {serverTimestamp?.differenceRelativeTime}</Text>
          <VerticalGap height={10} />
        </>
      )}
      <Button
        disabled={!serverTimestamp || !serverTimestamp?.server}
        title="sync timestamps"
        onPress={syncServerTimestamp}
      />
    </>
  );
}
