import { Stack, usePathname, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

export default function PlansLayout() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    // Hide animation when redirecting to plans tab from any other tab
    <Stack
      screenOptions={{
        animation: pathname.startsWith('/plans') ? 'default' : 'none',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Your Plans',
          headerRight: () => (
            <Button onPress={() => router.push('/plans/add')}>Add New Plan</Button>
          ),
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add Rental Plan',
        }}
      />
    </Stack>
  )
}
