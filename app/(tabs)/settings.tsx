// MommyStockHub/screens/SettingsScreen.tsx

import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  // Estados de exemplo para configurações
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

  // Exemplo de logout
  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          Alert.alert("Logout", "Usuário desconectado.");
        },
      },
    ]);
  };

  // Funções de toggle (mock)
  const handleToggleTheme = () => setIsDarkTheme((prev) => !prev);
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
            <Switch value={isDarkTheme} onValueChange={handleToggleTheme} />
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

        {/* Seção de Sincronização */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sincronização</Text>
          <View style={styles.item}>
            <Text style={styles.itemLabel}>Sincronizar com a Nuvem</Text>
            <Switch
              value={isCloudSyncEnabled}
              onValueChange={handleToggleCloudSync}
            />
          </View>
        </View>

        {/* Seção de Conta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
    backgroundColor: "#f8f9fa",
  },
  container: {
    padding: 16,
    backgroundColor: "#fff",
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
    backgroundColor: "#f0f0f0",
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
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
