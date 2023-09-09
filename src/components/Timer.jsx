import { View, Text, StyleSheet } from "react-native";
export default function Timer({ timer }) {

    const timeNow = `${Math.floor(timer / 60)
.toString().padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{timeNow}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  time:{
    fontSize: 100,
    fontWeight: "bold",
    color: "#333333",
  }
});
