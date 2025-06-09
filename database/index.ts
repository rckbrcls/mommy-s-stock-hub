import { Database } from "@nozbe/watermelondb";
import { mySchema } from "./schema";
import Debtor from "../features/debtors/models/Debtor";
import InventoryItemModel from "../features/inventory/models/InventoryItem";
import { createAdapter } from "./adapter";

let database: Database | {} = {};

if (process.env.JEST_WORKER_ID) {
  // Exporta um objeto vazio para evitar inicialização do banco nativo em testes
  database = {};
} else {
  database = new Database({
    adapter: createAdapter({ schema: mySchema }),
    modelClasses: [Debtor, InventoryItemModel],
  });
}

export { database };
