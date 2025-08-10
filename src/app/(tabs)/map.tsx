import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  Circle,
  LatLng,
  MarkerDragEvent,
  MarkerDragStartEndEvent,
} from "react-native-maps";
import { Link, useRouter } from "expo-router";
import * as Location from "expo-location";
import { Button, Slider } from "tamagui";
import CommonHeader from "@/components/CommonHeader";

type Delta = {
  latitudeDelta: number;
  longitudeDelta: number;
};

const RegionValue: Delta = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const INITIAL_RADIUS = 1000;

const Page = () => {
  const [radius, setRadius] = useState(INITIAL_RADIUS);
  const [center, setCenter] = useState<LatLng | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCenter({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }

    getCurrentLocation();
  }, []);

  const handleMarkerDrag = (e: MarkerDragEvent) => {
    const { coordinate } = e.nativeEvent;
    setCenter(coordinate);
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        left={<Button onPress={() => router.back()}>戻る</Button>}
        right={
          <Button
            onPress={() =>
              router.push({
                pathname: "/challenge",
                params: {
                  radius: String(radius),
                  latitude: String(center?.latitude),
                  longitude: String(center?.longitude),
                },
              })
            }
          >
            決定
          </Button>
        }
      />
      {center ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: RegionValue.latitudeDelta,
            longitudeDelta: RegionValue.longitudeDelta,
          }}
        >
          <Marker draggable onDrag={handleMarkerDrag} coordinate={center} />
          <Circle center={center} radius={radius} strokeWidth={5} />
        </MapView>
      ) : (
        <View style={styles.map}>
          <Text>Loading...</Text>
        </View>
      )}
      <View style={styles.footer}>
        <Text>半径：{radius}m</Text>
        <Slider
          style={{ marginTop: 20 }}
          size="$1"
          width={300}
          defaultValue={[50]}
          min={10}
          max={10000}
          step={1}
          onValueChange={(value) => setRadius(value[0])}
        >
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb circular index={0} />
        </Slider>
        {/* <Link
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
        </Text> */}
      </View>
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
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  footer: {
    height: 70,
  },
});

export default Page;
