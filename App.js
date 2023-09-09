import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
export default function App() {
  const [Time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "LONG");
  const [active, setActive] = useState(false);

  const timeOptions = {
    0: 25,
    1: 5,
    2: 15,
  };
  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime(Time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (Time === 0) {
      setActive(false);
      setTime(timeOptions[currentTime]* 60);
    }
    return () => clearInterval(interval);
  }, [active, Time]);

  const handleStope = () => {
    playSound();
    setActive(!active);
  };
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sound.mp3")
    );
    await sound.playAsync();
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={Platform.OS === "android" ? styles.viewAndroid : null}>
        <Text style={styles.title}>POMODORO</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer timer={Time} />
        <TouchableOpacity style={styles.buttonTimer} onPress={handleStope}>
          <Text style={styles.textButtonTimer}>
            {active ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  dinamicContainer: {},
  viewAndroid: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 45,
  },
  timer: {
    backgroundColor: "#f2f2f2",
  },
  textButtonTimer: {
    fontSize: 20,
    fontWeight: "400",
    color: "white",
  },
  buttonTimer: {
    backgroundColor: "#666666",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
});
