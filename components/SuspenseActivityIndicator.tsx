import { ActivityIndicator, Text } from "react-native";

export default function SuspenseActivityIndicator() {
  return (
    <>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </>
  );
}
