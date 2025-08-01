import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";

const image = require("./image/hcu_googleMap_image.png");

const Page = () => {
  const router = useRouter();

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text>おさんぽげったー（仮）</Text>

        <Button title="START" onPress={() => router.push("/second")} />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  descriptionContainer: {
    width: "80%",
    backgroundColor: "e0e0e0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 15,
  },
});
export default Page;
// registerRootComponent(App);
