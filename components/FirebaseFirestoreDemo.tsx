import { Suspense } from "react";
import SuspenseActivityIndicator from "./SuspenseActivityIndicator";

export default function FirebaseFirestoreDemo() {
  return <Suspense fallback={<SuspenseActivityIndicator />}></Suspense>;
}
