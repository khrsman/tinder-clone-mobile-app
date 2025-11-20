import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="main"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="likedOpponentList"
        options={{
          title: 'Liked Opponent List',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="send" color={color} />,
        }}
      />
    </Tabs>
  );
}
