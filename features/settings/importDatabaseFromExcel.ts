import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { database } from "@/database";
import Debtor from "@/features/debtors/models/Debtor";
import InventoryItemModel from "@/features/inventory/models/InventoryItem";
import { Alert } from "react-native";
import { router } from "expo-router";

export async function importDatabaseFromExcel() {
  console.log("[IMPORT] Iniciando importação de Excel");
  try {
    // Pick file
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
      copyToCacheDirectory: true,
    });
    console.log("[IMPORT] Resultado do picker:", result);
    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("[IMPORT] Picker cancelado ou sem assets");
      return;
    }
    const fileUri = result.assets[0].uri;
    console.log("[IMPORT] fileUri:", fileUri);

    // Read file as base64
    const b64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log("[IMPORT] Arquivo lido como base64, tamanho:", b64.length);
    // Corrigido: usar base64 direto, sem Buffer
    const workbook = XLSX.read(b64, { type: "base64" });
    console.log("[IMPORT] Workbook lido, abas:", workbook.SheetNames);

    // Import Debtors
    const wsDebtors = workbook.Sheets["Devedores"];
    console.log("[IMPORT] wsDebtors existe?", !!wsDebtors);
    if (wsDebtors) {
      const debtors: any[] = XLSX.utils.sheet_to_json(wsDebtors);
      console.log("[IMPORT] Devedores extraídos:", debtors);
      for (const d of debtors) {
        await database.write(async () => {
          await database.get<Debtor>("debtors").create((debtor) => {
            debtor.name = d.name || "";
            debtor.amount = Number(d.amount) || 0;
            debtor.status = d.status || "open";
            debtor.startDate = d.start_date || new Date().toISOString();
            debtor.dueDate = d.due_date || "";
            debtor.paidDate = d.paid_date || "";
          });
        });
        console.log("[IMPORT] Devedor inserido:", d);
      }
    }

    // Import Inventory
    const wsInventory = workbook.Sheets["Estoque"];
    console.log("[IMPORT] wsInventory existe?", !!wsInventory);
    if (wsInventory) {
      const items: any[] = XLSX.utils.sheet_to_json(wsInventory);
      console.log("[IMPORT] Itens extraídos:", items);
      for (const i of items) {
        await database.write(async () => {
          await database
            .get<InventoryItemModel>("inventory_items")
            .create((item) => {
              item.name = i.name || "";
              item.quantity = Number(i.quantity) || 0;
              item.category = i.category || "";
              item.price = Number(i.price) || 0;
              item.lastRemovedAt = i.last_removed_at || "";
              item.customCreatedAt =
                i.custom_created_at || new Date().toISOString();
              item.location = i.location || "";
            });
        });
        console.log("[IMPORT] Item inserido:", i);
      }
    }
    // Reload a tela para refletir os dados importados
    setTimeout(() => {
      Alert.alert(
        "Importação concluída",
        "Os dados foram importados com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              setTimeout(() => {
                router.replace("/(tabs)/settings");
                router.replace("/(tabs)");
              }, 100);
            },
          },
        ]
      );
    }, 100);
  } catch (error: any) {
    console.error("[IMPORT] Erro na importação:", error);
    Alert.alert("Erro na importação", error?.message || JSON.stringify(error));
  }
}
