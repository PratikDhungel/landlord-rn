import { StyleSheet, Text, View } from 'react-native'

import ScreenWrapper from '@/components/common/ScreenWrapper'
import useApiQuery from '@/hooks/useApiQuery'

const RentalPlans = () => {
  const { data } = useApiQuery({ queryKey: ['rental-plans'], url: '/rentals/my-rentals-plans' })

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Rental Plans</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default RentalPlans
