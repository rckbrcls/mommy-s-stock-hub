import React, { useState } from "react";
import { View, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Card style={styles.cardButton}>
          <ThemedText style={styles.categoryButtonText}>
            {selectedCategory || "Categoria"}
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
              Selecione uma Categoria
            </ThemedText>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleSelectCategory("")}
            >
              <ThemedText style={styles.modalOptionText}>
                Todas as Categorias
              </ThemedText>
            </TouchableOpacity>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleSelectCategory(category)}
              >
                <ThemedText style={styles.modalOptionText}>
                  {category}
                </ThemedText>
              </TouchableOpacity>
            ))}
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
