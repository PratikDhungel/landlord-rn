import { StyleSheet, Pressable, View } from 'react-native'

import { IBasicTableConfig } from '@/types/table'

const BasicDataTable = <TTableData,>({
  tableConfig,
  data,
}: {
  tableConfig: IBasicTableConfig<TTableData>
  data: TTableData[]
}) => {
  const { columns, onTableRowPress } = tableConfig

  function handleTableRowPress(rowData: TTableData) {
    if (onTableRowPress) {
      onTableRowPress(rowData)
    }
  }

  return (
    <>
      <View style={styles.tableTitleContainer}>
        {columns.map((eachColumn, idx) => {
          const { headerProps, columnHeaderCellStyles, columnHeaderTextStyles, renderHeaderCell } =
            eachColumn

          return renderHeaderCell({
            headerProps,
            columnHeaderCellStyles,
            columnHeaderTextStyles,
          })
        })}
      </View>

      {data.map((rowData: TTableData) => {
        return (
          <Pressable style={styles.tableRowContainer} onPress={() => handleTableRowPress(rowData)}>
            {columns.map(eachColumn => {
              const { dataCellStyles, dataCellTextStyles, renderDataCell } = eachColumn

              return renderDataCell({
                rowData,
                dataCellStyles,
                dataCellTextStyles,
              })
            })}
          </Pressable>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  tableTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableRowContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
  },
})

export default BasicDataTable
