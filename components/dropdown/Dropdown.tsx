import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Menu } from 'react-native-paper'

import LabelTextInput from '@/components/input/LabelTextInput'

import { TDropdownOption } from '@/types/common'

interface ISearchableDropdownProps {
  selectedValue: TDropdownOption | null
  setSelectedValue: (selectedOption: TDropdownOption) => void
  dropdownOptions: TDropdownOption[]
}

const Dropdown = ({
  selectedValue,
  setSelectedValue,
  dropdownOptions,
}: ISearchableDropdownProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  function onOptionSelection(selectedOption: TDropdownOption) {
    setSelectedValue(selectedOption)
    setIsMenuVisible(false)
  }

  function handleDropdownMenuDismiss() {
    setIsMenuVisible(false)
  }

  const selectedValueLabel = selectedValue?.label ?? ''

  return (
    <Menu
      visible={isMenuVisible}
      anchor={
        <Pressable onPress={() => setIsMenuVisible(true)}>
          <LabelTextInput
            mode="outlined"
            label="Rental Plan"
            value={selectedValueLabel}
            disabled
            outlineStyle={{ borderColor: '#444444' }}
            textColor="#444444"
          />
        </Pressable>
      }
      anchorPosition="bottom"
      onDismiss={handleDropdownMenuDismiss}
      contentStyle={{ minWidth: 160 }}
    >
      <DropdownOptions dropdownOptions={dropdownOptions} onOptionSelection={onOptionSelection} />
    </Menu>
  )
}

interface ISearchableOption {
  dropdownOptions: TDropdownOption[]
  onOptionSelection: (option: TDropdownOption) => void
}

const DropdownOptions = ({ dropdownOptions, onOptionSelection }: ISearchableOption) => {
  if (dropdownOptions.length === 0) {
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

  return dropdownOptions.map(eachOption => {
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

export default Dropdown
