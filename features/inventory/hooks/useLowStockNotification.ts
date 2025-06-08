import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

interface Item {
  id: string;
  name: string;
  quantity: number;
}

export function useLowStockNotification(lowStockItems: Item[]) {
  useEffect(() => {
    if (lowStockItems.length > 0) {
      scheduleLowStockNotification(lowStockItems);
    }
  }, [lowStockItems]);
}

async function scheduleLowStockNotification(items: Item[]) {
  console.log(
    "[LowStockNotification] Chamando scheduleLowStockNotification",
    items
  );
  await requestNotificationPermission();
  const names = items.map((i: Item) => i.name).join(", ");
  console.log("[LowStockNotification] Produtos para notificar:", names);
  const result = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Atenção: Estoque Baixo",
      body: `Produtos com baixo estoque: ${names}`,
    },
    trigger: null,
  });
  console.log("[LowStockNotification] Notificação agendada, id:", result);
}

async function requestNotificationPermission() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
}
