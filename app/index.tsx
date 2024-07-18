import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";
import { Suspense } from "react";
import SuspenseActivityIndicator from "@/components/SuspenseActivityIndicator";
import FirebaseFunctionDemo from "@/components/FirebaseFunctionDemo";
import FirebaseFirestoreDemo from "@/components/FirebaseFirestoreDemo";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.division}>
        <Text>Firebase Function</Text>
        <FirebaseFunctionDemo />
      </View>
      <View style={styles.division}>
        <Text>Firebase Firestore</Text>
        <FirebaseFirestoreDemo />
      </View>
    </View>
  );
}

/**
 *
 * fb function
 * server time:
 * previously stored time:
 * relative time:
 * sync
 *
 */
