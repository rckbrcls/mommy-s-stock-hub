import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class InventoryItemModel extends Model {
  static table = "inventory_items";

  @field("name") name!: string;
  @field("quantity") quantity!: number;
  @field("category") category?: string;
  @field("price") price?: number;
}
