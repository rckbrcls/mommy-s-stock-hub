import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventário",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="archivebox.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="tag.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",

          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
