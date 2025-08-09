import { Stack } from "expo-router";
import React from "react";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

const config = createTamagui(defaultConfig);

const RootLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerShown: false, // 全画面でヘッダー非表示
        }}
      />
    </TamaguiProvider>
  );
};

export default RootLayout;
