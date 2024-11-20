import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  nochange,
  readonly,
  text,
} from "@nozbe/watermelondb/decorators";

export default class Task extends Model {
  static table = "tasks";

  @text("description") description: any;
  @field("complete") complete: any;
  @text("image") image: any;
  @date("due_at") dueAt: any;

  @nochange @field("user_id") userId: any;

  @readonly @date("created_at") createdAt: any;
  @readonly @date("updated_at") updatedAt: any;
}
