import { useState } from 'react'
import { Menu } from 'react-native-paper'
import { Pressable, View } from 'react-native'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'

import useApiQuery from '@/hooks/useApiQuery'

import { TRentalPlan } from '@/app/types/rentalPlan'

export default function TabTwoScreen() {
  const [menuVisible, setMenuVisible] = useState(false)

  const [tenant, setTenantName] = useState('')
  const [rentalPlanId, setRentalPlanId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { data: rentalPlans } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })

  function openMenu() {
    setMenuVisible(true)
  }

  async function handleAddNewRental() {
    setIsLoading(true)

    try {
      setIsSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRentalPlan = rentalPlans?.find(each => each.id === rentalPlanId)

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ marginBottom: 16 }}>
          <LabelTextInput
            mode="outlined"
            label="Tenant"
            value={tenant}
            onChangeText={setTenantName}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <View>
            <Menu
              visible={menuVisible}
              anchor={
                <Pressable onPress={openMenu}>
                  <LabelTextInput
                    mode="outlined"
                    label="Rental Plan"
                    value={selectedRentalPlan?.name}
                    disabled
                    outlineStyle={{ borderColor: '#444444' }}
                    textColor="#444444"
                  />
                </Pressable>
              }
              anchorPosition="bottom"
              onDismiss={() => setMenuVisible(false)}
            >
              {rentalPlans?.map(eachRentalPlan => {
                return (
                  <Menu.Item
                    key={eachRentalPlan.id}
                    onPress={() => {
                      setRentalPlanId(eachRentalPlan.id)
                      setMenuVisible(false)
                    }}
                    title={eachRentalPlan.name}
                  />
                )
              })}
            </Menu>
          </View>
        </View>

        <View>
          <LoadingButton
            buttonLabel="Add Rental"
            isLoading={isLoading}
            isSuccess={isSuccess}
            loadingLabel="Adding Rental"
            successLabel="Added"
            mode="contained"
            icon="plus"
            style={{ alignSelf: 'flex-end' }}
            onPress={handleAddNewRental}
          />
        </View>
      </Container>
    </ScreenWrapper>
  )
}
