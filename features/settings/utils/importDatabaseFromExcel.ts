// Função de importação de banco a partir de Excel
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Database } from "@nozbe/watermelondb";

import { database } from "@/database";
import Debtor from "@/features/debtors/models/Debtor";
import InventoryItemModel from "@/features/inventory/models/InventoryItem";
import { showAlert } from "@/components/ConfirmDialog";
import { router } from "expo-router";

const db = database as Database;

export async function importDatabaseFromExcel() {
  console.log("[IMPORT] Iniciando importação de Excel");
  try {
    let b64: string | undefined;

    if (typeof window !== "undefined") {
      // WEB: input file + FileReader
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx,.xls";
      input.style.display = "none";
      document.body.appendChild(input);

      const filePromise = new Promise<File | null>((resolve) => {
        input.onchange = () => {
          resolve(input.files && input.files[0] ? input.files[0] : null);
        };
      });

      input.click();
      const file = await filePromise;
      document.body.removeChild(input);
      if (!file) return;

      b64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else {
      // MOBILE: Expo DocumentPicker + FileSystem
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }
      const fileUri = result.assets[0].uri;
      b64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
    if (!b64) return;

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
        await db.write(async () => {
          await db.get<Debtor>("debtors").create((debtor: Debtor) => {
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
        await db.write(async () => {
          await db
            .get<InventoryItemModel>("inventory_items")
            .create((item: InventoryItemModel) => {
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
      showAlert({
        title: "Importação concluída",
        message: "Os dados foram importados com sucesso.",
        onClose: () => {
          setTimeout(() => {
            router.replace("/(tabs)/settings");
            router.replace("/(tabs)");
          }, 100);
        },
      });
    }, 100);
  } catch (error: any) {
    console.error("[IMPORT] Erro na importação:", error);
    showAlert({
      title: "Erro na importação",
      message: error?.message || JSON.stringify(error),
    });
  }
}
