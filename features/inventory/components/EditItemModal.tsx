import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedInput } from "@/components/ThemedInput";
import { DateInput } from "@/components/DateInput";

interface EditItemModalProps {
  visible: boolean;
  onClose: () => void;
  itemName: string;
  setItemName: (text: string) => void;
  itemQuantity: string;
  setItemQuantity: (text: string) => void;
  itemCategory: string;
  setItemCategory: (text: string) => void;
  itemPrice: string;
  setItemPrice: (text: string) => void;
  onSave: () => void;
  onDelete: () => void;
  itemLocation: string;
  setItemLocation: (text: string) => void;
  itemCreatedAt: string;
  setItemCreatedAt: (text: string) => void;
  itemLastRemovedAt: string;
  setItemLastRemovedAt: (text: string) => void;
}

export const EditItemModal: React.FC<EditItemModalProps> = ({
  visible,
  onClose,
  itemName,
  setItemName,
  itemQuantity,
  setItemQuantity,
  itemCategory,
  setItemCategory,
  itemPrice,
  setItemPrice,
  onSave,
  onDelete,
  itemLocation,
  setItemLocation,
  itemCreatedAt,
  setItemCreatedAt,
  itemLastRemovedAt,
  setItemLastRemovedAt,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <ThemedText style={styles.modalTitle}>Editar Item</ThemedText>
              <ThemedText style={styles.modalLabel}>Nome do Item</ThemedText>
              <ThemedInput
                placeholder="Nome do item"
                value={itemName}
                onChangeText={setItemName}
              />
              <ThemedText style={styles.modalLabel}>Quantidade</ThemedText>
              <ThemedInput
                placeholder="Quantidade"
                value={itemQuantity}
                onChangeText={setItemQuantity}
                keyboardType="numeric"
              />
              <ThemedText style={styles.modalLabel}>Categoria</ThemedText>
              <ThemedInput
                placeholder="Categoria"
                value={itemCategory}
                onChangeText={setItemCategory}
              />
              <ThemedText style={styles.modalLabel}>Preço</ThemedText>
              <ThemedInput
                placeholder="Preço"
                value={itemPrice}
                onChangeText={setItemPrice}
                keyboardType="decimal-pad"
              />
              <ThemedText style={styles.modalLabel}>Localização</ThemedText>
              <ThemedInput
                placeholder="Localização"
                value={itemLocation}
                onChangeText={setItemLocation}
              />
              <ThemedText style={styles.modalLabel}>Criado em</ThemedText>
              <DateInput
                placeholder="AAAA-MM-DDTHH:mm"
                value={itemCreatedAt}
                onChange={setItemCreatedAt}
              />
              <ThemedText style={styles.modalLabel}>Última retirada</ThemedText>
              <DateInput
                placeholder="AAAA-MM-DDTHH:mm"
                value={itemLastRemovedAt}
                onChange={setItemLastRemovedAt}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={styles.mainButton} onPress={onSave}>
                <ThemedText style={styles.buttonText}>Salvar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mainButton, styles.deleteButton]}
                onPress={onDelete}
              >
                <ThemedText style={styles.buttonText}>Excluir</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mainButton, styles.exitButton]}
                onPress={onClose}
              >
                <ThemedText style={styles.buttonText}>Sair</ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ThemedView>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%", // Limita a altura máxima do modal
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#F5A689",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  mainButton: {
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#A3D977",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF364E",
  },
  exitButton: {
    backgroundColor: "#808080",
    marginTop: 20,
  },
});
