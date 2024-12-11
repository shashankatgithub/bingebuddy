import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();
const IOS_CLIENT_ID = '83319897934-l2hvhjf7ufuifpk1a0h2qq2jsdtt5q0d.apps.googleusercontent.com';

export default function SignIn() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Authentication successful', authentication);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Google Sign-In Example</Text>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}