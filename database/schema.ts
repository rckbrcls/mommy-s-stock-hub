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
      ],
    }),
  ],
});
