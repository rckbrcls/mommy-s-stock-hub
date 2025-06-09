import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

interface NotificationContextType {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  askNotificationPermission: () => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("notificationsEnabled");
      if (stored !== null) {
        setNotificationsEnabledState(JSON.parse(stored));
      } else {
        // First app open: ask permission
        const granted = await askNotificationPermission();
        setNotificationsEnabledState(granted);
        await AsyncStorage.setItem(
          "notificationsEnabled",
          JSON.stringify(granted)
        );
      }
    })();
  }, []);

  const setNotificationsEnabled = async (enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(enabled));
    if (enabled) {
      await askNotificationPermission();
    }
  };

  const askNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Para receber notificações, permita nas configurações do sistema.",
          [{ text: "OK" }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationsEnabled,
        setNotificationsEnabled,
        askNotificationPermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotificationSettings() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotificationSettings must be used within NotificationProvider"
    );
  return ctx;
}
