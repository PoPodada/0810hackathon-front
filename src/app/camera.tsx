import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Button, Modal, StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { useCameraPermissions, CameraView, CameraType } from "expo-camera";







  




const Page = () => {
    const [permission, requestPermission] = useCameraPermissions();
    
    const [ImageUri, setImageUri] = useState<string | null>(null);
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [facing, setFacing] = useState<CameraType>("back");
    const cameraRef = useRef<CameraView>(null);
    
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
      } catch (error) {
        console.error("写真の撮影に失敗しました:", error);
        Alert.alert("撮影エラー", "写真の撮影に失敗しました。");
      }
    }
  };
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
    
  return (
    <View style={styles.container}>
      
      
        { ImageUri ? (
          <>
          <View style={[styles.headerContainer, {}]}>
            <Link href="/challenge">戻る</Link>
            <Link href="/result">保存</Link>
          </View>
          
          <Image
          source= {{uri: ImageUri}}
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
          <View style={{flex: 1}}>
            <CameraView
              ref={cameraRef}
              facing={facing}
              style={styles.camera}
              onCameraReady={() => console.log("カメラが準備完了")}
            />
            <Button title="カメラ切替" onPress={toggleCameraFacing} />
            <Button title="写真を撮る" onPress={takePicture} />
            <Button title="閉じる" onPress={() => setIsCameraVisible(false)} />
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
  },image: {
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
    backgroundColor: "#ece872ff",
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
    
    bottom: 20,
  },
  
  
});

export default Page;
// registerRootComponent(App);
