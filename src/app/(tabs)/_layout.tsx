import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 全画面でヘッダー非表示
      }}
    />
  );
}
