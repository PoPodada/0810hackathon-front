import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

type Props = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const CommonHeader = ({ left, right }: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>{left}</View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default CommonHeader;
