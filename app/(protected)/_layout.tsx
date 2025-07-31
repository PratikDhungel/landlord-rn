import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

import useAppTheme from '@/hooks/useAppTheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const currentTheme = useAppTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentTheme.colors.primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          tabBarLabel: 'Plans',
          title: 'Your Plans',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
          headerShown: false,
          // for navigation from nested plans route -> any other tab -> plans tab; show to default plans screen instead of nested screen as recorded in previous stack
          popToTopOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="rentals"
        options={{
          tabBarLabel: 'Rentals',
          title: 'Your Rentals',
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
          headerShown: false,
          popToTopOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </Tabs>
  )
}
