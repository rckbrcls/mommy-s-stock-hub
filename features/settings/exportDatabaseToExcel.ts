import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { database } from "@/database";
import Debtor from "@/features/debtors/models/Debtor";
import InventoryItemModel from "@/features/inventory/models/InventoryItem";

export async function exportDatabaseToExcel() {
  // Export Debtors
  const debtorsCollection = database.get<Debtor>("debtors");
  const debtors = await debtorsCollection.query().fetch();
  const debtorsData = debtors.map((d) => ({
    id: d.id,
    name: (d as Debtor).name,
    amount: (d as Debtor).amount,
    status: (d as Debtor).status,
    start_date: (d as Debtor).startDate,
    due_date: (d as Debtor).dueDate,
    paid_date: (d as Debtor).paidDate,
  }));

  // Export Inventory Items
  const inventoryCollection =
    database.get<InventoryItemModel>("inventory_items");
  const inventory = await inventoryCollection.query().fetch();
  const inventoryData = inventory.map((i) => ({
    id: i.id,
    name: (i as InventoryItemModel).name,
    quantity: (i as InventoryItemModel).quantity,
    category: (i as InventoryItemModel).category,
    price: (i as InventoryItemModel).price,
    last_removed_at: (i as InventoryItemModel).lastRemovedAt,
    custom_created_at: (i as InventoryItemModel).customCreatedAt,
    location: (i as InventoryItemModel).location,
  }));

  // Create workbook
  const wb = XLSX.utils.book_new();
  const wsDebtors = XLSX.utils.json_to_sheet(debtorsData);
  const wsInventory = XLSX.utils.json_to_sheet(inventoryData);
  XLSX.utils.book_append_sheet(wb, wsDebtors, "Devedores");
  XLSX.utils.book_append_sheet(wb, wsInventory, "Estoque");

  // Write workbook to binary string
  const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

  // Save to file
  const fileUri = FileSystem.cacheDirectory + "mommy-stock-hub-export.xlsx";
  await FileSystem.writeAsStringAsync(fileUri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Share file
  await Sharing.shareAsync(fileUri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "Exportar Base de Dados",
  });
}
