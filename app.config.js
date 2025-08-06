import { GOOGLE_API_KEY } from "react-native-dotenv";

export default ({ config }) => {
  return {
    ios: {
      config: {
        googleMapsApiKey: GOOGLE_API_KEY,
      },
    },
    ...config,
  };
};
