import { Notification } from "../../enterprise/entities/notfication";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
}
