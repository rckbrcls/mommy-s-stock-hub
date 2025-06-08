import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface StatusFilterProps {
  statusFilter: "open" | "paid" | "";
  setStatusFilter: (status: "open" | "paid" | "") => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  statusFilter,
  setStatusFilter,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectStatus = (status: "open" | "paid" | "") => {
    setStatusFilter(status);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Card style={styles.cardButton}>
          <ThemedText style={styles.categoryButtonText}>
            {statusFilter === "open"
              ? "Em Aberto"
              : statusFilter === "paid"
              ? "Pagos"
              : "Filtrar Status"}
          </ThemedText>
        </Card>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContainer}>
            <ThemedText style={styles.modalTitle}>
              Filtrar por Status:
            </ThemedText>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("open")}
            >
              <ThemedText style={styles.modalOptionText}>Em Aberto</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("paid")}
            >
              <ThemedText style={styles.modalOptionText}>Pagos</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectStatus("")}
            >
              <ThemedText style={styles.modalOptionText}>Todos</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mainButton, styles.exitButton]}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.buttonText}>Fechar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: { marginBottom: 10 },
  cardButton: {
    padding: 6,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  categoryButtonText: { fontSize: 14, fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: { padding: 20, borderRadius: 10, width: "90%" },
  modalTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  modalOption: { padding: 10, borderBottomWidth: 1 },
  modalOptionText: { fontSize: 16 },
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#A3D977",
  },
  exitButton: { backgroundColor: "#808080" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
});
