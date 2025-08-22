import { useState } from 'react'
import { View } from 'react-native'

import TabsGroup from '@/components/tabs/TabsGroup'
import WithWrapper from '@/components/common/WithWrapper'
import OwnedRentals from '@/components/rentals/OwnedRentals'
import LiableRentals from '@/components/rentals/LiableRentals'

import { RENTAL_TYPE } from '@/types/rentals'

const rentalTabsConfig = [
  {
    label: 'Owned Rentals',
    value: RENTAL_TYPE.OWNED_RENTAL,
  },
  {
    label: 'Liable Rentals',
    value: RENTAL_TYPE.LIABLE_RENTAL,
  },
]

const Rentals = () => {
  const [activeTab, setActiveTab] = useState<string>(RENTAL_TYPE.OWNED_RENTAL)

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
  if (activeRentalType === RENTAL_TYPE.OWNED_RENTAL) {
    return <OwnedRentals />
  }

  return <LiableRentals />
}

export default WithWrapper(Rentals)
