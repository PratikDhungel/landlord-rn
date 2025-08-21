import { Children, PropsWithChildren } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

interface IBasicTableRowCellProps {
  cellValue: string | number
  dataCellStyles?: ViewStyle
  dataCellTextStyles?: TextStyle
}

const BasicTableRowCell = (props: IBasicTableRowCellProps) => {
  const { cellValue, dataCellStyles: additionalCellStyles, dataCellTextStyles } = props

  const dataCellStyles = [
    styles.tableRowDataCellDefaultStyles,
    additionalCellStyles && additionalCellStyles,
  ]

  return (
    <View style={dataCellStyles}>
      <Text style={dataCellTextStyles}>{cellValue}</Text>
    </View>
  )
}

interface ICustomTableRowCellProps extends PropsWithChildren {
  dataCellStyles?: ViewStyle
}

export const CustomTableRowCell = (props: ICustomTableRowCellProps) => {
  const { dataCellStyles: additionalCellStyles, children } = props

  const dataCellStyles = [
    styles.tableRowDataCellDefaultStyles,
    additionalCellStyles && additionalCellStyles,
  ]

  return <View style={dataCellStyles}>{children}</View>
}

const styles = StyleSheet.create({
  tableRowDataCellDefaultStyles: {
    flex: 1,
  },
})

export default BasicTableRowCell
