import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Link href="/map">aaaa</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
// registerRootComponent(App);
