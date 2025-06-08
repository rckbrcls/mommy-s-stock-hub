import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Debtor extends Model {
  static table = "debtors";

  @field("name") name!: string;
  @field("amount") amount!: number;
  @field("status") status!: string; // 'open' | 'paid'
  @field("start_date") startDate!: string; // data de início da dívida (ISO string)
  @field("due_date") dueDate!: string; // data escolhida para pagar (ISO string)
  @field("paid_date") paidDate!: string; // quando realmente pagou (ISO string, pode ser vazio/null)
}
