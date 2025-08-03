import { useState } from 'react'
import { Menu } from 'react-native-paper'
import { Pressable, Text, View } from 'react-native'

import Container from '@/components/common/Container'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LabelTextInput from '@/components/input/LabelTextInput'
import LoadingButton from '@/components/button/LoadingButton'

import useApiQuery from '@/hooks/useApiQuery'

import { TUser } from '@/app/types/users'
import { TRentalPlan } from '@/app/types/rentalPlan'

export default function TabTwoScreen() {
  const [isTenantMenuVisible, setIsTenantMenuVisible] = useState(false)
  const [isRentalPlanMenuVisible, setIsRentalPlanMenuVisible] = useState(false)

  const [tenantQuery, setTenantQuery] = useState('')
  const [selectedTenant, setSelectedTenant] = useState<TUser | null>(null)
  const [rentalPlanId, setRentalPlanId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { data: rentalPlans } = useApiQuery<TRentalPlan[]>({
    queryKey: ['rental-plans'],
    url: '/rentals/my-rentals-plans',
  })
  const { data: usersList = [] } = useApiQuery<TUser[]>({
    queryKey: ['users-list-query', tenantQuery],
    url: `users/search?name=${tenantQuery}`,
    options: {
      enabled: tenantQuery.length >= 3,
    },
  })

  async function handleAddNewRental() {
    setIsLoading(true)

    try {
      setIsSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRentalPlan = rentalPlans?.find(each => each.id === rentalPlanId)

  const selectedTenantFullName =
    selectedTenant === null ? '' : `${selectedTenant?.firstName} ${selectedTenant?.lastName}`

  return (
    <ScreenWrapper>
      <Container>
        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <Menu
              visible={isTenantMenuVisible}
              anchor={
                <Pressable onPress={() => setIsTenantMenuVisible(true)}>
                  <LabelTextInput
                    mode="outlined"
                    label="Tenant"
                    value={selectedTenantFullName}
                    outlineStyle={{ borderColor: '#444444' }}
                    textColor="#444444"
                    disabled
                  />
                </Pressable>
              }
              anchorPosition="bottom"
              onDismiss={() => {
                setTenantQuery('')
                setIsTenantMenuVisible(false)
              }}
            >
              <LabelTextInput
                mode="flat"
                placeholder="Search user..."
                value={tenantQuery}
                outlineStyle={{ borderColor: '#444444' }}
                textColor="#444444"
                onChangeText={setTenantQuery}
              />
              {usersList?.length === 0 ? (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#444444' }}>No users available</Text>
                </View>
              ) : (
                usersList?.map(user => {
                  return (
                    <Menu.Item
                      key={user.id}
                      onPress={() => {
                        setSelectedTenant(user)
                        setIsTenantMenuVisible(false)
                        setTenantQuery('')
                      }}
                      title={`${user.firstName} ${user.lastName}`}
                    />
                  )
                })
              )}
            </Menu>
          </View>

          <View style={{ flex: 1 }}>
            <Menu
              visible={isRentalPlanMenuVisible}
              anchor={
                <Pressable onPress={() => setIsRentalPlanMenuVisible(true)}>
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
              onDismiss={() => setIsRentalPlanMenuVisible(false)}
            >
              {rentalPlans?.map(eachRentalPlan => {
                return (
                  <Menu.Item
                    key={eachRentalPlan.id}
                    onPress={() => {
                      setRentalPlanId(eachRentalPlan.id)
                      setIsRentalPlanMenuVisible(false)
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
