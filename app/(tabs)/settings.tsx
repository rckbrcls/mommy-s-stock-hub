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
import { useTheme } from "@/features/settings/contexts/ThemeContext";
import { ThemedText } from "@/components/ThemedText";

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
        <ThemedText style={styles.title}>Configurações</ThemedText>

        {/* Seção de Tema */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Aparência</ThemedText>
          <View style={styles.item}>
            <ThemedText style={styles.itemLabel}>Tema Escuro</ThemedText>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Seção de Notificações */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Notificações</ThemedText>
          <View style={styles.item}>
            <ThemedText style={styles.itemLabel}>
              Ativar Notificações
            </ThemedText>
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
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
  },
});
