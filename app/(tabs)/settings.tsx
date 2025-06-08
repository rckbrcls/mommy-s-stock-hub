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
import {
  exportDatabaseToExcel,
  importDatabaseFromExcel,
} from "@/features/settings/utils";
import { useTextSize } from "@/features/settings/contexts/TextSizeContext";

export default function SettingsScreen() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const { textSize, setTextSize } = useTextSize();

  const handleToggleNotifications = () =>
    setIsNotificationsEnabled((prev) => !prev);

  const handleTextSizeChange = (size: "small" | "medium" | "large") =>
    setTextSize(size);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={[styles.title]} type="title">
          Configurações
        </ThemedText>

        {/* Seção de Tema */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle]} type="subtitle">
            Aparência
          </ThemedText>
          <View style={styles.item}>
            <ThemedText style={[styles.itemLabel]} type="default">
              Tema Escuro
            </ThemedText>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Seção de Notificações */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle]} type="subtitle">
            Notificações
          </ThemedText>
          <View style={styles.item}>
            <ThemedText style={[styles.itemLabel]} type="default">
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
          <ThemedText style={[styles.sectionTitle]} type="subtitle">
            Backup
          </ThemedText>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={exportDatabaseToExcel}
          >
            <ThemedText
              style={[styles.exportButtonText]}
              type="defaultSemiBold"
            >
              Exportar Base de Dados (Excel)
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: "#A3D977" }]}
            onPress={importDatabaseFromExcel}
          >
            <ThemedText
              style={[styles.exportButtonText]}
              type="defaultSemiBold"
            >
              Importar Base de Dados (Excel)
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Seção de Acessibilidade */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle]} type="subtitle">
            Acessibilidade
          </ThemedText>
          <View style={styles.textSizeRow}>
            <TouchableOpacity
              style={[
                styles.textSizeButton,
                textSize === "small" && styles.textSizeButtonActive,
              ]}
              onPress={() => handleTextSizeChange("small")}
            >
              <ThemedText style={[styles.textSizeButtonText]} type="subtitle">
                A-
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textSizeButton,
                textSize === "medium" && styles.textSizeButtonActive,
              ]}
              onPress={() => handleTextSizeChange("medium")}
            >
              <ThemedText style={[styles.textSizeButtonText]} type="subtitle">
                A
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.textSizeButton,
                textSize === "large" && styles.textSizeButtonActive,
              ]}
              onPress={() => handleTextSizeChange("large")}
            >
              <ThemedText style={[styles.textSizeButtonText]} type="subtitle">
                A+
              </ThemedText>
            </TouchableOpacity>
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
  textSizeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  textSizeButton: {
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  textSizeButtonActive: {
    backgroundColor: "#F5A689",
  },
  textSizeButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
});
