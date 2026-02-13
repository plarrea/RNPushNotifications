import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const setupPushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();

      if (status !== 'granted') {
        const { status: reqStatus } = Notifications.requestPermissionsAsync();

        if (reqStatus !== 'granted') {
          Alert.alert(
            'Permission required',
            'Push notifications need the appropriate permissions',
          );
          return;
        }
      }

      const pushToken = Notifications.getExpoPushTokenAsync();
      console.log('Yout push not token is:', pushToken);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          nae: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    setupPushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification Received', notification);
        const userName = notification.request.content.data.userName;
        console.log('Notification Received, userName:', userName);
      },
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const userName = response.notification.request.content.data.userName;
        console.log('Notification Response Received, userName:', userName);
      },
    );

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My First Local Notification',
        body: 'This is the body of the notification',
        data: {
          userName: 'Pablo',
        },
        trigger: {
          seconds: 5,
        },
      },
    });
  };

  const sendPushNotificationHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: '', // replace with actual token
        title: 'Test - sent from a device',
        body: 'This is a test',
      }),
    });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
