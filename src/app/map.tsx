import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import MapView, {
  PROVIDER_GOOGLE,
  Region,
  Marker,
  Circle,
} from "react-native-maps";

const API_KEY = "";

const RegionValue: Region = {
  latitude: 34.3845479077209,
  longitude: 132.45614910237433,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Page = () => {
  const [radius, setRadius] = useState(43000);
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 34.3845479077209,
    longitude: 132.45614910237433,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={RegionValue}
      >
        <Marker
          draggable
          onDragEnd={(e) => setMarkerCoordinate(e.nativeEvent.coordinate)}
          coordinate={markerCoordinate}
        />
        <Circle center={markerCoordinate} radius={radius} strokeWidth={5} />
      </MapView>
      <View style={styles.footer}>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={2000}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => setRadius(value)}
        />
        <Text>{radius}</Text>
        <Text>
          {markerCoordinate.latitude}, {markerCoordinate.longitude}
        </Text>
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
    width: "100%",
    height: "100%",
  },
  footer: {
    height: 200,
  },
});

export default Page;

{
  /* <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={INITIAL_CENTER}
            defaultZoom={10}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker
              position={center}
              draggable
              onDrag={(e) =>
                setCenter({
                  lat: e.latLng?.lat() ?? 0,
                  lng: e.latLng?.lng() ?? 0,
                })
              }
            />
            <Circle
              radius={radius}
              center={center}
              onRadiusChanged={setRadius}
              onCenterChanged={changeCenter}
              strokeColor={"#0c4cb3"}
              strokeOpacity={1}
              strokeWeight={3}
              fillColor={"#3b82f6"}
              fillOpacity={0.3}
              editable
              draggable
            />
          </Map>
        </APIProvider> */
}
