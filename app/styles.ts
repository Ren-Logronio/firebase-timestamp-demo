import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  division: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "light",
    textAlign: "left",
    alignSelf: "center",
    maxWidth: 200,
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 0.8,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 200,
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
});
