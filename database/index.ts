// MOCK para ambiente de teste (Jest)
if (process.env.JEST_WORKER_ID) {
  // Exporta um objeto vazio para evitar inicialização do banco nativo
  module.exports = { database: {} };
} else {
  const { Database } = require("@nozbe/watermelondb");
  const { mySchema } = require("./schema");
  const Debtor = require("../features/debtors/models/Debtor").default;
  const InventoryItemModel =
    require("../features/inventory/models/InventoryItem").default;
  const { createAdapter } = require("./adapter");

  module.exports = {
    database: new Database({
      adapter: createAdapter({ schema: mySchema }),
      modelClasses: [Debtor, InventoryItemModel],
    }),
  };
}
