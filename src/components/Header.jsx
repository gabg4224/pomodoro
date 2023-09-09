import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
export default function Header({ currentTime, setCurrentTime, setTime }) {
  const options = ["pomodoro", "short break", "long break"];
  const handleTouch = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };
  return (
    <View style={styles.container}>
      {options?.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, currentTime !== index && styles.itemSelected]}
          onPress={() => handleTouch(index)}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",

    marginVertical: 20,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    padding: 5,
    width: "33%",
    borderColor: "white",
    borderRadius: 10,
  },
  itemSelected: {
    borderColor: "transparent",
  },

});
