import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F5A689", // Cor da aba selecionada
        tabBarInactiveTintColor: "#C0C0C0", // Cor da aba não selecionada
        headerShown: false,
        tabBarButton: HapticTab,
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
            <IconSymbol size={28} name="cube" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Adicionar",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="add-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="debtors"
        options={{
          title: "Devedores",
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",

          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
