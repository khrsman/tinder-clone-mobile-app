import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { RecoilRoot } from 'recoil';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </RecoilRoot>
      </GestureHandlerRootView>
  );
}
