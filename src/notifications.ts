import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request permissions
export const requestNotifPermissions = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

// Schedule reminder
export const scheduleReminder = async (postId: string, title: string, fireDate: Date) => {
  if (Platform.OS === "web") {
    new Notification("Reminder", { body: title });
    return;
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: title,
      sound: "default",
      data: { postId },
    },
    trigger: { type: "date", date: fireDate } as Notifications.DateTriggerInput,
  });
};

// Add listener for notification response
export const addResponseListener = (cb: (postId: string) => void) => {
  return Notifications.addNotificationResponseReceivedListener((resp) => {
    const postId = resp.notification.request.content.data?.postId;
    if (typeof postId === "string") cb(postId);
  });
};
