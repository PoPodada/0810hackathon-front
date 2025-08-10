import { StatusBar } from "expo-status-bar";
import { Link, useRouter,useLocalSearchParams } from "expo-router";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { useCameraPermissions, CameraView, CameraType } from "expo-camera";
import MapView, {
  
  Region,
  
} from "react-native-maps";
import * as Location from "expo-location";
import CommonHeader from "@/components/CommonHeader";
import { Switch } from "tamagui";


const Page = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const [ImageUri, setImageUri] = useState<string | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
    const [region,setRegion] = useState<Region| null >(null);
    const [location, setLocation] = useState<{latitude:number, longitude:number} | null>(null);
    
    const handleCameraPress = async () => {
    const { status } = await requestPermission();
    if (status !== "granted") {
      Alert.alert("権限エラー", "カメラへのアクセスが許可されていません。");
      return;
    }





    setIsCameraVisible(true);
  };

  // 写真を撮影する関数
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setImageUri(photo.uri);
        setIsCameraVisible(false);
        


        let { status } = await Location.requestForegroundPermissionsAsync(); 
      if (status !== "granted") {
        console.log("位置情報の許可がありません");
        return;
      }

        let location = await Location.getCurrentPositionAsync({}); 
        if (location) {
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        console.log("現在地:", latitude, longitude);
      }

      } catch (error) {
        console.error("写真の撮影に失敗しました:", error);
        Alert.alert("撮影エラー", "写真の撮影に失敗しました。");
      }

      
    }
    
  };
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const random_problem_id = useLocalSearchParams(); // ここに実際のIDを設定
  console.log("random_problem_id:", random_problem_id);
  const API_URL = `https://test-back-image-768984531685.asia-northeast1.run.app/random-problem/complete/${random_problem_id}`; // ここに実際のAPIエンドポイントを設定
  const sendLocation = async () => {
    try {
    const response = await fetch(API_URL, {
        method: "PHATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: random_problem_id.userId, // ユーザーIDを適切に設定
          user_latitude: region?.latitude,
          user_longitude: region?.longitude,
          image_url: ImageUri, // バックエンドでファイル処理するなら別送
        }),
      });

      if (!response.ok) {
        throw new Error("サーバーエラー");
      }

      console.log("送信完了:", await response.json());

    } catch (error) {
      console.error("処理失敗:", error);
      Alert.alert("エラー", "データ送信に失敗しました");
    }
  }

    return (
    <View style={styles.container}>
      {ImageUri ? (
        <>
          <CommonHeader
            left={<Button onPress={() => router.back()} title="戻る" />}
            right={
              <Button
                onPress={() =>{
                  router.push({
                    pathname: "/result",
                  })
                Alert.alert("保存", "画像が保存されました。");
                sendLocation();
                }
                }
                title="保存"
              />
            }/>

          <Image
            source={{ uri: ImageUri }}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={[styles.futterContainer, {}]}>
            <Link href="/mode">あきらめる</Link>

            <Pressable
              style={styles.futterContainer}
              onPress={() => {
                setImageUri(null);
                setIsCameraVisible(true);
              }}
            >
              <Text>もう一度撮影</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <View style={[styles.headerContainer, {}]}>
            <Link href="/challenge">戻る</Link>
          </View>
          <Pressable
            style={styles.buttonBackground}
            onPress={handleCameraPress}
          >
            <Text>カメラを起動</Text>
          </Pressable>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isCameraVisible}
        onRequestClose={() => setIsCameraVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <CameraView
            ref={cameraRef}
            facing={facing}
            style={styles.camera}
            onCameraReady={() => console.log("カメラが準備完了")}
          />
          <Button onPress={toggleCameraFacing} title="カメラ切替" />
          <Button onPress={takePicture} title="写真を撮る" />
          <Button onPress={() => setIsCameraVisible(false)} title="閉じる" />
        </View>
      </Modal>
      {/*<Button title="カメラ" onPress={() => requestPermission()} />*/}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    top: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBackground: {
    backgroundColor: "#ece872ff",
    width: "50%",
    height: "10%",

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#f4d971ff",
    padding: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    //flex: 1,
    width: "100%",
    height: "80%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ece872ff",
    borderRadius: 5,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: "#ece872ff",
    justifyContent: "center",
    alignItems: "center",
  },
  futterContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    //alignContent: "center",
    paddingHorizontal: 20,
  },
});

export default Page;
// registerRootComponent(App);
