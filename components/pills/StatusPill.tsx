import { StyleSheet, Text, View } from 'react-native'

import { STATUS_PILL_TYPE } from '@/types/common'

interface IStatusPillProps {
  pillType: STATUS_PILL_TYPE
  statusLabel: string
}

function getPillContainerStyleByType(pillType: STATUS_PILL_TYPE) {
  switch (pillType) {
    case STATUS_PILL_TYPE.ACTIVE:
      return statusPillStyles.activePill

    case STATUS_PILL_TYPE.DANGER:
      return statusPillStyles.dangerPill

    case STATUS_PILL_TYPE.WARNING:
      return statusPillStyles.warningPill

    default:
      return statusPillStyles.neutralPill
  }
}

function getPillTextStyleByType(pillType: STATUS_PILL_TYPE) {
  switch (pillType) {
    case STATUS_PILL_TYPE.ACTIVE:
      return statusPillStyles.activePillText

    case STATUS_PILL_TYPE.DANGER:
      return statusPillStyles.dangerPillText

    case STATUS_PILL_TYPE.WARNING:
      return statusPillStyles.warningPillText

    default:
      return statusPillStyles.neutralPillText
  }
}

const StatusPill = (props: IStatusPillProps) => {
  const { statusLabel, pillType } = props

  const pillContainerStyleByType = getPillContainerStyleByType(pillType)
  const pillTextStyleByType = getPillTextStyleByType(pillType)

  const statusPillContainerStyles = [statusPillStyles.defaultPillStyle, pillContainerStyleByType]
  const statusPillTextStyles = [statusPillStyles.defaultPillTextStyle, pillTextStyleByType]

  return (
    <View style={statusPillContainerStyles}>
      <Text style={statusPillTextStyles}>{statusLabel}</Text>
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
  neutralPill: {
    borderColor: '#007fff',
    backgroundColor: '#cce7ff',
  },
  dangerPill: {
    borderColor: '#dc2626',
    backgroundColor: '#fecaca',
  },
  warningPill: {
    borderColor: '#ea580c',
    backgroundColor: '#fed7aa',
  },
  activePillText: {
    color: '#16a34a',
  },
  neutralPillText: {
    color: '#007fff',
  },
  dangerPillText: {
    color: '#dc2626',
  },
  warningPillText: {
    color: '#ea580c',
  },
})

export default StatusPill
