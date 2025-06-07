import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Debtor extends Model {
  static table = "debtors";

  @field("name") name!: string;
  @field("amount") amount!: number;
  @field("status") status!: string; // 'open' | 'paid'
}
