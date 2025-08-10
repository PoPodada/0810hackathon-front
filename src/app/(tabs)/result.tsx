import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Paragraph } from "tamagui";

const images = [
  require("../image/hcu_googleMap_image.png"),
  require("../image/hiroshimaCity_image.png"),
  require("../image/hiroshima_university_image.png"),
  require("../image/hiroshima_university_streetview_image.png"),
];
const Page = () => {
  const router = useRouter();
  const [imageIndex, setImageIndex] = useState(0);

    // 完了状態を管理するためのステート
  //const [complete, setComplete] = useState(false); 
    const complete = true; // ここは実際の完了状態に応じて変更する必要があります

//   useEffect(() => {
//     // バックエンドからステータスを取得する
//     const fetchStatus = async () => {
//       try {
//         const response = await fetch("https://your-backend.example.com/api/status");
//         if (!response.ok) {
//           throw new Error("サーバーエラー");
//         }
//         const data = await response.json();

//         // 例: { complete: true } のような形を想定
//         setComplete(data.complete);
//       } catch (error) {
//         console.error("ステータス取得に失敗:", error);
//         // エラー時は適宜初期値にするかUIで表示してもOK
//         setComplete(false);
//       }
//     };

//     fetchStatus();
//   }, []);

//   useEffect(() => {
//     const intervalID = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(intervalID);
//   }, []);

  return (
    <ImageBackground
      source={images[imageIndex]}
      resizeMode="cover"
      style={styles.container}
    >{


        complete ? (
            <View style={styles.descriptionContainer}>
            <Text>Congraturetion</Text>
            <Paragraph>問題をクリアしました！</Paragraph>



            <Button
            onPress={() => router.push("/")}
            >
            モード選択へ
            </Button>
            </View>
        ) : (
            <Button
            onPress={() => router.push("/chellenge")}
            >
            チャレンジへ
            </Button>
        )
    }
        
      







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
