import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

type Problem = {
  user_id: number;
  random_problem_id: number;
  longitude: number;
  latitude: number;
  status: string;
  image_url: string;
};

const Page = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const { radius, latitude, longitude } = useLocalSearchParams();
  console.log(radius, "radiradi");
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const getProblem = async () => {
      try {
        const res = await fetch(
          "https://b19fdfee99b0.ngrok-free.app/random-problem/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: 0,
              center_longitude: Number(longitude),
              center_latitude: Number(latitude),
              radius: Number(radius),
            }),
          },
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Problem = await res.json();

        //正確な値が返ってくるようになったら消す
        data.latitude = 34.3845479077209;
        data.longitude = 132.45614910237433;

        setProblem(data);
        console.log(data);
        console.log(
          `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${data.latitude},${data.longitude}&heading=165&pitch=0&fov=90&key=${apiKey}`,
        );
      } catch (error) {
        console.error("問題の取得に失敗しました:", error);
      }
    };
    getProblem();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/map">戻る</Link>
      </View>
      {problem ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/streetview?size=1000x800&location=${problem?.latitude},${problem?.longitude}&heading=165&pitch=0&fov=200&key=AIzaSyBwKmSXGOhbVs7Q8ot0o3yrI0lDYqEr21U`,
          }}
          style={{ width: "100%", height: "80%" }}
        />
      ) : (
        <View style={{ width: "100%", height: "80%" }}>
          <Text>loading...</Text>
        </View>
      )}
      <View style={styles.footer}>
        <Link href="/map" style={{ marginLeft: 20 }}>
          戻る
        </Link>
        <Link href="/camera" style={{ marginRight: 20 }}>
          この場所へ行く
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    //backgroundColor: "#fff",
  },
  footer: {
    height: "10%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Page;
