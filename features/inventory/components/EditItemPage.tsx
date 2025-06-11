import React from "react";
import {
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
import { SafeAreaView } from "react-native-safe-area-context";

interface EditItemModalProps {
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

// Removido o Modal e exportando como uma página normal
export const EditItemPage: React.FC<Omit<EditItemModalProps, "visible">> = ({
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
  <SafeAreaView style={{ flex: 1 }}>
    <ThemedView style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 12 }}>
          <ThemedText style={styles.modalTitle}>Editar Item</ThemedText>
          <View>
            <ThemedText style={styles.modalLabel}>Nome do Item</ThemedText>
            <ThemedInput
              placeholder="Nome do item"
              value={itemName}
              onChangeText={setItemName}
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Quantidade</ThemedText>
            <ThemedInput
              placeholder="Quantidade"
              value={itemQuantity}
              onChangeText={setItemQuantity}
              keyboardType="numeric"
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Categoria</ThemedText>
            <ThemedInput
              placeholder="Categoria"
              value={itemCategory}
              onChangeText={setItemCategory}
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Preço</ThemedText>
            <ThemedInput
              placeholder="Preço"
              value={itemPrice}
              onChangeText={setItemPrice}
              keyboardType="decimal-pad"
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Localização</ThemedText>
            <ThemedInput
              placeholder="Localização"
              value={itemLocation}
              onChangeText={setItemLocation}
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Criado em</ThemedText>
            <DateInput
              placeholder="AAAA-MM-DDTHH:mm"
              value={itemCreatedAt}
              onChange={setItemCreatedAt}
            />
          </View>
          <View>
            <ThemedText style={styles.modalLabel}>Última retirada</ThemedText>
            <DateInput
              placeholder="AAAA-MM-DDTHH:mm"
              value={itemLastRemovedAt}
              onChange={setItemLastRemovedAt}
            />
          </View>
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
  </SafeAreaView>
);

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    borderRadius: 0,
    width: "100%",
    maxHeight: undefined,
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

// Adicione ao final do arquivo para manter compatibilidade e facilitar importação
export default EditItemPage;
