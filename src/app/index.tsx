import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, } from "react-native";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>おさんぽげったー（仮）</Text>
      <Button title= "START" onPress={() => router.push("/mode") } />
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
