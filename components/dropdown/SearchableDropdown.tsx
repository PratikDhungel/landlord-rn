import { useState } from 'react'
import { ActivityIndicator, Menu, TextInput } from 'react-native-paper'
import { Pressable, Text, View } from 'react-native'

import LabelTextInput from '@/components/input/LabelTextInput'

import useApiQuery from '@/hooks/useApiQuery'
import { TDropdownOption } from '@/types/common'

import { TUser } from '@/types/users'

interface ISearchableDropdownProps {
  selectedValue: TDropdownOption | null
  setSelectedValue: (selectedOption: TDropdownOption) => void
  queryOptions: IApiQueryOptions
}

interface IApiQueryOptions {
  queryKey: readonly unknown[]
  endpoint: string
  prepareFunc: (data: any) => TDropdownOption[]
}

const SearchableDropdown = ({
  selectedValue,
  setSelectedValue,
  queryOptions,
}: ISearchableDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const { queryKey, endpoint, prepareFunc } = queryOptions

  const { data = [], isLoading } = useApiQuery<TUser[]>({
    queryKey: [...queryKey, searchQuery],
    url: `${endpoint}=${searchQuery}`,
    options: {
      enabled: searchQuery.length >= 3,
    },
  })

  function handleOpenDropdownMenu() {
    setIsMenuVisible(true)
  }

  function onOptionSelection(selectedOption: TDropdownOption) {
    setSelectedValue(selectedOption)
    setIsMenuVisible(false)
    setSearchQuery('')
  }

  function handleDropdownMenuDismiss() {
    setSearchQuery('')
    setIsMenuVisible(false)
  }

  const searchResults = prepareFunc(data)
  const selectedValueLabel = selectedValue?.label ?? ''

  return (
    <Menu
      visible={isMenuVisible}
      anchor={
        <Pressable onPress={handleOpenDropdownMenu}>
          <LabelTextInput
            mode="outlined"
            label="Tenant"
            value={selectedValueLabel}
            // Add outline to hide disabled color
            outlineStyle={{ borderColor: '#444444' }}
            textColor="#444444"
            disabled
          />
        </Pressable>
      }
      anchorPosition="bottom"
      onDismiss={handleDropdownMenuDismiss}
      contentStyle={{ minWidth: 160 }}
    >
      <TextInput
        dense
        value={searchQuery}
        activeOutlineColor="#007fff"
        style={{ marginBottom: 4, fontSize: 12 }}
        onChangeText={setSearchQuery}
        placeholder="Search..."
      />

      <SearchableDropdownOptions
        isLoading={isLoading}
        searchResults={searchResults}
        onOptionSelection={onOptionSelection}
      />
    </Menu>
  )
}

interface ISearchableDropdownOptions {
  isLoading: boolean
  searchResults: TDropdownOption[]
  onOptionSelection: (option: TDropdownOption) => void
}

const SearchableDropdownOptions = ({
  isLoading,
  searchResults,
  onOptionSelection,
}: ISearchableDropdownOptions) => {
  if (isLoading) {
    return (
      <View style={{ width: 120, padding: 8 }}>
        <ActivityIndicator size="small" animating={true} />
      </View>
    )
  }

  if (searchResults.length === 0) {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 12, color: '#444444' }}>No option available</Text>
      </View>
    )
  }

  return searchResults.map(eachOption => {
    return (
      <Menu.Item
        key={eachOption.id}
        onPress={() => {
          onOptionSelection(eachOption)
        }}
        title={eachOption.label}
        dense
      />
    )
  })
}

export default SearchableDropdown
