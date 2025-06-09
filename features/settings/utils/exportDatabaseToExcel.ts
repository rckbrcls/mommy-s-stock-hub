// Função de exportação de banco para Excel
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Database } from "@nozbe/watermelondb";
import { database } from "@/database";
import Debtor from "@/features/debtors/models/Debtor";
import InventoryItemModel from "@/features/inventory/models/InventoryItem";

const db = database as Database;

export async function exportDatabaseToExcel() {
  try {
    console.log("[EXPORT] Iniciando exportação para Excel");
    // Export Debtors
    const debtorsCollection = db.get<Debtor>("debtors");
    const debtors = await debtorsCollection.query().fetch();
    const debtorsData = debtors.map((d: Debtor) => ({
      id: d.id,
      name: d.name,
      amount: d.amount,
      status: d.status,
      start_date: d.startDate,
      due_date: d.dueDate,
      paid_date: d.paidDate,
    }));
    console.log("[EXPORT] Devedores extraídos:", debtorsData.length);

    // Export Inventory Items
    const inventoryCollection = db.get<InventoryItemModel>("inventory_items");
    const inventory = await inventoryCollection.query().fetch();
    const inventoryData = inventory.map((i: InventoryItemModel) => ({
      id: i.id,
      name: i.name,
      quantity: i.quantity,
      category: i.category,
      price: i.price,
      last_removed_at: i.lastRemovedAt,
      custom_created_at: i.customCreatedAt,
      location: i.location,
    }));
    console.log("[EXPORT] Itens de estoque extraídos:", inventoryData.length);

    // Create workbook
    const wb = XLSX.utils.book_new();
    const wsDebtors = XLSX.utils.json_to_sheet(debtorsData);
    const wsInventory = XLSX.utils.json_to_sheet(inventoryData);
    XLSX.utils.book_append_sheet(wb, wsDebtors, "Devedores");
    XLSX.utils.book_append_sheet(wb, wsInventory, "Estoque");
    console.log("[EXPORT] Workbook criado com abas:", wb.SheetNames);

    // Write workbook to binary string
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    const fileName = "mommy-stock-hub-export.xlsx";

    if (typeof window !== "undefined") {
      // WEB: Download via Blob
      const binary = atob(wbout);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      const blob = new Blob([array], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } else {
      // MOBILE: Expo FileSystem + Sharing
      const fileUri = FileSystem.cacheDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await Sharing.shareAsync(fileUri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Exportar Base de Dados",
      });
    }
  } catch (error: any) {
    console.error("[EXPORT] Erro na exportação:", error);
  }
}
