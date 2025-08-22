import { useLocalSearchParams } from 'expo-router'

import OwnedRentalDetails from '@/components/rentals/OwnedRentalDetails'
import LiableRentalDetails from '@/components/rentals/LiableRentalDetails'

import { RENTAL_TYPE } from '@/types/rentals'

const RentalDetails = () => {
  const { id: rentalId, type }: { id: string; type: RENTAL_TYPE } = useLocalSearchParams()

  if (type === RENTAL_TYPE.OWNED_RENTAL) {
    return <OwnedRentalDetails rentalId={rentalId} />
  }

  return <LiableRentalDetails rentalId={rentalId} />
}

export default RentalDetails
