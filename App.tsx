import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as Notification from "expo-notifications";
import "./src/configs/notification";

export default function App() {
  const notificationListener = useRef<Notification.Subscription>();

  const [notification, setNotification] = useState<Notification.Notification>();

  useEffect(() => {
    notificationListener.current = Notification.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    return () => {
      Notification.removeNotificationSubscription(notificationListener.current);
    };
  });

  return (
    <View style={styles.container}>
      <Text>App notificação</Text>

      <Text>Titulo: {notification?.request.content.title}</Text>
      <Text>Mensagem: {notification?.request.content.body}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
