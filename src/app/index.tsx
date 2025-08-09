import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Paragraph } from "tamagui";

const images = [
  require("./image/hcu_googleMap_image.png"),
  require("./image/hiroshimaCity_image.png"),
  require("./image/hiroshima_university_image.png"),
  require("./image/hiroshima_university_streetview_image.png"),
];
const Page = () => {
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <ImageBackground
      source={images[imageIndex]}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.descriptionContainer}>
        <Paragraph>おさんぽげったー</Paragraph>
        <Button theme="blue" margin={10} onPress={() => router.push("/mode")}>
          START
        </Button>
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
    backgroundColor: "#e0e0e0",
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
