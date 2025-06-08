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
        <ThemedText style={styles.listItemTexBold}>{item.name}</ThemedText>
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
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => onIncrement(item.id)}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.minusButton}
          onPress={() => onDecrement(item.id)}
        >
          <ThemedText style={styles.buttonText}>-</ThemedText>
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
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  plusButton: {
    backgroundColor: "#A3D977",
    borderRadius: 200,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "#FF364E",
    borderRadius: 200,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
