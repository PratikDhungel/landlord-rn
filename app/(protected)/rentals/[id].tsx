import { useLocalSearchParams } from 'expo-router'

import OwnedRentalDetails from '@/components/rentals/OwnedRentalDetails'
import LiableRentalDetails from '@/components/rentals/LiableRentalDetails'

import { RentalTypes } from '@/types/rentals'

const RentalDetails = () => {
  const { id: rentalId, type }: { id: string; type: RentalTypes } = useLocalSearchParams()

  if (type === RentalTypes.OWNED_RENTAL) {
    return <OwnedRentalDetails rentalId={rentalId} />
  }

  return <LiableRentalDetails rentalId={rentalId} />
}

export default RentalDetails
