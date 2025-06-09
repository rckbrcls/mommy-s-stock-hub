import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { useNotificationSettings } from "@/features/settings/contexts/NotificationContext";
import { Alert } from "react-native";

interface Item {
  id: string;
  name: string;
  quantity: number;
}

export function useLowStockNotification(
  lowStockItems: Item[],
  manualTrigger = false
) {
  const { notificationsEnabled, askNotificationPermission } =
    useNotificationSettings();

  useEffect(() => {
    if (!notificationsEnabled) return;
    if (lowStockItems.length > 0 && !manualTrigger) {
      scheduleLowStockNotification(lowStockItems, askNotificationPermission);
    }
  }, [lowStockItems, notificationsEnabled]);

  // For manual trigger (e.g., user wants to be notified again)
  const triggerNotification = async () => {
    if (!notificationsEnabled) {
      Alert.alert(
        "Notificações desativadas",
        "Ative as notificações nas configurações para receber alertas."
      );
      return;
    }
    const granted = await askNotificationPermission();
    if (granted) {
      await scheduleLowStockNotification(
        lowStockItems,
        askNotificationPermission
      );
      Alert.alert(
        "Notificação enviada",
        "Você será alertado sobre o estoque baixo."
      );
    }
  };

  return { triggerNotification };
}

async function scheduleLowStockNotification(
  items: Item[],
  askNotificationPermission: () => Promise<boolean>
) {
  const granted = await askNotificationPermission();
  if (!granted) return;
  const names = items.map((i: Item) => i.name).join(", ");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Atenção: Estoque Baixo",
      body: `Produtos com baixo estoque: ${names}`,
    },
    trigger: null,
  });
}
