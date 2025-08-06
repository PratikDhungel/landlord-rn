import { StyleSheet, Text, View } from 'react-native'

const TabsGroup = () => {
  const tabNames = ['Tab 1', 'Tab2']

  return (
    <View style={{ flexDirection: 'row' }}>
      {tabNames.map((tab, idx) => {
        return (
          <EachTab
            label={tab}
            key={idx}
            isFirstItem={idx === 0}
            isLastItem={idx === tabNames.length - 1}
          />
        )
      })}
    </View>
  )
}

const EachTab = ({
  label,
  isFirstItem,
  isLastItem,
}: {
  label: string
  isFirstItem: boolean
  isLastItem: boolean
}) => {
  const isActive = isFirstItem

  return (
    <View
      style={[
        styles.commonTab,
        isFirstItem && styles.firstTabItem,
        isLastItem && styles.lastTabItem,
        isActive && styles.activeTab,
      ]}
    >
      <Text style={[isActive && styles.activeTabText]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tabsGroupWrapper: {
    flexDirection: 'row',
  },
  commonTab: {
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
