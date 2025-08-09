import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  Circle,
  LatLng,
  MarkerDragEvent,
} from "react-native-maps";
import { Link, useRouter } from "expo-router";

const API_KEY = "";

const INITIAL_COORDINATE: LatLng = {
  latitude: 34.3845479077209,
  longitude: 132.45614910237433,
};

const RegionValue: Region = {
  ...INITIAL_COORDINATE,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const INITIAL_RADIUS = 1000;

const Page = () => {
  const [radius, setRadius] = useState(INITIAL_RADIUS);
  const [center, setCenter] = useState(INITIAL_COORDINATE);
  const router = useRouter();
  console.log(center, radius);

  const handleMarkerDrag = (e: MarkerDragEvent) => {
    const { coordinate } = e.nativeEvent;
    setCenter(coordinate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/mode">戻る</Link>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={RegionValue}
      >
        <Marker draggable onDrag={handleMarkerDrag} coordinate={center} />
        <Circle center={center} radius={radius} strokeWidth={5} />
      </MapView>
      <View style={styles.footer}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={2000}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setRadius(value)}
        />
        <Link
          href={{
            pathname: "/challenge",
            params: {
              radius: String(radius),
              latitude: String(center.latitude),
              longitude: String(center.longitude),
            },
          }}
        >
          決定
        </Link>
        <Text>{radius}</Text>
        <Text>
          {center.latitude}, {center.longitude}
        </Text>
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
  },
  footer: {
    height: "10%",
  },
});

export default Page;
