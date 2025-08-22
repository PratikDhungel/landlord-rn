import { Stack } from 'expo-router'

export default function PlansLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Rental Details',
        }}
      />

      <Stack.Screen
        name="newPayment"
        options={{
          title: 'Add New Payment',
        }}
      />
    </Stack>
  )
}
