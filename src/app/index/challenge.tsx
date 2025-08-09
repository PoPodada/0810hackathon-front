import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import CommonHeader from "@/components/CommonHeader";
import { Button, Switch } from "tamagui";

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
  const [checked, setChecked] = useState(false);
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const router = useRouter();

  useEffect(() => {
    const getProblem = async () => {
      try {
        const res = await fetch(
          "https://cb0bde733d5a.ngrok-free.app/random-problem/create",
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
      <CommonHeader
        left={<Button onPress={() => router.back()}>戻る</Button>}
        right={
          <Button onPress={() => router.push("/camera")}>この場所へ行く</Button>
        }
      />
      {problem ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/streetview?size=1000x800&location=${problem?.latitude},${problem?.longitude}&heading=165&pitch=0&fov=200&key=AIzaSyBwKmSXGOhbVs7Q8ot0o3yrI0lDYqEr21U`,
          }}
          style={styles.imageWrapper}
        />
      ) : (
        <View style={styles.imageWrapper}>
          <Text>loading...</Text>
        </View>
      )}
      <View style={styles.footer}>
        <Text>位置情報：</Text>
        <Switch
          bg={checked ? "#A5D6A7" : "#ccc"}
          size="$3"
          checked={checked}
          onCheckedChange={() => setChecked(!checked)}
        >
          <Switch.Thumb animation="bouncy" />
        </Switch>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  imageWrapper: {
    width: "100%",
    flex: 1,
  },
  footer: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    // alignItems: "center",
    marginLeft: 20,
  },
});

export default Page;
