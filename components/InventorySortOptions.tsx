import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface InventorySortOptionsProps {
  sortType: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | "";
  setSortType: (
    type: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | ""
  ) => void;
}

export const InventorySortOptions: React.FC<InventorySortOptionsProps> = ({
  sortType,
  setSortType,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectSort = (
    type: "priceAsc" | "priceDesc" | "quantityAsc" | "quantityDesc" | ""
  ) => {
    setSortType(type);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Card style={styles.cardButton}>
          <ThemedText style={styles.categoryButtonText}>
            {sortType === "priceAsc"
              ? "Menor Preço"
              : sortType === "priceDesc"
              ? "Maior Preço"
              : sortType === "quantityAsc"
              ? "Menor Quantidade"
              : sortType === "quantityDesc"
              ? "Maior Quantidade"
              : "Ordenar"}
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
            <ThemedText style={styles.modalTitle}>Ordenar por:</ThemedText>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("priceAsc")}
            >
              <ThemedText style={styles.modalOptionText}>
                Menor Preço
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("priceDesc")}
            >
              <ThemedText style={styles.modalOptionText}>
                Maior Preço
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("quantityAsc")}
            >
              <ThemedText style={styles.modalOptionText}>
                Menor Quantidade
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectSort("quantityDesc")}
            >
              <ThemedText style={styles.modalOptionText}>
                Maior Quantidade
              </ThemedText>
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
  filterContainer: { marginBottom: 5 },
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
  modalOption: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#EEE" },
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
