// MommyStockHub/screens/SettingsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export default function SettingsScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

  const handleToggleNotifications = () =>
    setIsNotificationsEnabled((prev) => !prev);
  const handleToggleCloudSync = () => setIsCloudSyncEnabled((prev) => !prev);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        {/* Seção de Tema */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Tema Escuro</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Seção de Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Ativar Notificações</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={handleToggleNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#555",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 16,
    color: "#333",
  },
});
