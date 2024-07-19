import { styles } from "@/app/styles";
import { ActivityIndicator, Text, View } from "react-native";

export default function SuspenseActivityIndicator() {
  return (
    <>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </>
  );
}
