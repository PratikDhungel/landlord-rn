import { Stack } from 'expo-router'

export default function PlansLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Account',
        }}
      />
    </Stack>
  )
}
