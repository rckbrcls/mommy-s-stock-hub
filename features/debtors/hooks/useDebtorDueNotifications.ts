import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotificationSettings } from "@/features/settings/contexts/NotificationContext";

export interface Debtor {
  id: string;
  name: string;
  amount: number;
  status: "open" | "paid";
  dueDate?: string; // ISO string
}

function getTodayISO() {
  const now = new Date();
  return now.toISOString().slice(0, 10); // yyyy-mm-dd
}

export function useDebtorDueNotifications(debtors: Debtor[]) {
  const { notificationsEnabled, askNotificationPermission } =
    useNotificationSettings();

  useEffect(() => {
    if (!notificationsEnabled) return;
    if (typeof window !== "undefined") return; // Não executa no web
    const checkAndNotify = async () => {
      const today = getTodayISO();
      for (const debtor of debtors) {
        if (debtor.status !== "open" || !debtor.dueDate) continue;
        const dueDate = debtor.dueDate.slice(0, 10);
        // Notificar no dia do vencimento
        if (dueDate === today) {
          const notifiedKey = `debtor_due_notified_${debtor.id}_${today}`;
          const alreadyNotified = await AsyncStorage.getItem(notifiedKey);
          if (!alreadyNotified) {
            const granted = await askNotificationPermission();
            if (granted) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Dívida vencendo hoje",
                  body: `${
                    debtor.name
                  } deve pagar hoje: R$${debtor.amount.toFixed(2)}`,
                },
                trigger: null,
              });
              await AsyncStorage.setItem(notifiedKey, "1");
            }
          }
        }
        // Notificar se já passou do vencimento
        if (dueDate < today) {
          const notifiedKey = `debtor_overdue_notified_${debtor.id}_${today}`;
          const alreadyNotified = await AsyncStorage.getItem(notifiedKey);
          if (!alreadyNotified) {
            const granted = await askNotificationPermission();
            if (granted) {
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Dívida em atraso",
                  body: `${
                    debtor.name
                  } está em atraso desde ${dueDate}: R$${debtor.amount.toFixed(
                    2
                  )}`,
                },
                trigger: null,
              });
              await AsyncStorage.setItem(notifiedKey, "1");
            }
          }
        }
      }
    };
    checkAndNotify();
  }, [debtors, notificationsEnabled]);
}
