import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "debtors",
      columns: [
        { name: "name", type: "string" },
        { name: "amount", type: "number" },
        { name: "status", type: "string" },
        { name: "start_date", type: "string", isOptional: true },
        { name: "due_date", type: "string", isOptional: true },
        { name: "paid_date", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: "inventory_items",
      columns: [
        { name: "name", type: "string" },
        { name: "quantity", type: "number" },
        { name: "category", type: "string", isOptional: true },
        { name: "price", type: "number", isOptional: true },
      ],
    }),
  ],
});
