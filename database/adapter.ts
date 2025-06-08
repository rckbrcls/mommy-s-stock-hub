import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { SQLiteAdapterOptions } from "@nozbe/watermelondb/adapters/sqlite/type";
import { type LokiAdapterOptions } from "@nozbe/watermelondb/adapters/lokijs";

export const createAdapter = (
  options: Pick<
    SQLiteAdapterOptions,
    Extract<keyof SQLiteAdapterOptions, keyof LokiAdapterOptions>
  >
) =>
  new SQLiteAdapter({
    jsi: true,
    ...options,
  });
