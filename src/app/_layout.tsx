import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 全画面でヘッダー非表示
      }}
    />
  );
};

export default RootLayout;
