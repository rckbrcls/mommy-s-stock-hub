import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "./schema";
import Debtor from "../features/debtors/models/Debtor";
import InventoryItemModel from "../features/inventory/models/InventoryItem";

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [Debtor, InventoryItemModel],
});
