import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

async function main() {
	const isOk = await configAccess();
	if (!isOk) return;

	configHandler();
	configChannel();
	const expoToken = await Notifications.getExpoPushTokenAsync();
	console.log("Expo Push Token:", expoToken);
}

async function configAccess() {
	if (Device.isDevice === false) {
		console.log("Notificação não disponivel!");
		return false;
	}

	const { status } = await Notifications.requestPermissionsAsync();
	if (status !== "granted") {
		alert("Notificação não autorizada!");
		return false;
	}

	return true;
}

function configHandler() {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		}),
	});
}

function configChannel() {
	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}
}

main();
