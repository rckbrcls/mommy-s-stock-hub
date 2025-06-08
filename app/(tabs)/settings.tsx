// MommyStockHub/screens/SettingsScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/features/settings/contexts/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { exportDatabaseToExcel } from "@/features/settings/exportDatabaseToExcel";
import { importDatabaseFromExcel } from "@/features/settings/importDatabaseFromExcel";

export default function SettingsScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () =>
    setIsNotificationsEnabled((prev) => !prev);

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

        {/* Seção de Exportação */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Exportação</ThemedText>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={exportDatabaseToExcel}
          >
            <ThemedText style={styles.exportButtonText}>
              Exportar Base de Dados (Excel)
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#A3D977" }]}
            onPress={importDatabaseFromExcel}
          >
            <ThemedText style={styles.exportButtonText}>
              Importar Base de Dados (Excel)
            </ThemedText>
          </TouchableOpacity>
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
  exportButton: {
    backgroundColor: "#F5A689",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  exportButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
