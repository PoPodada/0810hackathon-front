import { Stack, Tabs } from "expo-router";
import React from "react";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/providers/user-provider";

const config = createTamagui(defaultConfig);

const RootLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <UserProvider>
        {/* <Stack
          screenOptions={{
            headerShown: false, // 全画面でヘッダー非表示
          }}
        /> */}

        <StatusBar style="auto" />
        <Tabs
          screenOptions={{
            headerShown: false, // 全画面でヘッダー非表示
          }}
        />
      </UserProvider>
      {/* </Stack> */}
    </TamaguiProvider>
  );
};

export default RootLayout;
