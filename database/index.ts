// MOCK para ambiente de teste (Jest)
if (process.env.JEST_WORKER_ID) {
  // Exporta um objeto vazio para evitar inicialização do banco nativo
  module.exports = { database: {} };
} else {
  const { Database } = require("@nozbe/watermelondb");
  const SQLiteAdapter = require("@nozbe/watermelondb/adapters/sqlite").default;
  const { mySchema } = require("./schema");
  const Debtor = require("../features/debtors/models/Debtor").default;
  const InventoryItemModel = require("../features/inventory/models/InventoryItem").default;

  const adapter = new SQLiteAdapter({
    schema: mySchema,
  });

  module.exports = {
    database: new Database({
      adapter,
      modelClasses: [Debtor, InventoryItemModel],
    }),
  };
}
