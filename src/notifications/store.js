// Inspired by https://github.com/keenethics/svelte-notifications

import { writable } from "svelte/store";

const addNotification = (notification, update) => {
  const {
    id = new Date().getTime(),
    removeAfter = 3000, // ms
    ...rest
  } = notification;

  update((notifications) => {
    return [
      ...notifications,
      {
        id,
        removeAfter,
        ...rest,
      },
    ];
  });
};

const removeNotification = (notificationId, update) =>
  update((notifications) => {
    return notifications.filter((n) => n.id !== notificationId);
  });

const clearNotifications = (set) => set([]);

const createNotificationsStore = () => {
  const { subscribe, set, update } = writable([]);

  // expose these methods on a store instance. Notice the closures.

  return {
    subscribe,
    addNotification: (notification) => addNotification(notification, update),
    removeNotification: (notificationId) =>
      removeNotification(notificationId, update),
    clearNotifications: () => clearNotifications(set),
  };
};

// export an instance of this store
export default createNotificationsStore();
