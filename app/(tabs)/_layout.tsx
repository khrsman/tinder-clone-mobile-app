import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  function CustomTabBar({ state, navigation }: any) {
    const { width } = useWindowDimensions();
    const contentWidth = Math.min(width - 32, 520);
    const isMainFocused = state.index === state.routes.findIndex((r: any) => r.name === 'main');
    const isLikedFocused = state.index === state.routes.findIndex((r: any) => r.name === 'likedOpponentList');

    return (
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#f5f5f7' }}>
        <View style={{ width: contentWidth, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', 
        alignItems: 'center',
           marginBottom: 20 }}>
          <Pressable
            onPress={() => navigation.navigate('main')}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <MaterialIcons name="whatshot" size={48} color="#ff6b6b" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('likedOpponentList')}
            style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            <MaterialIcons name="auto-awesome" size={48} color="#8aa4bd" />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
    
     
    </Tabs>
  );
}
