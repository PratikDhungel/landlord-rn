import { Stack, usePathname, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

export default function PlansLayout() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    // Hide animation when redirecting to plans tab from any other tab
    <Stack
      screenOptions={{
        animation: pathname.startsWith('/rentals') ? 'default' : 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Your Rentals',
          headerRight: () => (
            <Button onPress={() => router.push('/rentals/add')}>Add New Rental</Button>
          ),
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add Rental',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Rental Details',
        }}
      />
    </Stack>
  )
}
