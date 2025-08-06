import { Pressable, StyleSheet, Text, View } from 'react-native'

type TTabConfig = {
  label: string
  value: string
  isActive?: boolean
}

interface ITabsGroupProps {
  config: TTabConfig[]
  onActiveStateUpdate: (value: string) => void
}

const TabsGroup = ({ config, onActiveStateUpdate }: ITabsGroupProps) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {config.map((tab, idx) => {
        return (
          <EachTab
            tabConfig={tab}
            key={idx}
            isFirstItem={idx === 0}
            isLastItem={idx === config.length - 1}
            onActiveStateUpdate={onActiveStateUpdate}
          />
        )
      })}
    </View>
  )
}

interface ITabProps {
  tabConfig: TTabConfig
  isFirstItem: boolean
  isLastItem: boolean
  onActiveStateUpdate: (value: string) => void
}

const EachTab = ({ tabConfig, isFirstItem, isLastItem, onActiveStateUpdate }: ITabProps) => {
  const { label, value, isActive } = tabConfig

  function handleUpdateActiveTab() {
    onActiveStateUpdate(value)
  }

  return (
    <Pressable
      onPress={handleUpdateActiveTab}
      style={[
        styles.commonTab,
        isFirstItem && styles.firstTabItem,
        isLastItem && styles.lastTabItem,
        isActive && styles.activeTab,
      ]}
    >
      <Text style={[isActive && styles.activeTabText]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tabsGroupWrapper: {
    flexDirection: 'row',
  },
  commonTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: '#007fff',
    borderWidth: 1,
    borderRightWidth: 0,
  },
  firstTabItem: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  lastTabItem: {
    borderRightWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  activeTab: {
    backgroundColor: '#007fff',
  },
  activeTabText: {
    color: '#fff',
  },
})

export default TabsGroup
