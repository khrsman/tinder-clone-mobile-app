import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { Opponent, opponentsAtom } from '../state/recoil';

const BASE_URL = process.env.BASE_URL ?? (Constants.expoConfig?.extra as any)?.BASE_URL as string;
const url = `${BASE_URL}/api/people`; 

type PeopleItem = { id: number; name: string; age: number; bio: string; distance: number; photos: string[] };
function cleanUrl(u: string) { return u.trim().replace(/^[`'"\s]+|[`'"\s]+$/g, ''); }
function mapToOpponents(items: PeopleItem[]): Opponent[] {
  return items.map((i) => ({ id: i.id, name: i.name, age: i.age, bio: i.bio, distanceKm: i.distance, photos: (i.photos||[]).map(cleanUrl), verified: false }));
}


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const queryClient = new QueryClient();
  function OpponentsBootstrap() {
    const setOpponents = useSetRecoilState(opponentsAtom);
    const { data } = useQuery({ queryKey: ['people'], queryFn: fetchPeople });
    useEffect(() => {
      if (data) setOpponents(data);
    }, [data]);
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <OpponentsBootstrap />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </RecoilRoot>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
function extractItems(json: any): PeopleItem[] {
  if (Array.isArray(json)) return json as PeopleItem[];
  if (json && Array.isArray(json.data)) return json.data as PeopleItem[];
  return [];
}

async function fetchPeople(): Promise<Opponent[]> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const items = extractItems(json);
  return mapToOpponents(items);
}
