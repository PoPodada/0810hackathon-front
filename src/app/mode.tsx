import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Button, Modal, StyleSheet, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";

const Page = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[styles.header, {}]}>
        <Link href="/">戻る</Link>
      </View>
      <View
        style={[
          styles.buttonBackground,
          { backgroundColor: "rgba(230, 233, 90, 0.3)" },
        ]}
      >
        <Button title="おさんぽ" onPress={() => router.push("/camera")} />
      </View>
      {/* <View style={[styles.buttonBackground,{backgroundColor: 'rgba(230, 233, 90, 0.3)'}]}>
        <Button title="もんだい" onPress={() => setModalVisible(true)}/>
      </View> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>作成</Text>
            </Pressable>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>回答</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
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
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ece872ff",
    borderRadius: 5,
  },
});

export default Page;
// registerRootComponent(App);
