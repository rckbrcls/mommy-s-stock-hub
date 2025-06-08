import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class InventoryItemModel extends Model {
  static table = "inventory_items";

  @field("name") name!: string;
  @field("quantity") quantity!: number;
  @field("category") category?: string;
  @field("price") price?: number;
  @field("last_removed_at") lastRemovedAt?: string; // data/hora da última retirada
  @field("custom_created_at") customCreatedAt?: string; // data/hora de criação do item (customizado)
  @field("location") location?: string; // localização física (opcional)
}
