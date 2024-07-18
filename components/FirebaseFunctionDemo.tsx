import { Suspense } from "react";
import SuspenseActivityIndicator from "./SuspenseActivityIndicator";

export default function FirebaseFunctionDemo() {
  return <Suspense fallback={<SuspenseActivityIndicator />}></Suspense>;
}
