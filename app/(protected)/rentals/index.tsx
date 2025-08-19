import { useState } from 'react'
import { View } from 'react-native'

import TabsGroup from '@/components/tabs/TabsGroup'
import WithWrapper from '@/components/common/WithWrapper'
import OwnedRentals from '@/components/rentals/OwnedRentals'
import LiableRentals from '@/components/rentals/LiableRentals'

enum RENTAL_TYPES {
  OWNED_RENTALS = 'owned_rentals',
  LIABLE_RENTALS = 'liable_rentals',
}

const rentalTabsConfig = [
  {
    label: 'Owned Rentals',
    value: RENTAL_TYPES.OWNED_RENTALS,
  },
  {
    label: 'Liable Rentals',
    value: RENTAL_TYPES.LIABLE_RENTALS,
  },
]

const Rentals = () => {
  const [activeTab, setActiveTab] = useState<string>(RENTAL_TYPES.OWNED_RENTALS)

  const tabsWithActiveState = rentalTabsConfig.map(eachTab => {
    return { ...eachTab, isActive: eachTab.value === activeTab }
  })

  function onActiveStateUpdate(newActiveTab: string) {
    setActiveTab(newActiveTab)
  }

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <TabsGroup config={tabsWithActiveState} onActiveStateUpdate={onActiveStateUpdate} />
      </View>

      <RentalDetailsTable activeRentalType={activeTab} />
    </>
  )
}

const RentalDetailsTable = ({ activeRentalType }: { activeRentalType: string }) => {
  if (activeRentalType === RENTAL_TYPES.OWNED_RENTALS) {
    return <OwnedRentals />
  }

  return <LiableRentals />
}

export default WithWrapper(Rentals)
