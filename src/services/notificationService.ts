/**
 * Notification Service
 * Handles in-app and push notifications for cricket updates
 */

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'wicket' | 'century' | 'update' | 'alert';
  timestamp: Date;
  read: boolean;
}

interface PushNotificationPayload {
  title: string;
  body: string;
  badge: string;
  icon: string;
  tag: string;
  data: Record<string, string>;
}

class NotificationService {
  private notifications: Map<string, Notification[]>;
  private subscribers: Set<(notification: Notification) => void>;

  constructor() {
    this.notifications = new Map();
    this.subscribers = new Set();
  }

  /**
   * Subscribe to real-time notifications
   */
  subscribe(callback: (notification: Notification) => void): void {
    this.subscribers.add(callback);
  }

  /**
   * Unsubscribe from notifications
   */
  unsubscribe(callback: (notification: Notification) => void): void {
    this.subscribers.delete(callback);
  }

  /**
   * Send notification to user
   */
  async sendNotification(userId: string, notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<Notification> {
    const fullNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      read: false,
    };

    // Store notification
    if (!this.notifications.has(userId)) {
      this.notifications.set(userId, []);
    }
    this.notifications.get(userId)!.push(fullNotification);

    // Notify subscribers
    this.subscribers.forEach(callback => callback(fullNotification));

    // Send push notification
    if ('Notification' in window) {
      this.sendPushNotification(fullNotification);
    }

    return fullNotification;
  }

  /**
   * Send push notification to browser
   */
  private async sendPushNotification(notification: Notification): Promise<void> {
    if (Notification.permission === 'granted') {
      const payload: PushNotificationPayload = {
        title: notification.title,
        body: notification.message,
        badge: '/images/badge-icon.png',
        icon: '/images/app-icon.png',
        tag: `cricket-${notification.type}`,
        data: {
          notificationId: notification.id,
          userId: notification.userId,
          type: notification.type,
        },
      };

      if ('serviceWorker' in navigator && 'ServiceWorkerRegistration' in window) {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(payload.title, {
          body: payload.body,
          badge: payload.badge,
          icon: payload.icon,
          tag: payload.tag,
          data: payload.data,
        });
      }
    }
  }

  /**
   * Get user notifications
   */
  getUserNotifications(userId: string, limit: number = 50): Notification[] {
    return (this.notifications.get(userId) || [])
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Mark notification as read
   */
  markAsRead(userId: string, notificationId: string): void {
    const userNotifications = this.notifications.get(userId);
    if (userNotifications) {
      const notification = userNotifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    }
  }

  /**
   * Clear user notifications
   */
  clearNotifications(userId: string): void {
    this.notifications.delete(userId);
  }

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        return 'granted';
      }
      return await Notification.requestPermission();
    }
    return 'denied';
  }
}

export default new NotificationService();
