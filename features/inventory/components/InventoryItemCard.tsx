import React from "react";
import { Pressable, View, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";

interface InventoryItemCardProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    category?: string;
    price?: number;
    location?: string;
    lastRemovedAt?: string;
    createdAt?: string;
  };
  onEdit: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export const InventoryItemCard: React.FC<InventoryItemCardProps> = ({
  item,
  onEdit,
  onIncrement,
  onDecrement,
}) => (
  <Pressable onPress={() => onEdit(item.id)}>
    <Card style={styles.listItem}>
      <View style={styles.listItemDetails}>
        <ThemedText type="subtitle" style={styles.listItemTexBold}>
          {item.name}
        </ThemedText>
        <ThemedText>
          Quantidade:{" "}
          <ThemedText style={styles.listItemTexBold}>
            {item.quantity}
          </ThemedText>
        </ThemedText>
        {item.category && (
          <ThemedText>
            Categoria:{" "}
            <ThemedText style={styles.listItemTexBold}>
              {item.category}
            </ThemedText>
          </ThemedText>
        )}
        {item.price !== undefined && (
          <ThemedText>
            Preço:{" "}
            <ThemedText style={styles.listItemTexBold}>
              R$ {item.price.toFixed(2)}
            </ThemedText>
          </ThemedText>
        )}
        {item.location && (
          <ThemedText>
            Localização:{" "}
            <ThemedText style={styles.listItemTexBold}>
              {item.location}
            </ThemedText>
          </ThemedText>
        )}
        {item.lastRemovedAt && (
          <ThemedText>
            Última retirada:{" "}
            <ThemedText style={styles.listItemTexBold}>
              {item.lastRemovedAt.substring(0, 16).replace("T", " ")}
            </ThemedText>
          </ThemedText>
        )}
        {item.createdAt && (
          <ThemedText>
            Criado em:{" "}
            <ThemedText style={styles.listItemTexBold}>
              {item.createdAt.substring(0, 16).replace("T", " ")}
            </ThemedText>
          </ThemedText>
        )}
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => onIncrement(item.id)}
        >
          <ThemedText type="subtitle" style={styles.buttonText}>
            +
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.minusButton}
          onPress={() => onDecrement(item.id)}
        >
          <ThemedText type="subtitle" style={styles.buttonText}>
            -
          </ThemedText>
        </TouchableOpacity>
      </View>
    </Card>
  </Pressable>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemTexBold: {
    fontWeight: "bold",
  },
  actionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  plusButton: {
    backgroundColor: "#A3D977",
    borderRadius: 6,
    width: 42,
    height: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "#FF364E",
    borderRadius: 6,
    width: 42,
    height: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
