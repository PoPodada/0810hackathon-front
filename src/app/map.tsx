import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Circle } from "../components/map";
import ControlPanel from "../components/map/control-panel";

const API_KEY = "";

const INITIAL_CENTER = { lat: 41.1897, lng: -96.0627 };
const Page = () => {
  const [center, setCenter] = useState(INITIAL_CENTER);
  const [radius, setRadius] = useState(43000);

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };
  return (
    <View style={styles.container}>
      <APIProvider apiKey={API_KEY}>
        <APIProvider apiKey={API_KEY}>
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
            {/* <Polygon strokeWeight={1.5} encodedPaths={POLYGONS} /> */}
            {/* <Polyline
          strokeWeight={10}
          strokeColor={'#ff22cc88'}
          encodedPath={POLYGONS[11]}
        /> */}
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
          <ControlPanel
            center={center}
            radius={radius}
            onCenterChanged={setCenter}
            onRadiusChanged={setRadius}
          />
        </APIProvider>
      </APIProvider>
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
});

export default Page;
