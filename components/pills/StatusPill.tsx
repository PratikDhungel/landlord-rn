import { StyleSheet, Text, View } from 'react-native'

export enum StatusPillType {
  NEUTRAL = 'neutral',
  WARNING = 'warning',
  DANGER = 'danger',
  ACTIVE = 'active',
}

const StatusPill = () => {
  const statusPillContainerStyles = [statusPillStyles.defaultPillStyle]
  const statusPillTextStyles = [statusPillStyles.defaultPillTextStyle]

  return (
    <View style={[statusPillContainerStyles, statusPillStyles.activePill]}>
      <Text style={[statusPillTextStyles, statusPillStyles.activePillText]}>Approved</Text>
    </View>
  )
}

const statusPillStyles = StyleSheet.create({
  defaultPillStyle: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    width: 'auto',
  },
  defaultPillTextStyle: {
    fontWeight: 600,
    fontSize: 12,
  },
  activePill: {
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
  },
  activePillText: {
    color: '#16a34a',
    fontWeight: 600,
  },
})

export default StatusPill
