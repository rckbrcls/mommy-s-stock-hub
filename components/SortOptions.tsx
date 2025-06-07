import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSortOptions } from "@/hooks/useSortOptions";

interface SortOptionsProps {
  sortType: "amountAsc" | "amountDesc" | "";
  setSortType: (type: "amountAsc" | "amountDesc" | "") => void;
}

export const SortOptions: React.FC<SortOptionsProps> = ({
  sortType: propSortType,
  setSortType: propSetSortType,
}) => {
  const { sortType, modalVisible, openModal, closeModal, selectSort } =
    useSortOptions<"amountAsc" | "amountDesc">(propSortType);

  React.useEffect(() => {
    if (sortType !== propSortType) {
      propSetSortType(sortType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={openModal}>
        <Card style={styles.cardButton}>
          <ThemedText style={styles.categoryButtonText}>
            {sortType === "amountAsc"
              ? "Menos Devendo"
              : sortType === "amountDesc"
              ? "Mais Devendo"
              : "Ordenar"}
          </ThemedText>
        </Card>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <ThemedText style={styles.modalTitle}>Ordenar por:</ThemedText>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => selectSort("amountAsc")}
              >
                <ThemedText style={styles.modalOptionText}>
                  Menos Devendo
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => selectSort("amountDesc")}
              >
                <ThemedText style={styles.modalOptionText}>
                  Mais Devendo
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mainButton, styles.exitButton]}
                onPress={closeModal}
              >
                <ThemedText style={styles.buttonText}>Fechar</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </View>
        </TouchableWithoutFeedback>
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
