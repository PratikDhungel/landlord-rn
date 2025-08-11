import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

import { TBasicTableHeaderProps } from '@/types/table'

interface IBasicTableHeaderProps {
  headerProps: TBasicTableHeaderProps
  columnHeaderCellStyles?: ViewStyle
  columnHeaderTextStyles?: TextStyle
}

const BasicTableHeader = (props: IBasicTableHeaderProps) => {
  const { headerProps, columnHeaderCellStyles, columnHeaderTextStyles } = props

  const { title } = headerProps

  const headerCellStyles = [
    styles.columnHeaderCellDefaultStyles,
    columnHeaderCellStyles && columnHeaderCellStyles,
  ]

  const headerTextStyles = [
    styles.columnHeaderTextDefaultStyles,
    columnHeaderTextStyles && columnHeaderTextStyles,
  ]

  return (
    <View style={headerCellStyles}>
      <Text style={headerTextStyles}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  columnHeaderCellDefaultStyles: {
    flex: 1,
  },
  columnHeaderTextDefaultStyles: {
    color: '#808080',
  },
})

export default BasicTableHeader
